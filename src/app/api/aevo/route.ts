import { NextResponse } from 'next/server';
import { AevoProviderFactory } from '@/lib/aevo/provider-factory';
import { z } from 'zod';

const aevoRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().min(1).max(1500),
  })).min(1).max(15),
  locale: z.enum(['pt-BR', 'en-US']).optional().default('pt-BR'),
}).strict();

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

    const parsedBody = aevoRequestSchema.safeParse(await req.json());
    if (!parsedBody.success) {
      return NextResponse.json({ error: 'Payload de mensagens inválido.' }, { status: 400 });
    }

    const { messages, locale } = parsedBody.data;

    const result = await AevoProviderFactory.generateResponse({ messages, locale });

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('[API /api/aevo] Erro:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar requisição no agente ÆVO.' },
      { status: 500 }
    );
  }
}
