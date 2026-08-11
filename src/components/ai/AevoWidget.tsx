'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, CheckCircle2, Copy, FileText, FolderGit2, Building2, Mail, FileSignature, Zap, Unlock, Activity } from 'lucide-react';
import { AevoChatMessage } from '@/types/aevo';

function AevoMascot({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" role="img" aria-label="ÆVO">
      <path d="M24 4 40 13v18L24 44 8 35V13L24 4Z" fill="#0d1424" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 24c0-6.1 3.8-10 9-10s9 3.9 9 10-3.8 10-9 10-9-3.9-9-10Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18.5 23.5 22 20l2 3.5L26 20l3.5 3.5" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 28.5c2.8 1.8 6.2 1.8 9 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="4" r="2" fill="#60a5fa" />
      <path d="M6 20H2m44 0h-4M7 34l-3 2m37-2 3 2" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function renderMessage(content: string) {
  return content.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className="rounded-sm bg-black/30 px-1 py-0.5 text-[10px] text-blue-200">{part.slice(1, -1)}</code>;
    }
    return <span key={index}>{part}</span>;
  });
}

export default function AevoWidget({ locale }: { locale?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [providerUsed, setProviderUsed] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ icon: React.ReactNode; text: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isEnglish = locale === 'en-US';

  const [messages, setMessages] = useState<AevoChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: isEnglish
        ? 'Hello! I am **ÆVO**, the official AI Agent for Kauê Ruon Cardoso. I know his complete notary background, math awards (OBMEP), and Next.js/AI project architecture. How can I help you today?'
        : 'Olá! Sou **ÆVO**, o Agente de IA Oficial de Kauê Ruon Cardoso. Conheço todo o seu histórico notarial no Cartório Gaya, conquistas na OBMEP e arquitetura de projetos em Next.js/IA. Como posso ajudar?',
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
        showToast(<Activity className="w-4 h-4 text-[var(--gold)]" />, 'Habilidades destacadas no painel');
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
      // Limitar o histórico enviado na requisição aos últimos 10 itens para nunca exceder o limite de 15 mensagens do servidor
      const payloadMessages = newHistory.slice(-10).map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/aevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          locale: locale || 'pt-BR',
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
        <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-[#0b1120] text-[var(--gold)] border border-[var(--gold)]/40 shadow-[0_12px_36px_rgba(0,0,0,0.4)] text-xs font-mono animate-in fade-in slide-in-from-top-3 flex items-center gap-2.5">
          {toastMessage.icon}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Botão de Toggle Cyberdeck Notarial */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={isEnglish ? 'Open ÆVO AI assistant' : 'Abrir assistente de IA ÆVO'}
          className="group relative flex h-11 items-center gap-2.5 overflow-hidden rounded-lg border border-white/15 bg-[#0a0f1c]/95 px-3 py-2 text-white shadow-[0_14px_40px_rgba(0,0,0,0.38)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--gold)]/60 hover:shadow-[0_18px_44px_rgba(0,0,0,0.48)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
        >
          <span className="text-[var(--gold)] transition-transform duration-300 group-hover:scale-105">
            <AevoMascot className="h-7 w-7" />
          </span>
          <span className="text-left">
            <span className="block text-[10px] font-bold tracking-[0.16em] text-white">ÆVO</span>
            <span className="block text-[8px] tracking-[0.12em] text-slate-400">{isEnglish ? 'AGENT' : 'AGENTE'}</span>
          </span>
        </button>
      )}

      {/* Janela do Terminal Cyberdeck ÆVO */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] h-[min(550px,calc(100vh-6rem))] max-h-[calc(100vh-2rem)] rounded-xl bg-[#080d18]/98 border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,0.58)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header Notarial */}
          <div className="px-4 py-3.5 bg-[#0d1424] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-[var(--gold)]"><AevoMascot className="h-9 w-9" /></span>
              <div>
                <h3 className="text-xs font-bold text-white tracking-widest flex items-center gap-2">
                  ÆVO <span className="text-[9px] font-normal text-slate-500">/ {isEnglish ? 'AGENT' : 'AGENTE'}</span>
                </h3>
                <p className="text-[10px] text-gray-400">
                  {providerUsed ? `${isEnglish ? 'Active engine' : 'Engine ativa'}: ${providerUsed}` : (isEnglish ? 'Provider-agnostic AI · Portfolio knowledge' : 'IA agnóstica · Conhecimento do portfólio')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label={isEnglish ? 'Close ÆVO assistant' : 'Fechar assistente ÆVO'}
              className="grid h-8 w-8 place-items-center rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
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
                  className={`max-w-[88%] px-3.5 py-3 rounded-lg ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white border border-blue-400/30 shadow-[0_8px_24px_rgba(37,99,235,0.16)]'
                      : 'bg-[#0d1424] text-slate-200 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.18)]'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <span className="mb-1.5 flex items-center gap-1.5 text-[9px] font-bold tracking-[0.12em] text-[var(--gold)]"><AevoMascot className="h-4 w-4" /> ÆVO</span>
                  )}
                  <p className="whitespace-pre-line text-[11px] font-mono leading-[1.65]">{renderMessage(m.content)}</p>
                </div>

                {/* Badge de Tool Call se houver */}
                {m.toolCalls && m.toolCalls.length > 0 && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-[9px] text-emerald-300 px-1 py-1 tracking-wide">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{isEnglish ? 'Action completed' : 'Ação concluída'}: {m.toolCalls.map(t => t.name).join(', ')}</span>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-[var(--gold)] text-xs p-2 text-slate-300 border-t border-white/10">
                <Activity className="w-4 h-4 text-[var(--gold)]" />
                <span>{isEnglish ? 'ÆVO is consulting the knowledge base…' : 'ÆVO consultando a base de conhecimento…'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Atalhos contextuais */}
          <div className="px-3 py-2.5 bg-[#0b1120] border-t border-white/10 flex gap-1 overflow-x-auto text-[10px]">
            <button
              onClick={() => handleSend(isEnglish ? "Tell me about Kauê's AI projects" : 'Me fale dos projetos de IA do Kauê')}
              className="px-2.5 py-1.5 text-slate-400 hover:text-white border-b border-transparent hover:border-[var(--gold)] whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-[var(--gold)]" /> {isEnglish ? 'Projects' : 'Projetos'}
            </button>
            <button
              onClick={() => handleSend(isEnglish ? 'What did he build at Cartório Gaya?' : 'Qual a atuação dele no Cartório Gaya?')}
              className="px-2.5 py-1.5 text-slate-400 hover:text-white border-b border-transparent hover:border-[var(--gold)] whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-[var(--gold)]" /> {isEnglish ? 'Notary work' : 'Cartório'}
            </button>
            <button
              onClick={() => handleSend(isEnglish ? 'I want the contact email' : 'Quero o email de contato')}
              className="px-2.5 py-1.5 text-slate-400 hover:text-white border-b border-transparent hover:border-[var(--gold)] whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--gold)]" /> {isEnglish ? 'Contact' : 'E-mail'}
            </button>
            <button
              onClick={() => handleSend(isEnglish ? 'Help me fill out the contact form' : 'Preencher proposta de contato')}
              className="px-2.5 py-1.5 text-slate-400 hover:text-white border-b border-transparent hover:border-[var(--gold)] whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <FileSignature className="w-3.5 h-3.5 text-[var(--gold)]" /> {isEnglish ? 'Inquiry' : 'Petição'}
            </button>
          </div>

          {/* Input Box Cyberdeck */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#0d1424] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              aria-label={isEnglish ? 'Message to ÆVO' : 'Mensagem para o ÆVO'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isEnglish ? 'Ask about Kauê…' : 'Pergunte sobre Kauê…'}
              className="flex-1 bg-[#0b1120] text-white text-xs px-3.5 py-2.5 rounded-md border border-white/15 focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30 placeholder:text-gray-500 font-mono"
            />
            <button
              type="submit"
              aria-label={isEnglish ? 'Send message' : 'Enviar mensagem'}
              disabled={loading}
              className="p-2.5 rounded-md bg-[var(--gold)] text-[#0b1120] hover:bg-amber-400 font-bold transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
