import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const valid = { nome: 'Pessoa', email: 'person@example.com', assunto: 'Projeto', mensagem: 'Quero conversar sobre um projeto.' };
let count = 0;
const request = (body: unknown, origin = 'https://www.kaueruon.dev') => new Request('https://www.kaueruon.dev/api/contato', {
  method: 'POST', headers: { 'Content-Type': 'application/json', origin, 'x-forwarded-for': `192.0.2.${++count}` }, body: JSON.stringify(body),
});

beforeEach(() => { vi.stubEnv('WEB3FORMS_ACCESS_KEY', 'test-key'); });
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

describe('contact delivery', () => {
  it('validates fields on the server without contacting the provider', async () => {
    const fetch = vi.fn(); vi.stubGlobal('fetch', fetch);
    const { POST } = await import('@/app/api/contato/route');
    for (const body of [null, {}, { ...valid, email: 'invalid' }, { ...valid, nome: {} }, { ...valid, mensagem: 'x'.repeat(5001) }, { ...valid, botcheck: 'spam' }]) {
      expect((await POST(request(body))).status).toBe(400);
    }
    expect(fetch).not.toHaveBeenCalled();
  });
  it('rejects foreign origins and malformed JSON', async () => {
    const { POST } = await import('@/app/api/contato/route');
    expect((await POST(request(valid, 'https://foreign.example'))).status).toBe(403);
    expect((await POST(new Request('https://www.kaueruon.dev/api/contato', { method: 'POST', body: '{' }))).status).toBe(400);
  });
  it('reports missing configuration honestly', async () => {
    vi.stubEnv('WEB3FORMS_ACCESS_KEY', '');
    const { POST } = await import('@/app/api/contato/route');
    expect((await POST(request(valid))).status).toBe(503);
  });
  it('sends the reply address and confirms only explicit provider success', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true })));
    vi.stubGlobal('fetch', fetch);
    const { POST } = await import('@/app/api/contato/route');
    const response = await POST(request({ ...valid, fillTime: 1, mensagem: 'Projeto de crypto e segurança.' }));
    expect(await response.json()).toEqual({ success: true, messageCode: 'SUCCESS' });
    const payload = JSON.parse(fetch.mock.calls[0][1].body);
    expect(payload.replyto).toBe(valid.email);
    expect(payload.from_name).toBe('Portfólio Kauê Ruon');
    expect(payload).not.toHaveProperty('fillTime');
    expect(fetch.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
  });
  it('keeps failure responses distinct from successful delivery', async () => {
    const fetch = vi.fn(); vi.stubGlobal('fetch', fetch);
    const { POST } = await import('@/app/api/contato/route');
    for (const body of [{ success: false, message: 'not a success' }, { success: 'true' }]) {
      fetch.mockResolvedValueOnce(new Response(JSON.stringify(body)));
      expect((await POST(request(valid))).status).toBe(502);
    }
    fetch.mockRejectedValueOnce(new DOMException('Timeout', 'TimeoutError'));
    expect((await POST(request(valid))).status).toBe(502);
  });
  it('limits repeated requests and supplies retry timing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() => Promise.resolve(new Response('{"success":true}'))));
    const { POST } = await import('@/app/api/contato/route');
    const make = () => new Request('https://www.kaueruon.dev/api/contato', { method: 'POST', headers: { 'x-forwarded-for': '198.51.100.99' }, body: JSON.stringify(valid) });
    for (let i = 0; i < 3; i++) expect((await POST(make())).status).toBe(200);
    const response = await POST(make());
    expect(response.status).toBe(429);
    expect(Number(response.headers.get('Retry-After'))).toBeGreaterThan(0);
  });
});
