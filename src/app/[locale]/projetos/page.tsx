import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getProjects } from '@/content/projects';
import GlobalHeader from '@/components/layout/GlobalHeader';
import ProjectCard from '@/components/projects/ProjectCard';
import Footer from '@/components/sections/Footer';

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ audience?: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) {
    return {};
  }
  const locale = rawLocale as Locale;
  const isEn = locale === 'en-US';

  const title = isEn
    ? 'Software Projects & Case Studies | Kauê Ruon Cardoso'
    : 'Projetos de Software e Case Studies | Kauê Ruon Cardoso';

  const description = isEn
    ? 'Explore full-stack software projects, AI automations, and production systems engineered by Kauê Ruon Cardoso.'
    : 'Conheça os projetos de software, automações com IA e sistemas em produção desenvolvidos por Kauê Ruon Cardoso.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://kaueruon.dev/${locale}/projetos`,
      languages: {
        'pt-BR': 'https://kaueruon.dev/pt-BR/projetos',
        'en-US': 'https://kaueruon.dev/en-US/projetos',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://kaueruon.dev/${locale}/projetos`,
      siteName: 'Kauê Ruon Cardoso — Portfolio',
      locale,
      type: 'website',
    },
  };
}

export default async function ProjectsPage({ params, searchParams }: ProjectsPageProps) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const audienceFilter = resolvedSearchParams.audience;

  const allProjects = getProjects(locale);
  const filteredProjects = audienceFilter
    ? allProjects.filter((p) => p.audience === audienceFilter || p.audience === 'both')
    : allProjects;

  const isEn = locale === 'en-US';

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <GlobalHeader locale={locale} dict={dict.nav} />

      <main id="main-content" className="flex-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header da Página */}
          <div className="mb-12">
            <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
              {isEn ? 'PORTFOLIO & CASE STUDIES' : 'PORTFÓLIO & CASE STUDIES'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-1 mb-4 tracking-tight">
              {isEn ? 'Systems in Production & Real Products' : 'Sistemas em Produção & Produtos Reais'}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-sans">
              {isEn
                ? 'From business operational automation to open-source developer tooling and legal SaaS platforms.'
                : 'De automações operacionais para empresas a ferramentas open-source e plataformas SaaS notariais.'}
            </p>
          </div>

          {/* Grid de Todos os Projetos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
                seeCaseLabel={isEn ? 'View full case study' : 'Ver case completo'}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer dict={dict.footer} />
    </div>
  );
}
