import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackEvent } from '@/lib/analytics';

describe('Analytics Desacoplado de Conversão e Intenção (Task 14)', () => {
  beforeEach(() => {
    delete (window as { gtag?: unknown }).gtag;
    delete (window as { dataLayer?: unknown }).dataLayer;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve ser um no-op seguro quando window.gtag e dataLayer não existem', () => {
    expect(() => {
      trackEvent({ name: 'whatsapp_click', context: 'services' });
    }).not.toThrow();
  });

  it('deve enviar eventos via window.gtag quando configurado', () => {
    const gtagMock = vi.fn();
    window.gtag = gtagMock;

    trackEvent({ name: 'resume_download', source: 'career_page' });

    expect(gtagMock).toHaveBeenCalledWith('event', 'resume_download', {
      name: 'resume_download',
      source: 'career_page',
    });
  });

  it('deve enviar eventos via window.dataLayer quando gtag não está presente', () => {
    window.dataLayer = [];

    trackEvent({ name: 'router_choice', intent: 'business' });

    expect(window.dataLayer.length).toBe(1);
    expect(window.dataLayer[0]).toEqual({
      event: 'router_choice',
      name: 'router_choice',
      intent: 'business',
    });
  });
});
