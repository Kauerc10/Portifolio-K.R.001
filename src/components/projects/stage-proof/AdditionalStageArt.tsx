'use client';
import type { Locale } from '@/i18n/config';
import { Check, FileText } from 'lucide-react';
import VioDocument from '../VioDocument';
import AtlasComposition from '../AtlasComposition';
import CkfComposition from '../CkfComposition';
import styles from './StageProof.module.css';
import type { StageProjectSlug } from './stage-projects';
export default function AdditionalStageArt({project,locale}:{project:StageProjectSlug;locale:Locale}){
 const en=locale==='en-US';
 return <div className={styles.additional} data-layer="1.25" data-extra-art={project}>
 {project==='viodigital'?<><VioDocument example={en?'EXAMPLE':'EXEMPLO'} shared={false}/><span className={styles.vioScan} data-vio-scan/><div className={`${styles.receipt} ${styles.vioReceipt}`} data-extra-receipt><Check size={18}/>{en?'Information organized':'Informações organizadas'}</div></>:project==='atlas-notarial'?<><AtlasComposition locale={locale} progress={1} label=""/><div className={`${styles.receipt} ${styles.atlasReceipt}`} data-extra-receipt><Check size={18}/>{en?'Ready for the power of attorney':'Pronto para a procuração'}</div></>:<><CkfComposition locale={locale} progress={1} label=""/><div className={styles.quotePdf} data-quote-pdf><FileText size={30}/><strong>PDF</strong><i/><i/><i/><small>{en?'Sample quote':'Orçamento de exemplo'}</small></div></>}
 </div>;
}
