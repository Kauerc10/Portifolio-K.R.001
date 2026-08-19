import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import CareerHero from '@/components/career/CareerHero';
import EngineeringPositioning from '@/components/career/EngineeringPositioning';
import TechStackMatrix from '@/components/career/TechStackMatrix';
import CareerTimeline from '@/components/career/CareerTimeline';
import ResumeDownloadCard from '@/components/career/ResumeDownloadCard';
import ptBR from '@/i18n/locales/pt-BR.json';

describe('Perfil de Carreira /carreira (Task 7)', () => {
  it('deve renderizar o CareerHero com H1, cargo e CTAs sociais e de currículo', () => {
    render(<CareerHero dict={ptBR.careerPage.hero} />);

    expect(screen.getByRole('heading', { level: 1, name: /Kauê Ruon Cardoso/i })).toBeInTheDocument();
    expect(screen.getByText(ptBR.careerPage.hero.subtitle)).toBeInTheDocument();

    const cvLink = screen.getByRole('link', { name: /Baixar Currículo PDF/i });
    expect(cvLink).toHaveAttribute('href', '/curriculo_kaue.pdf');
    expect(cvLink).toHaveAttribute('download');

    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/kauerc/');

    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Kauerc10');
  });

  it('deve renderizar o EngineeringPositioning com destaque para medalhas da OBMEP', () => {
    render(<EngineeringPositioning dict={ptBR.careerPage} />);

    expect(screen.getByText(/MEDALHISTA NACIONAL OBMEP \/ IMPA/i)).toBeInTheDocument();
    expect(screen.getByText(ptBR.careerPage.obmepDetail)).toBeInTheDocument();
    expect(screen.getByText(/Decomposição de Problemas/i)).toBeInTheDocument();
  });

  it('deve renderizar a matriz de tecnologias agrupada por categorias', () => {
    render(<TechStackMatrix dict={ptBR.careerPage} />);

    expect(screen.getByRole('heading', { level: 3, name: /Front-End & UI\/UX/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Back-End, APIs & Dados/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Engenharia de IA & Qualidade/i })).toBeInTheDocument();
  });

  it('deve renderizar a timeline com experiências no Cartório Gaya e DocFácil', () => {
    render(<CareerTimeline dict={ptBR.careerPage} />);

    expect(screen.getByText(/Cartório Gaya \(Blumenau\/SC\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Projetos Independentes & Clientes/i)).toBeInTheDocument();
  });

  it('deve renderizar o card de download de currículo com metadados e botão de download', () => {
    render(<ResumeDownloadCard dict={ptBR.careerPage} />);

    const downloadBtn = screen.getByRole('link', { name: /Download do Currículo \(\.PDF\)/i });
    expect(downloadBtn).toHaveAttribute('href', '/curriculo_kaue.pdf');
    expect(downloadBtn).toHaveAttribute('download');
    expect(screen.getByText(/Atualizado 2026/i)).toBeInTheDocument();
  });
});
