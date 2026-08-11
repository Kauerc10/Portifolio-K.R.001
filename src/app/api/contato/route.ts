import { NextResponse } from 'next/server';

// Rate Limiter em memória por IP (Máx 3 petições a cada 10 minutos)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 600000 }); // 10 minutos
    return { allowed: true };
  }

  if (entry.count >= 3) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true };
}

// Lista de palavras reservadas de spam bots conhecidos
const SPAM_KEYWORDS = ['pranab', 'crypto', 'seo boost', 'casino', 'backlinks', 'viagra', 'telegram.me'];

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';

    // 1. Rate Limit por IP
    const { allowed } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 });
    }

    const body = await req.json();
    const { nome, email, assunto, mensagem, botcheck, fillTime } = body;

    // 2. Honeypot Anti-Bot (se preenchido, é um robô -> drop silencioso com HTTP 200 ok enganoso)
    if (botcheck && String(botcheck).trim().length > 0) {
      console.warn(`[Anti-Bot API] HONEYPOT_TRIGGERED pelo IP ${ip}. Descartando silenciosamente.`);
      return NextResponse.json({ success: true, messageCode: 'SUCCESS' });
    }

    // 3. Tempo Mínimo de Preenchimento (Humano leva pelo menos 2.5 segundos)
    if (typeof fillTime === 'number' && fillTime < 2500) {
      console.warn(`[Anti-Bot API] FILL_TIME_SUSPICIOUS (${fillTime}ms) pelo IP ${ip}. Descartando.`);
      return NextResponse.json({ success: true, messageCode: 'SUCCESS' });
    }

    // 4. Validação de Conteúdo & Palavras Chave de Spam
    const fullText = `${nome} ${email} ${assunto} ${mensagem}`.toLowerCase();
    const isSpam = SPAM_KEYWORDS.some((kw) => fullText.includes(kw));

    if (isSpam) {
      console.warn(`[Anti-Bot API] SPAM_DETECTED na mensagem pelo IP ${ip}. Descartando silenciosamente.`);
      return NextResponse.json({ success: true, messageCode: 'SUCCESS' });
    }

    // 5. Validação de Campos Obrigatórios
    if (!nome || !email || !assunto || !mensagem) {
      return NextResponse.json({ error: 'VALIDATION_ERROR' }, { status: 400 });
    }

    // 6. Access Key EXCLUSIVAMENTE via variável de ambiente da Vercel (SEM CHAVE NO CÓDIGO)
    const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!web3formsAccessKey) {
      console.error('[API /api/contato] WEB3FORMS_ACCESS_KEY não configurada nas variáveis de ambiente da Vercel.');
      return NextResponse.json({ error: 'SERVICE_UNAVAILABLE' }, { status: 500 });
    }

    const web3Payload = {
      access_key: web3formsAccessKey,
      subject: `⚖️ [PETIÇÃO NOTARIAL] Novo Contato: ${nome} (${assunto})`,
      from_name: 'Portfólio Notarial Kauê Ruon',
      replyto: email,
      name: nome,
      email: email,
      assunto: assunto,
      message: `REQUERENTE: ${nome}\nE-MAIL: ${email}\nOBJETO: ${assunto}\n\nMENSAGEM:\n${mensagem}`,
    };

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(web3Payload),
    });

    const responseText = await res.text();
    let data: any = {};

    try {
      data = JSON.parse(responseText);
    } catch {
      console.warn('[API /api/contato] Resposta não-JSON do Web3Forms:', responseText.substring(0, 150));
    }

    if (res.ok && (data.success || responseText.includes('success'))) {
      return NextResponse.json({ success: true, messageCode: 'SUCCESS' });
    } else {
      console.error('[API /api/contato] Erro Web3Forms:', data || responseText);
      return NextResponse.json({ error: 'SERVICE_UNAVAILABLE' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[API /api/contato] Erro:', error?.message || error);
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
