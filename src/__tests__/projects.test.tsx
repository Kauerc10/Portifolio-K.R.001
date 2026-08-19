import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import FeaturedWork from '@/components/home/FeaturedWork';
import { getProjectBySlug, getProjects } from '@/content/projects';

describe('Cards Visuais de Projetos & FeaturedWork (Task 5)', () => {
  it('deve renderizar o ProjectCard com título, resumo, capacidades e imagem com alt descritivo', () => {
    const docfacil = getProjectBySlug('pt-BR', 'docfacil');
    expect(docfacil).toBeDefined();

    if (docfacil) {
      render(<ProjectCard project={docfacil} locale="pt-BR" />);

      expect(screen.getByRole('heading', { level: 3, name: /DocFácil/i })).toBeInTheDocument();
      expect(screen.getByText(docfacil.summary)).toBeInTheDocument();

      // Imagem com alt
      const img = screen.getByAltText(docfacil.screenshots[0].alt);
      expect(img).toBeInTheDocument();

      // Link para o case study
      const caseLink = screen.getByRole('link', { name: /Ver case completo/i });
      expect(caseLink).toHaveAttribute('href', '/pt-BR/projetos/docfacil');

      // Link para Live Demo
      const demoLink = screen.getByRole('link', { name: /Live Demo/i });
      expect(demoLink).toHaveAttribute('href', 'https://docfacil-indol.vercel.app');
    }
  });

  it('deve renderizar a seção FeaturedWork com todos os projetos marcados como featured', () => {
    const featuredCount = getProjects('pt-BR').filter((p) => p.featured).length;

    render(<FeaturedWork locale="pt-BR" />);

    expect(screen.getByRole('heading', { level: 2, name: /SISTEMAS EM PRODUÇÃO E PRODUTOS REAIS/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver todos os projetos/i })).toHaveAttribute('href', '/pt-BR/projetos');

    // Deve conter artigos para cada projeto featured
    const cards = screen.getAllByRole('article');
    expect(cards.length).toBe(featuredCount);
  });
});
