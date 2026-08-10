import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectStatusBadge from '@/components/widgets/ProjectStatusBadge';

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
