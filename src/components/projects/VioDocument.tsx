import styles from './VioDigital.module.css';

/** Deterministic native artwork (manifest: docs/.../c03-viodigital-art-manifest.json). The QR-like mark is decorative only. */
export default function VioDocument({ example, shared = true }: { example: string; shared?: boolean }) {
  return <div className={styles.art} aria-hidden="true">
    <div className={styles.plinth} />
    <div className={styles.backplate} />
    <div className={styles.document} data-vio-document data-vio-art="document-example-qr-v1" style={shared ? undefined : { viewTransitionName: 'none' }}>
      <div className={styles.paper}>
        <span className={styles.brandMarks}><i /><i /></span>
        <strong>{example}</strong>
        <div className={styles.documentBody}>
          <div className={styles.lines}><i /><i /><i /><i /></div>
          <svg viewBox="0 0 100 100" className={styles.qr}>
            {[0, 1, 2].map(i => <g key={i} transform={`translate(${i === 1 ? 66 : 0} ${i === 2 ? 66 : 0})`}><path d="M0 0h30v30H0zM5 5v20h20V5z" fillRule="evenodd" /><path d="M10 10h10v10H10z" /></g>)}
            {Array.from({ length: 13 }, (_, y) => Array.from({ length: 13 }, (_, x) => {
              if ((x < 5 && (y < 5 || y > 8)) || (x > 8 && y < 5)) return null;
              return (x * 7 + y * 11 + x * y) % 5 < 3 ? <rect key={`${x}-${y}`} x={x * 7.4} y={y * 7.4} width="6" height="6" /> : null;
            }))}
          </svg>
        </div>
        <span className={styles.ruleGreen} /><span className={styles.ruleRed} />
      </div>
      <span className={styles.scan} />
    </div>
    <div className={styles.tiles}>{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</div>
    <div className={styles.dataStrips}>{[0, 1, 2].map(i => <div key={i}><b /><span><i /><i /></span></div>)}</div>
  </div>;
}
