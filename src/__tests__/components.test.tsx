import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ProjectStatusBadge from '@/components/widgets/ProjectStatusBadge';
import AevoWidget from '@/components/ai/AevoWidget';

describe('ProjectStatusBadge Component', () => {
  it('deve renderizar o badge de status online por padrão', () => {
    render(<ProjectStatusBadge label="Online em Produção" />);
    expect(screen.getByText('Online em Produção')).toBeInTheDocument();
  });

  it('deve renderizar status privado quando especificado', () => {
    render(<ProjectStatusBadge status="private" label="Produção Privada" />);
    expect(screen.getByText('Produção Privada')).toBeInTheDocument();
  });
});

describe('AevoWidget Component', () => {
  it('deve isolar o scroll do histórico do smooth scroll global', () => {
    const parentWheel = vi.fn();
    render(<div onWheel={parentWheel}><AevoWidget locale="pt-BR" /></div>);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir assistente de IA ÆVO' }));

    const history = screen.getByLabelText('Histórico da conversa');
    expect(history).toHaveAttribute('data-lenis-prevent');
    expect(history).toHaveAttribute('data-lenis-prevent-wheel');
    expect(history).toHaveAttribute('data-lenis-prevent-touch');

    fireEvent.wheel(history, { deltaY: 120 });
    expect(parentWheel).not.toHaveBeenCalled();
  });
});
