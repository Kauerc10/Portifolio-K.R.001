import { NextResponse } from 'next/server';
import { AevoProviderFactory } from '@/lib/aevo/provider-factory';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Formato de mensagem inválido.' },
        { status: 400 }
      );
    }

    const response = await AevoProviderFactory.generateResponse({ messages });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('[API /api/aevo] Erro:', error);
    return NextResponse.json(
      { error: 'Falha ao processar mensagem do Agente ÆVO.' },
      { status: 500 }
    );
  }
}
