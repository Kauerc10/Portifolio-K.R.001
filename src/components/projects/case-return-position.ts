import type { Locale } from '@/i18n/config';

const PREFIX = 'portfolio-case-return';
const DEFAULT_MAX_AGE = 30 * 60 * 1000;

type StorageLike = Pick<Storage, 'getItem' | 'removeItem' | 'setItem'>;

export type CaseReturnContext = {
  locale: Locale;
  caseSlug: string;
  homePath: string;
  now?: number;
  maxAgeMs?: number;
  storage?: StorageLike | null;
};

type StoredPosition = { path: string; y: number; time: number };

export function caseReturnKey(locale: Locale, caseSlug: string) {
  return `${PREFIX}:${encodeURIComponent(locale)}:${encodeURIComponent(caseSlug)}`;
}

function getStorage(storage?: StorageLike | null) {
  if (storage !== undefined) return storage;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function isPlainPrimaryClick(event: Pick<MouseEvent, 'button' | 'metaKey' | 'ctrlKey' | 'shiftKey' | 'altKey'>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function captureCaseReturnPosition(context: CaseReturnContext, position: { path: string; y: number } = { path: window.location.pathname, y: window.scrollY }) {
  if (!Number.isFinite(position.y) || position.y < 0) return false;
  const storage = getStorage(context.storage);
  if (!storage) return false;
  try {
    storage.setItem(caseReturnKey(context.locale, context.caseSlug), JSON.stringify({ ...position, time: context.now ?? Date.now() } satisfies StoredPosition));
    return true;
  } catch {
    return false;
  }
}

export function restoreCaseReturnPosition(context: CaseReturnContext, options: { scrollTo?: (position: { top: number; behavior: ScrollBehavior }) => void; focus?: () => void } = {}) {
  const storage = getStorage(context.storage);
  if (!storage) return false;
  const now = context.now ?? Date.now();
  const maxAge = context.maxAgeMs ?? DEFAULT_MAX_AGE;
  let record: StoredPosition;
  try {
    const raw = storage.getItem(caseReturnKey(context.locale, context.caseSlug));
    if (!raw) return false;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;
    const candidate = parsed as Record<string, unknown>;
    if (typeof candidate.path !== 'string' || typeof candidate.y !== 'number' || typeof candidate.time !== 'number') return false;
    record = { path: candidate.path, y: candidate.y, time: candidate.time };
    storage.removeItem(caseReturnKey(context.locale, context.caseSlug));
  } catch {
    return false;
  }
  if (record.path !== context.homePath || !Number.isFinite(record.y) || record.y < 0 || !Number.isFinite(record.time) || record.time > now || now - record.time >= maxAge) return false;
  const scrollTo = options.scrollTo ?? ((position) => window.scrollTo(position));
  scrollTo({ top: record.y, behavior: 'instant' });
  options.focus?.();
  return true;
}
