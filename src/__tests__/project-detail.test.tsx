import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudyMetrics from '@/components/case-study/CaseStudyMetrics';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';
import CaseStudyActions from '@/components/case-study/CaseStudyActions';
import { generateStaticParams } from '@/app/[locale]/projetos/[slug]/page';
import { getProjectBySlug, getProjects } from '@/content/projects';

describe('Páginas de Detalhes de Case Study /projetos/[slug] (Task 8)', () => {
  it('deve gerar static params para todas as combinações de locales e slugs', () => {
    const params = generateStaticParams();
    const expectedCount = getProjects('pt-BR').length * 2; // pt-BR e en-US
    expect(params.length).toBe(expectedCount);

    params.forEach((param) => {
      expect(['pt-BR', 'en-US']).toContain(param.locale);
      expect(param.slug).toBeTruthy();
    });
  });

  it('deve renderizar o CaseStudyHero com título, papel e link para todos os projetos', () => {
    const project = getProjectBySlug('pt-BR', 'docfacil');
    expect(project).toBeDefined();

    if (project) {
      render(<CaseStudyHero project={project} locale="pt-BR" />);

      expect(screen.getByRole('heading', { level: 1, name: new RegExp(project.title, 'i') })).toBeInTheDocument();
      expect(screen.getByText(project.role)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Voltar para todos os projetos/i })).toHaveAttribute('href', '/pt-BR/projetos');
    }
  });

  it('deve renderizar as métricas de impacto no CaseStudyMetrics', () => {
    const project = getProjectBySlug('pt-BR', 'docfacil');
    expect(project).toBeDefined();

    if (project) {
      render(<CaseStudyMetrics metrics={project.metrics} />);

      project.metrics.forEach((metric) => {
        expect(screen.getByText(metric.value)).toBeInTheDocument();
        expect(screen.getByText(metric.label)).toBeInTheDocument();
      });
    }
  });

  it('deve renderizar o CaseStudyContent com desafio, solução e capacidades', () => {
    const project = getProjectBySlug('pt-BR', 'docfacil');
    expect(project).toBeDefined();

    if (project) {
      render(<CaseStudyContent project={project} />);

      expect(screen.getByText(project.problem)).toBeInTheDocument();
      expect(screen.getByText(project.solution)).toBeInTheDocument();
      expect(screen.getByText(project.capabilities[0])).toBeInTheDocument();
    }
  });

  it('deve renderizar links de ação e conversão no CaseStudyActions', () => {
    const project = getProjectBySlug('pt-BR', 'docfacil');
    expect(project).toBeDefined();

    if (project) {
      render(<CaseStudyActions project={project} locale="pt-BR" />);

      expect(screen.getByRole('link', { name: /Live Demo/i })).toHaveAttribute('href', 'https://docfacil-indol.vercel.app');
      expect(screen.getByRole('link', { name: /Discutir projeto similar/i })).toHaveAttribute('href', '/pt-BR/servicos#contato');
    }
  });
});
