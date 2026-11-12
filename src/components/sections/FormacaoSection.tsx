import { ArrowUpRight } from 'lucide-react';
import { SHARED_FORMATION_META, splitAccentTitle } from '@/lib/editorial';

type Study = {
  id: string;
  title: string;
  institution?: string;
  status?: string;
  hours?: string;
  year?: string;
  evidence?: string;
};

type StudyGroup = {
  id: string;
  title: string;
  institution?: string;
  items: Study[];
};

const summaryLimit = 6;

function resolveInstitution(study: Study, defaultInstitution?: string) {
  return study.institution ?? SHARED_FORMATION_META[study.id]?.institution ?? defaultInstitution;
}

function StudyList({
  studies,
  institution,
  continuedInstitution,
  otherCourses,
}: {
  studies: Study[];
  institution?: string;
  continuedInstitution?: string;
  otherCourses?: string;
}) {
  const byInstitution = new Map<string | undefined, Study[]>();
  for (const study of studies) {
    const name = resolveInstitution(study, institution);
    const group = byInstitution.get(name);
    if (group) group.push(study);
    else byInstitution.set(name, [study]);
  }

  return [...byInstitution].map(([name, items], index) => {
    const showHeading = Boolean(name ?? otherCourses) && !(name && index === 0 && name === continuedInstitution);
    return (
      <div key={name ?? ''}>
        {showHeading && <p className="formacao-editorial__institution">{name ?? otherCourses}</p>}
        <ul className="formacao-editorial__items">
          {items.map(study => {
            const shared = SHARED_FORMATION_META[study.id];
            const hours = study.hours ?? shared?.hours;
            const year = study.year ?? shared?.year;
            const details = [study.status, hours, year].filter(Boolean).join(' · ');
            return (
              <li className="formacao-editorial__item" key={study.id}>
                {study.evidence ? (
                  <a href={study.evidence}>{study.title}<ArrowUpRight size={14} aria-hidden="true" /></a>
                ) : <strong>{study.title}</strong>}
                {details && <span>{details}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
}

export default function FormacaoSection({ dict }: { dict: { title: string; showAll: string; otherCourses?: string; groups: StudyGroup[] } }) {
  const [titleLead, titleAccent] = splitAccentTitle(dict.title);
  return (
    <section className="section editorial-section formacao-editorial" id="formacao" data-section="6">
      <div>
        <h2 className="editorial-title editorial-title--display">
          {titleLead}{' '}<em>{titleAccent}</em>
        </h2>
      </div>
      <div className="formacao-editorial__groups">
        {dict.groups.filter(group => group.items.length > 0).map(group => {
          const hasMore = group.id === 'complementary' && group.items.length > summaryLimit;
          const summaryItems = hasMore ? group.items.slice(0, summaryLimit) : group.items;
          const lastSummaryInstitution = summaryItems.length > 0
            ? resolveInstitution(summaryItems[summaryItems.length - 1], group.institution)
            : undefined;
          return (
            <section className="formacao-editorial__group" key={group.id} aria-labelledby={`formacao-${group.id}`}>
              <h3 id={`formacao-${group.id}`}>{group.title}</h3>
              <StudyList studies={summaryItems} institution={group.institution} otherCourses={dict.otherCourses} />
              {hasMore && (
                <details className="formacao-editorial__more">
                  <summary>{dict.showAll} ({group.items.length})</summary>
                  <StudyList
                    studies={group.items.slice(summaryLimit)}
                    institution={group.institution}
                    continuedInstitution={lastSummaryInstitution}
                    otherCourses={dict.otherCourses}
                  />
                </details>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
