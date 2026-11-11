import { ArrowUpRight } from 'lucide-react';

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

function StudyList({ studies, institution }: { studies: Study[]; institution?: string }) {
  const byInstitution = new Map<string | undefined, Study[]>();
  for (const study of studies) {
    const name = study.institution ?? institution;
    const group = byInstitution.get(name);
    if (group) group.push(study);
    else byInstitution.set(name, [study]);
  }

  return [...byInstitution].map(([name, items]) => (
    <div key={name ?? ''}>
      {name && <p className="formacao-editorial__institution">{name}</p>}
      <ul className="formacao-editorial__items">
        {items.map(study => {
          const details = [study.status, study.hours, study.year].filter(Boolean).join(' · ');
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
  ));
}

export default function FormacaoSection({ dict }: { dict: { title: string; showAll: string; groups: StudyGroup[] } }) {
  const titleBreak = dict.title.lastIndexOf(' ');
  return (
    <section className="section editorial-section formacao-editorial" id="formacao" data-section="6">
      <div>
        <h2 className="editorial-title editorial-title--display">
          {dict.title.slice(0, titleBreak)}{' '}<em>{dict.title.slice(titleBreak + 1)}</em>
        </h2>
      </div>
      <div className="formacao-editorial__groups">
        {dict.groups.filter(group => group.items.length > 0).map(group => {
          const hasMore = group.id === 'complementary' && group.items.length > summaryLimit;
          return (
            <section className="formacao-editorial__group" key={group.id} aria-labelledby={`formacao-${group.id}`}>
              <h3 id={`formacao-${group.id}`}>{group.title}</h3>
              <StudyList studies={hasMore ? group.items.slice(0, summaryLimit) : group.items} institution={group.institution} />
              {hasMore && (
                <details className="formacao-editorial__more">
                  <summary>{dict.showAll} ({group.items.length})</summary>
                  <StudyList studies={group.items.slice(summaryLimit)} institution={group.institution} />
                </details>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
