import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { expect, it, beforeEach, afterEach, vi } from 'vitest';
import ProjetosSection from '@/components/sections/ProjetosSection';
import pt from '@/i18n/locales/pt-BR.json';
beforeEach(()=>{sessionStorage.clear();history.replaceState(null,'','/pt-BR');vi.stubGlobal('matchMedia',()=>({matches:true,addEventListener:vi.fn(),removeEventListener:vi.fn()}));vi.stubGlobal('IntersectionObserver',class{observe(){}disconnect(){}});});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
it('presents five cases in the approved home order with one active case',()=>{
 const {container}=render(<ProjetosSection dict={pt.projetos}/>);
 expect([...container.querySelectorAll('[data-panel] h3')].map(e=>e.textContent)).toEqual(['VioDigital','VECOM Ficha Fácil','Atlas Notarial','DocFácil','CKF Manutenção']);
 expect(container.querySelectorAll('[data-panel]:not([inert])')).toHaveLength(1);
 expect(screen.queryByRole('button',{name:/Leitura rápida/i})).toBeNull();
 expect(container.querySelectorAll('[data-stage-proof]')).toHaveLength(1);
});
it('cycles in both directions and exposes the selected native case link',()=>{
 const {container}=render(<ProjetosSection dict={pt.projetos}/>);
 fireEvent.click(screen.getByRole('button',{name:'Projeto anterior'}));
 expect(container.querySelector('[data-stage-proof]')).toHaveAttribute('data-active','ckf');
 expect(location.hash).toBe('#project-ckf');
 expect(container.querySelector('[data-panel]:not([inert]) a')).toHaveAttribute('href','/pt-BR/projetos/ckf');
 fireEvent.click(screen.getByRole('button',{name:'Próximo projeto'}));
 expect(container.querySelector('[data-stage-proof]')).toHaveAttribute('data-active','viodigital');
});
it('retains legacy project destinations and the Foli repository link',()=>{
 const {container}=render(<ProjetosSection dict={pt.projetos}/>);
 for(const id of ['project-atlas','project-ckf-legacy','project-docfacil-legacy'])expect(container.querySelector('#'+id)).not.toBeNull();
 expect(container.querySelector('#project-foli a')).toHaveAttribute('href','https://github.com/Kauerc10/foli');
});
