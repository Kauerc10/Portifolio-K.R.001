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
    const { allowed, retryAfter } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: `Muitas solicitações enviadas. Aguarde ${retryAfter}s para protocolar novamente.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { nome, email, assunto, mensagem, botcheck, fillTime } = body;

    // 2. Honeypot Anti-Bot (se preenchido, é um robô -> drop silencioso com HTTP 200 ok)
    if (botcheck && String(botcheck).trim().length > 0) {
      console.warn(`[Anti-Bot API] Honeypot ativado pelo IP ${ip}. Descartando silenciosamente.`);
      return NextResponse.json({ success: true, message: 'Petição recebida com sucesso.' });
    }

    // 3. Tempo Mínimo de Preenchimento (Humano leva pelo menos 3 segundos)
    if (typeof fillTime === 'number' && fillTime < 2500) {
      console.warn(`[Anti-Bot API] Preenchimento suspeito em ${fillTime}ms pelo IP ${ip}. Descartando.`);
      return NextResponse.json({ success: true, message: 'Petição recebida com sucesso.' });
    }

    // 4. Validação de Conteúdo & Palavras Chave de Spam
    const fullText = `${nome} ${email} ${assunto} ${mensagem}`.toLowerCase();
    const isSpam = SPAM_KEYWORDS.some((kw) => fullText.includes(kw));

    if (isSpam) {
      console.warn(`[Anti-Bot API] Palavra de spam identificada na mensagem. Descartando silenciosamente.`);
      return NextResponse.json({ success: true, message: 'Petição recebida com sucesso.' });
    }

    // 5. Validação de Campos Obrigatórios
    if (!nome || !email || !assunto || !mensagem) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    // 6. Encaminhamento para o Web3Forms com Título Notarial Formatado
    const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_KEY';

    const web3Payload = {
      access_key: web3formsAccessKey,
      subject: `⚖️ [PETIÇÃO NOTARIAL] Novo Contato: ${nome} (${assunto})`,
      from_name: 'Portfólio Notarial Kauê Ruon',
      replyto: email,
      name: nome,
      email: email,
      assunto: assunto,
      mensagem: mensagem,
    };

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(web3Payload),
    });

    const data = await res.json();

    if (data.success) {
      return NextResponse.json({ success: true, message: '✓ Petição protocolada com sucesso!' });
    } else {
      throw new Error(data.message || 'Erro ao comunicar com provedor de e-mail.');
    }
  } catch (error: any) {
    console.error('[API /api/contato] Erro:', error);
    return NextResponse.json(
      { error: 'Falha interna ao processar envio. Tente diretamente por e-mail: kaue.ruon@gmail.com' },
      { status: 500 }
    );
  }
}
