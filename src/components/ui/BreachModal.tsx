'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, Terminal, X, CheckCircle } from 'lucide-react';

export default function BreachModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const targetSequence = ['E9', '55', 'BD'];

  useEffect(() => {
    // Escutar evento Konami Code via teclado ou chamada do Agente ÆVO
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a',
    ];
    let keyIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[keyIndex]) {
        keyIndex++;
        if (keyIndex === konamiCode.length) {
          setIsOpen(true);
          keyIndex = 0;
        }
      } else {
        keyIndex = 0;
      }
    };

    const handleAevoKonami = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('aevoKonami', handleAevoKonami);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('aevoKonami', handleAevoKonami);
    };
  }, []);

  const handleGridClick = (code: string) => {
    if (unlocked) return;
    const newSeq = [...sequence, code];
    setSequence(newSeq);

    if (newSeq.join('-') === targetSequence.join('-')) {
      setUnlocked(true);
    } else if (newSeq.length >= targetSequence.length) {
      setTimeout(() => setSequence([]), 800);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 font-mono animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-cardBg border border-cyanNeon/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 bg-red-950/40 border-b border-red-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>[ BREACH PROTOCOL — ROOT ACCESS ]</span>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              setSequence([]);
              setUnlocked(false);
            }}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-gray-300">
            {unlocked
              ? '✓ ACESSO CONCEDIDO: Servidores Notariais & Matriz de IA Sincronizados!'
              : 'Selecione a sequência correta no buffer para descriptografar o terminal:'}
          </p>

          {/* Buffer Bar */}
          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-bgDark border border-cyanNeon/30 text-xs font-bold text-cyanNeon">
            <span>BUFFER:</span>
            {targetSequence.map((target, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 rounded border ${
                  sequence[idx] === target
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                    : 'bg-white/5 border-white/10 text-gray-500'
                }`}
              >
                {sequence[idx] || '__'}
              </span>
            ))}
          </div>

          {/* Matrix Grid */}
          {!unlocked ? (
            <div className="grid grid-cols-4 gap-2 text-xs font-mono text-center">
              {['1C', 'E9', '55', '7A', 'BD', 'E9', '1C', '55', 'BD', '7A', 'E9', '55'].map(
                (code, i) => (
                  <button
                    key={i}
                    onClick={() => handleGridClick(code)}
                    className="p-3 rounded-lg bg-white/5 hover:bg-cyanNeon/20 hover:text-cyanNeon border border-white/10 text-gray-300 font-bold transition-all"
                  >
                    {code}
                  </button>
                )
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Protocolo Desbloqueado!</span>
              </div>
              <p>
                "A tolerância zero a erros do trabalho notarial encontra a precisão da IA generativa."
              </p>
              <div className="pt-2 text-[11px] text-gray-400">
                Contato Direto do Kauê: <span className="text-cyanNeon">kaue.ruon@gmail.com</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
