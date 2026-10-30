import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import HeroSection from '@/components/sections/HeroSection';
import ptBR from '@/i18n/locales/pt-BR.json';
vi.mock('@/components/hero/HeroLandscape', () => ({ default: ({activePath}: {activePath:number}) => <output aria-label="Highlighted path">{activePath}</output> }));
it('keeps keyboard highlight through pointer leave and restores hover after blur', () => {
  render(<HeroSection dict={ptBR.hero} />);
  const development=screen.getByRole('link',{name:'Desenvolvimento'});
  const support=screen.getByRole('link',{name:'Suporte'});
  fireEvent.focus(development);
  fireEvent.pointerEnter(development);
  fireEvent.pointerLeave(development);
  expect(screen.getByLabelText('Highlighted path')).toHaveTextContent('1');
  fireEvent.pointerEnter(support);
  expect(screen.getByLabelText('Highlighted path')).toHaveTextContent('1');
  fireEvent.blur(development);
  expect(screen.getByLabelText('Highlighted path')).toHaveTextContent('3');
  fireEvent.pointerLeave(support);
  expect(screen.getByLabelText('Highlighted path')).toHaveTextContent('0');
});

it('lets touch visitors select evidence before following a direct destination link', () => {
  render(<HeroSection dict={ptBR.hero} />);
  fireEvent.click(screen.getByRole('button',{name:'Explorar Automação'}));
  expect(screen.getByRole('button',{name:'Explorar Automação'})).toHaveAttribute('aria-pressed','true');
  expect(screen.getByRole('region',{name:'Prévia da área'})).toHaveTextContent('Atlas Notarial');
  expect(screen.getByRole('link',{name:'Ver Automação'})).toHaveAttribute('href','#project-atlas');
  expect(screen.getByRole('link',{name:'Automação'})).toHaveAttribute('href','#project-atlas');
  expect(screen.getByLabelText('Highlighted path')).toHaveTextContent('2');
});


it('aborts the scene anchor request on unmount while links remain available', () => {
  const fetcher=vi.fn((_url:string,_options:{signal:AbortSignal})=>new Promise(()=>{}));vi.stubGlobal('fetch',fetcher);
  try {
    const {unmount}=render(<HeroSection dict={ptBR.hero} />);
    expect(screen.getByRole('link',{name:'Desenvolvimento'})).toHaveAttribute('href','#projetos');
    const signal=fetcher.mock.calls[0][1].signal as AbortSignal;
    expect(signal.aborted).toBe(false);unmount();expect(signal.aborted).toBe(true);
  } finally {vi.unstubAllGlobals();}
});
