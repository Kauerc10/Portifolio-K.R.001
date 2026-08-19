export type AnalyticsEvent =
  | { name: 'whatsapp_click'; context: 'home' | 'services' | 'career' | 'project'; message?: string }
  | { name: 'resume_download'; source: 'hero' | 'career_page' | 'navbar' | 'aevo' }
  | { name: 'router_choice'; intent: 'business' | 'career' }
  | { name: 'project_view'; slug: string; audience: string }
  | { name: 'aevo_interaction'; action: string; toolUsed?: string };

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event.name, event);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: event.name, ...event });
    }
  } catch {
    // Analytics nunca deve quebrar a execução da aplicação
  }
}
