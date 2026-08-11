import { NextResponse } from 'next/server';
import { AevoProviderFactory } from '@/lib/aevo/provider-factory';

// Rate limiter em memória por IP (Sliding Window de 60s, máx 10 req/minuto)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return { allowed: true };
  }

  if (entry.count >= 10) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true };
}

export async function POST(req: Request) {
  try {
    // Obter IP do cliente via headers
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';

    // 1. Controle de abuso de Rate Limit
    const { allowed, retryAfter } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: `Limite de requisições excedido. Tente novamente em ${retryAfter}s.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const body = await req.json();
    const { messages, locale } = body;

    // 2. Validação estrita do payload (máx 15 mensagens no histórico)
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Formato de mensagens inválido.' }, { status: 400 });
    }

    if (messages.length > 15) {
      return NextResponse.json(
        { error: 'Histórico excedeu o limite máximo de 15 mensagens.' },
        { status: 400 }
      );
    }

    // 3. Validação de tamanho individual de cada mensagem (máx 1500 caracteres)
    for (const msg of messages) {
      if (!msg.content || typeof msg.content !== 'string' || msg.content.length > 1500) {
        return NextResponse.json(
          { error: 'Mensagem excede o limite máximo de 1.500 caracteres.' },
          { status: 400 }
        );
      }
    }

    const result = await AevoProviderFactory.generateResponse({ messages, locale: locale || 'pt-BR' });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[API /api/aevo] Erro:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar requisição no agente ÆVO.' },
      { status: 500 }
    );
  }
}
