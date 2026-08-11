import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale } from '@/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Verificar se o caminho da URL já possui um locale válido (/pt-BR ou /en-US)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // URL explícita tem prioridade máxima: sincronizar cookie portfolio_lang sem redirecionar
    const currentLocale = pathname.split('/')[1];
    const response = NextResponse.next();
    response.cookies.set('portfolio_lang', currentLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 ano
      sameSite: 'lax',
    });
    return response;
  }

  // 2. Se a URL não tem locale, determinar o locale pela ordem de prioridade: Cookie -> Accept-Language -> Fallback
  const cookieLang = request.cookies.get('portfolio_lang')?.value;
  let targetLocale = defaultLocale;

  if (cookieLang && isValidLocale(cookieLang)) {
    targetLocale = cookieLang;
  } else {
    const acceptLang = request.headers.get('accept-language') || '';
    if (acceptLang.toLowerCase().includes('en')) {
      targetLocale = 'en-US';
    } else {
      targetLocale = 'pt-BR';
    }
  }

  // 3. Redirecionar para a URL com locale ex: /pt-BR ou /en-US preservando query params e hash
  request.nextUrl.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  
  response.cookies.set('portfolio_lang', targetLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Excluir rotas de API, arquivos estáticos do Next.js, favicon, sitemap, robots
     * e qualquer arquivo com extensão (ex: .png, .jpg, .webp, .css, .js)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
