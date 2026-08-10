import { NextResponse } from 'next/server';
import { AevoProviderFactory } from '@/lib/aevo/provider-factory';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Formato de mensagens inválido.' }, { status: 400 });
    }

    const result = await AevoProviderFactory.generateResponse({ messages });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[API /api/aevo] Erro:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar requisição no agente ÆVO.' },
      { status: 500 }
    );
  }
}
