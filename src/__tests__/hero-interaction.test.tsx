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

it('cleans up the image load callback even without ResizeObserver', () => {
  const image={src:'',onload:null as null|(()=>void)};
  vi.stubGlobal('Image',class {constructor(){return image;}});
  vi.stubGlobal('ResizeObserver',undefined);
  try {
    const {unmount}=render(<HeroSection dict={ptBR.hero} />);
    expect(image.onload).toBeTypeOf('function');
    unmount();
    expect(image.onload).toBeNull();
  } finally {vi.unstubAllGlobals();}
});
