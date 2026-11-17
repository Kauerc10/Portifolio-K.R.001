import { NextResponse } from 'next/server';
import { z } from 'zod';

const submission = z.object({
  nome: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  assunto: z.string().trim().min(1).max(180),
  mensagem: z.string().trim().min(1).max(5000),
  botcheck: z.string().max(200).optional(),
});

// Best-effort per-instance protection; provider filtering also applies.
const attempts = new Map<string, { count: number; until: number }>();
const windowMs = 10 * 60 * 1000;

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (origin && origin !== new URL(req.url).origin) {
    return NextResponse.json({ error: 'VALIDATION_ERROR' }, { status: 403 });
  }
  if (Number(req.headers.get('content-length')) > 24000) {
    return NextResponse.json({ error: 'VALIDATION_ERROR' }, { status: 413 });
  }
  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > 12000) return NextResponse.json({ error: 'VALIDATION_ERROR' }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'VALIDATION_ERROR' }, { status: 400 });
  }
  const parsed = submission.safeParse(body);
  if (!parsed.success || parsed.data.botcheck?.trim()) {
    return NextResponse.json({ error: 'VALIDATION_ERROR' }, { status: 400 });
  }

  const now = Date.now();
  for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const entry = attempts.get(ip);
  if (entry && entry.count >= 3) {
    return NextResponse.json({ error: 'RATE_LIMITED' }, {
      status: 429, headers: { 'Retry-After': String(Math.ceil((entry.until - now) / 1000)) },
    });
  }
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) return NextResponse.json({ error: 'SERVICE_UNAVAILABLE' }, { status: 503 });
  if (entry) entry.count++;
  else {
    if (attempts.size >= 5000) attempts.delete(attempts.keys().next().value!);
    attempts.set(ip, { count: 1, until: now + windowMs });
  }

  const { nome, email, assunto, mensagem } = parsed.data;
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Portfólio Kauê Ruon] ${assunto.replace(/[\r\n]/g, ' ')}`,
        from_name: 'Portfólio Kauê Ruon', replyto: email, name: nome, email,
        assunto, message: mensagem,
      }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });
    const result: unknown = await response.json();
    if (!response.ok || !result || typeof result !== 'object' || !('success' in result) || result.success !== true) {
      return NextResponse.json({ error: 'SERVICE_UNAVAILABLE' }, { status: 502 });
    }
    return NextResponse.json({ success: true, messageCode: 'SUCCESS' });
  } catch {
    // Never log the message, email address, key or provider response.
    return NextResponse.json({ error: 'SERVICE_UNAVAILABLE' }, { status: 502 });
  }
}
