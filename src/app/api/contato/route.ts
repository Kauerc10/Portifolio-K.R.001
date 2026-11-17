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
  // Web3Forms free requires browser-originated delivery. This is a public form ID,
  // not an authentication secret. Never expose any other environment variables.
  return NextResponse.json({ submission: {
    access_key: accessKey,
    subject: `[Portfólio Kauê Ruon] ${assunto.replace(/[\r\n]/g, ' ')}`,
    from_name: 'Portfólio Kauê Ruon', replyto: email, name: nome, email,
    assunto, message: mensagem,
  } }, { headers: { 'Cache-Control': 'no-store' } });
}
