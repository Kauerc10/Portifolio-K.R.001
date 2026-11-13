import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CaseGallery from '@/components/projects/CaseGallery';
import { captureCaseReturnPosition, caseReturnKey, isPlainPrimaryClick, restoreCaseReturnPosition } from '@/components/projects/case-return-position';

function storage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  };
}

describe('C02 — case foundation', () => {
  it('namespaces return positions by locale and case and restores only a fresh finite record', () => {
    const store = storage();
    const context = { locale: 'pt-BR' as const, caseSlug: 'viodigital', homePath: '/pt-BR', storage: store, now: 10_000 };
    expect(caseReturnKey('pt-BR', 'viodigital')).not.toBe(caseReturnKey('en-US', 'viodigital'));
    expect(caseReturnKey('pt-BR', 'viodigital')).not.toBe(caseReturnKey('pt-BR', 'ckf'));
    expect(captureCaseReturnPosition(context, { path: '/pt-BR', y: 1994 })).toBe(true);
    const scrollTo = vi.fn();
    const focus = vi.fn();
    expect(restoreCaseReturnPosition(context, { scrollTo, focus })).toBe(true);
    expect(scrollTo).toHaveBeenCalledWith({ top: 1994, behavior: 'instant' });
    expect(focus).toHaveBeenCalledOnce();
    expect(restoreCaseReturnPosition(context, { scrollTo })).toBe(false);

    store.setItem(caseReturnKey('pt-BR', 'viodigital'), 'null');
    expect(restoreCaseReturnPosition(context, { scrollTo })).toBe(false);
    store.setItem(caseReturnKey('pt-BR', 'viodigital'), '"not a record"');
    expect(restoreCaseReturnPosition(context, { scrollTo })).toBe(false);

    expect(captureCaseReturnPosition(context, { path: '/pt-BR', y: Number.NaN })).toBe(false);
    expect(captureCaseReturnPosition({ ...context, now: 1_000 }, { path: '/pt-BR', y: 10 })).toBe(true);
    expect(restoreCaseReturnPosition({ ...context, now: 1_000 + 30 * 60 * 1000 }, { scrollTo })).toBe(false);
  });

  it('captures only an unmodified primary click, preserving native link behavior for modified clicks', () => {
    expect(isPlainPrimaryClick({ button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false })).toBe(true);
    expect(isPlainPrimaryClick({ button: 1, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false })).toBe(false);
    expect(isPlainPrimaryClick({ button: 0, metaKey: true, ctrlKey: false, shiftKey: false, altKey: false })).toBe(false);
  });

  it('keeps the gallery accessible and returns focus to the activating media button', () => {
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) { this.setAttribute('open', ''); });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) { this.removeAttribute('open'); this.dispatchEvent(new Event('close')); });
    render(<CaseGallery enlarge="Ampliar" close="Fechar" naming="VioDigital" items={[{ id: 'desktop', src: '/desktop.png', alt: 'desktop', caption: 'Tela desktop', width: 10, height: 10, className: 'desktop' }]} />);
    const trigger = screen.getByRole('button', { name: /Ampliar: Tela desktop/i });
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog')).toHaveAttribute('open');
    fireEvent.click(screen.getByRole('button', { name: /Fechar/i }));
    expect(document.activeElement).toBe(trigger);
  });
});
