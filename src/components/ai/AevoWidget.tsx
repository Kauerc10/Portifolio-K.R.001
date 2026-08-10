'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Terminal, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { AevoChatMessage } from '@/types/aevo';

export default function AevoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [providerUsed, setProviderUsed] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<AevoChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Olá! Sou **ÆVO**, o Agente de IA Oficial de Kauê Ruon Cardoso. Conheço todo seu histórico notarial, conquistas na OBMEP e projetos em Next.js/IA. Como posso ajudar?',
      timestamp: Date.now(),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Processador de Tool Calling executado no navegador
  const executeClientTools = (toolCalls: Array<{ name: string; args: any }>) => {
    for (const tool of toolCalls) {
      if (tool.name === 'scroll_to_section' && tool.args?.sectionId) {
        const el = document.getElementById(tool.args.sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (tool.name === 'highlight_project' && tool.args?.projectSlug) {
        const el = document.getElementById(`project-${tool.args.projectSlug}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          el.classList.add('ring-2', 'ring-cyanNeon', 'scale-[1.02]');
          setTimeout(() => el.classList.remove('ring-2', 'ring-cyanNeon', 'scale-[1.02]'), 3000);
        }
      } else if (tool.name === 'open_resume') {
        window.open('/curriculo_kaue.pdf', '_blank');
      } else if (tool.name === 'trigger_glitch_mode') {
        window.dispatchEvent(new CustomEvent('aevoGlitch'));
      } else if (tool.name === 'trigger_konami_protocol') {
        window.dispatchEvent(new CustomEvent('aevoKonami'));
      }
    }
  };

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: AevoChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!userText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/aevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setProviderUsed(data.providerUsed || 'ÆVO Engine');

      const botMsg: AevoChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text,
        toolCalls: data.toolCalls,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMsg]);

      // Executar ferramentas chamadas pelo agente
      if (data.toolCalls && data.toolCalls.length > 0) {
        executeClientTools(data.toolCalls);
      }
    } catch (err) {
      console.error('[AevoWidget] Erro:', err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Desculpe, ocorreu uma oscilação na conexão com a camada de IA. Posso tentar novamente!',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      {/* Botão de Toggle do Widget */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 border border-white/20"
        >
          <Bot className="w-5 h-5 animate-pulse text-cyanNeon" />
          <span className="font-bold text-sm tracking-wide">Falar com ÆVO (AI Agent)</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      )}

      {/* Janela do Cyberdeck Terminal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[520px] rounded-2xl bg-bgDark/95 backdrop-blur-xl border border-cyanNeon/30 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="px-4 py-3 bg-cardBg/90 border-b border-cyanNeon/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyanNeon" />
              <div>
                <h3 className="text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
                  AGENTE ÆVO <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyanNeon/10 text-cyanNeon border border-cyanNeon/30">v2.5 RAG</span>
                </h3>
                <p className="text-[10px] text-gray-400">
                  {providerUsed ? `Engine: ${providerUsed}` : 'Camada Agnóstica com Fallbacks'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-xl ${
                    m.role === 'user'
                      ? 'bg-blue-600/80 text-white rounded-br-none border border-blue-400/30'
                      : 'bg-cardBg/90 text-gray-200 border border-white/10 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.content}</p>
                </div>

                {/* Badge de Tool Call se houver */}
                {m.toolCalls && m.toolCalls.length > 0 && (
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-cyanNeon bg-cyanNeon/10 px-2 py-0.5 rounded-full border border-cyanNeon/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Executou: {m.toolCalls.map(t => t.name).join(', ')}</span>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-cyanNeon text-xs animate-pulse p-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>ÆVO está processando com RAG...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-cardBg/50 border-t border-white/5 flex gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => handleSend('Me fale dos projetos')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 whitespace-nowrap border border-white/10"
            >
              🚀 Projetos
            </button>
            <button
              onClick={() => handleSend('Qual o histórico no Cartório Gaya?')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 whitespace-nowrap border border-white/10"
            >
              📜 Cartório
            </button>
            <button
              onClick={() => handleSend('Me fale sobre a OBMEP')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 whitespace-nowrap border border-white/10"
            >
              🏅 OBMEP
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-cardBg border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte ao Agente ÆVO..."
              className="flex-1 bg-bgDark/80 text-white text-xs px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyanNeon"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2 rounded-lg bg-cyanNeon text-bgDark hover:bg-cyan-400 font-bold transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
