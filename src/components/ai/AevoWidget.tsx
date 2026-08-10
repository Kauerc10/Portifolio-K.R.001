'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, ShieldCheck, Sparkles, CheckCircle2, Copy, FileText, FolderGit2, Building2, Mail, FileSignature, Zap, Unlock, Sparkle } from 'lucide-react';
import { AevoChatMessage } from '@/types/aevo';

export default function AevoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [providerUsed, setProviderUsed] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ icon: React.ReactNode; text: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<AevoChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Olá! Sou **ÆVO**, o Agente de IA Oficial de Kauê Ruon Cardoso. Conheço todo o seu histórico notarial no Cartório Gaya, conquistas na OBMEP e arquitetura de projetos em Next.js/IA. Como posso ajudar?',
      timestamp: Date.now(),
    },
  ]);

  const showToast = (icon: React.ReactNode, text: string) => {
    setToastMessage({ icon, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Processador de Tool Calling completo (9 Ferramentas Nativas)
  const executeClientTools = (toolCalls: Array<{ name: string; args: any }>) => {
    for (const tool of toolCalls) {
      if (tool.name === 'scroll_to_section' && tool.args?.sectionId) {
        const el = document.getElementById(tool.args.sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (tool.name === 'highlight_project' && tool.args?.projectSlug) {
        const el = document.getElementById(`project-${tool.args.projectSlug}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          el.classList.add('ring-2', 'ring-[var(--gold)]', 'scale-[1.02]');
          setTimeout(() => el.classList.remove('ring-2', 'ring-[var(--gold)]', 'scale-[1.02]'), 3000);
        }
      } else if (tool.name === 'open_resume') {
        window.open('/curriculo_kaue.pdf', '_blank');
        showToast(<FileText className="w-4 h-4 text-[var(--gold)]" />, 'Currículo PDF aberto com sucesso');
      } else if (tool.name === 'copy_contact_email') {
        navigator.clipboard?.writeText('kaue.ruon@gmail.com');
        showToast(<Copy className="w-4 h-4 text-[var(--gold)]" />, 'E-mail kaue.ruon@gmail.com copiado para a área de transferência');
      } else if (tool.name === 'fill_petition_form') {
        const form = document.getElementById('peticaoForm') as HTMLFormElement;
        if (form) {
          const assuntoInput = form.querySelector('input[name="assunto"]') as HTMLInputElement;
          if (assuntoInput) {
            assuntoInput.value = tool.args?.assunto || 'Proposta de Trabalho / Projeto IA';
            assuntoInput.classList.add('ring-2', 'ring-[var(--gold)]');
            setTimeout(() => assuntoInput.classList.remove('ring-2', 'ring-[var(--gold)]'), 3000);
          }
        }
        showToast(<FileSignature className="w-4 h-4 text-[var(--gold)]" />, 'Formulário de Petição preenchido automaticamente');
      } else if (tool.name === 'filter_skills') {
        const chips = document.querySelectorAll('.skills .chip');
        chips.forEach(chip => {
          chip.classList.add('ring-1', 'ring-[var(--gold)]');
          setTimeout(() => chip.classList.remove('ring-1', 'ring-[var(--gold)]'), 3000);
        });
        showToast(<Sparkles className="w-4 h-4 text-[var(--gold)]" />, 'Habilidades destacadas no painel');
      } else if (tool.name === 'trigger_glitch_mode') {
        window.dispatchEvent(new CustomEvent('aevoGlitch'));
        showToast(<Zap className="w-4 h-4 text-[var(--gold)]" />, 'Pulso de Glitch WebGL ativado');
      } else if (tool.name === 'trigger_konami_protocol') {
        window.dispatchEvent(new CustomEvent('aevoKonami'));
        showToast(<Unlock className="w-4 h-4 text-[var(--gold)]" />, 'Protocolo Root / God Mode ativado');
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-mono">
      {/* Toast Notification Notarial com ícones Lucide */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#0b1120] text-[var(--gold)] border border-[var(--gold)]/50 shadow-2xl backdrop-blur-xl text-xs font-mono animate-in fade-in slide-in-from-top-3 flex items-center gap-2.5">
          {toastMessage.icon}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Botão de Toggle Cyberdeck Notarial */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[#0b1120]/95 backdrop-blur-xl text-white shadow-2xl hover:scale-105 transition-all duration-300 border border-[var(--gold)]/40 hover:border-[var(--gold)] hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-5 h-5 text-[var(--gold)]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <div className="text-left">
            <span className="font-bold text-xs tracking-wider uppercase text-white block">AGENTE ÆVO</span>
            <span className="text-[10px] text-[var(--gold)] block">AI ENGINE · RAG + TOOL USE</span>
          </div>
        </button>
      )}

      {/* Janela do Terminal Cyberdeck ÆVO */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] h-[min(550px,calc(100vh-6rem))] max-h-[calc(100vh-2rem)] rounded-2xl bg-[#0b1120]/95 backdrop-blur-2xl border border-[var(--gold)]/40 shadow-[0_0_35px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header Notarial */}
          <div className="px-4 py-3 bg-[#0f172a]/90 border-b border-[var(--gold)]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[var(--gold)]" />
              <div>
                <h3 className="text-xs font-bold text-white tracking-widest flex items-center gap-2">
                  ÆVO PROTOCOL <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 font-mono">v2.5 RAG</span>
                </h3>
                <p className="text-[10px] text-gray-400">
                  {providerUsed ? `Engine Active: ${providerUsed}` : 'Agente Agnóstico de IA · Cartório Gaya'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs leading-relaxed">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in duration-300`}
              >
                <div
                  className={`max-w-[88%] px-4 py-3 rounded-xl ${
                    m.role === 'user'
                      ? 'bg-blue-600/90 text-white rounded-br-none border border-blue-400/40 shadow-lg'
                      : 'bg-white/5 text-gray-200 border border-[var(--gold)]/20 rounded-bl-none shadow-md backdrop-blur-md'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <span className="text-[10px] font-bold text-[var(--gold)] block mb-1">■ [ÆVO AGENT]:</span>
                  )}
                  <p className="whitespace-pre-line text-[11px] font-mono">{m.content}</p>
                </div>

                {/* Badge de Tool Call se houver */}
                {m.toolCalls && m.toolCalls.length > 0 && (
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Executou: {m.toolCalls.map(t => t.name).join(', ')}</span>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-[var(--gold)] text-xs animate-pulse p-2 bg-[var(--gold)]/5 rounded-lg border border-[var(--gold)]/20">
                <Sparkles className="w-4 h-4 animate-spin text-[var(--gold)]" />
                <span>ÆVO consultando base RAG e processando...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Pills rápidos com Ícones Lucide elegantes */}
          <div className="px-3 py-2 bg-[#0f172a]/60 border-t border-white/10 flex gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => handleSend('Me fale dos projetos de IA do Kauê')}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[var(--gold)]/20 text-gray-300 hover:text-[var(--gold)] border border-white/10 hover:border-[var(--gold)]/40 whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-[var(--gold)]" /> Projetos
            </button>
            <button
              onClick={() => handleSend('Qual a atuação dele no Cartório Gaya?')}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[var(--gold)]/20 text-gray-300 hover:text-[var(--gold)] border border-white/10 hover:border-[var(--gold)]/40 whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-[var(--gold)]" /> Cartório
            </button>
            <button
              onClick={() => handleSend('Quero o email de contato')}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[var(--gold)]/20 text-gray-300 hover:text-[var(--gold)] border border-white/10 hover:border-[var(--gold)]/40 whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--gold)]" /> E-mail
            </button>
            <button
              onClick={() => handleSend('Preencher proposta de contato')}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[var(--gold)]/20 text-gray-300 hover:text-[var(--gold)] border border-white/10 hover:border-[var(--gold)]/40 whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <FileSignature className="w-3.5 h-3.5 text-[var(--gold)]" /> Petição
            </button>
          </div>

          {/* Input Box Cyberdeck */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#0f172a] border-t border-[var(--gold)]/30 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Instruir Agente ÆVO..."
              className="flex-1 bg-[#0b1120] text-white text-xs px-3.5 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-[var(--gold)] placeholder:text-gray-500 font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2.5 rounded-lg bg-[var(--gold)] text-[#0b1120] hover:bg-amber-400 font-bold transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
