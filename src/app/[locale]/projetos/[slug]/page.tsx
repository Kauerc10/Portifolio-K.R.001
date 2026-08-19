import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getProjects, getProjectBySlug } from '@/content/projects';
import GlobalHeader from '@/components/layout/GlobalHeader';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudyMetrics from '@/components/case-study/CaseStudyMetrics';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';
import CaseStudyActions from '@/components/case-study/CaseStudyActions';
import Footer from '@/components/sections/Footer';

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  locales.forEach((locale) => {
    const projects = getProjects(locale);
    projects.forEach((project) => {
      params.push({ locale, slug: project.slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isValidLocale(rawLocale)) {
    return {};
  }
  const locale = rawLocale as Locale;
  const project = getProjectBySlug(locale, slug);

  if (!project) {
    return {};
  }

  const isEn = locale === 'en-US';
  const title = `${project.title} | ${isEn ? 'Case Study' : 'Estudo de Caso'} · Kauê Ruon Cardoso`;
  const description = project.summary;

  return {
    title,
    description,
    alternates: {
      canonical: `https://kaueruon.dev/${locale}/projetos/${slug}`,
      languages: {
        'pt-BR': `https://kaueruon.dev/pt-BR/projetos/${slug}`,
        'en-US': `https://kaueruon.dev/en-US/projetos/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://kaueruon.dev/${locale}/projetos/${slug}`,
      siteName: 'Kauê Ruon Cardoso — Portfolio',
      locale,
      type: 'article',
      images: project.screenshots.map((s) => ({
        url: s.src,
        width: s.width,
        height: s.height,
        alt: s.alt,
      })),
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale as Locale;
  const project = getProjectBySlug(locale, slug);

  if (!project) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <GlobalHeader locale={locale} dict={dict.nav} />

      <main id="main-content" className="flex-1">
        <CaseStudyHero project={project} locale={locale} />
        <CaseStudyMetrics metrics={project.metrics} />
        <CaseStudyContent project={project} />
        <CaseStudyActions project={project} locale={locale} />
      </main>

      <Footer dict={dict.footer} />
    </div>
  );
}
