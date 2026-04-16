/**
 * Quotes List
 * Perspective: Amy (LBP)
 */

import styles from './QuotesListScreen.module.css';

const imgNavLogo        = 'https://www.figma.com/api/mcp/asset/545cc161-0813-417c-87b2-8106774bd214';
const imgAmyAvatar      = 'https://www.figma.com/api/mcp/asset/45195051-c50e-47c1-a044-9948975abdd0';
const imgAlexAvatar     = 'https://www.figma.com/api/mcp/asset/77aae924-da43-449f-9f00-b91425d692fc';
const imgGenericAvatar  = 'https://www.figma.com/api/mcp/asset/66a1f931-a306-420d-a917-71eb3f261124';

const STATUS_BG: Record<string, string> = {
  'Quote in progress':    'rgba(0,0,0,0.08)',
  'Checkout in progress': '#fde2bc',
};

const rows = [
  { id: 'Q123213', name: 'Alex Rodrigo',   email: 'arodrigo@gmail.com',     status: 'Quote in progress',    date: 'Apr 14, 2026', img: imgAlexAvatar,   navigate: true  },
  { id: 'Q118492', name: 'Sarah Chen',     email: 'schen@techcorp.com',     status: 'Checkout in progress', date: 'Apr 12, 2026', img: imgGenericAvatar },
  { id: 'Q117831', name: 'Marcus Johnson', email: 'mjohnson@starinc.com',   status: 'Quote in progress',    date: 'Apr 11, 2026', img: imgGenericAvatar },
  { id: 'Q116204', name: 'Priya Sharma',   email: 'psharma@nexgen.io',      status: 'Checkout in progress', date: 'Apr 10, 2026', img: imgGenericAvatar },
  { id: 'Q115677', name: 'David Park',     email: 'dpark@globalco.com',     status: 'Quote in progress',    date: 'Apr 9, 2026',  img: imgGenericAvatar },
  { id: 'Q114923', name: 'Emily Torres',   email: 'etorres@innovate.co',    status: 'Quote in progress',    date: 'Apr 8, 2026',  img: imgGenericAvatar },
  { id: 'Q113441', name: 'James Williams', email: 'jwilliams@apex.com',     status: 'Checkout in progress', date: 'Apr 7, 2026',  img: imgGenericAvatar },
  { id: 'Q112089', name: 'Lisa Nguyen',    email: 'lnguyen@brightside.com', status: 'Quote in progress',    date: 'Apr 5, 2026',  img: imgGenericAvatar },
  { id: 'Q110754', name: 'Robert Kim',     email: 'rkim@horizonco.com',     status: 'Checkout in progress', date: 'Apr 3, 2026',  img: imgGenericAvatar },
  { id: 'Q109318', name: 'Amanda Foster',  email: 'afoster@summit.io',      status: 'Quote in progress',    date: 'Apr 1, 2026',  img: imgGenericAvatar },
];

interface Props {
  onNavigate?: (id: string) => void;
  onReturn?: () => void;
  fromStepId?: string;
}

export default function QuotesListScreen({ onNavigate, onReturn, fromStepId }: Props) {
  const alexStatus = fromStepId === 'solution-builder-filled' ? 'Checkout in progress' : 'Quote in progress';
  return (
    <div className={styles.page}>

      {/* Nav bar */}
      <header className={styles.topNav}>
        <div className={styles.navLeft}>
          <img src={imgNavLogo} alt="LinkedIn" className={styles.navLogo} />
          <span className={styles.navTitle}>SOLUTION BUILDER</span>
        </div>
        <div className={styles.navSpacer} />
        <img src={imgAmyAvatar} alt="Amy" className={styles.navAvatar} />
      </header>

      {/* Sub-header */}
      <div className={styles.subHeader}>
        <h1 className={styles.pageTitle}>Quotes</h1>
        <div className={styles.subHeaderActions} />
      </div>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.tableCard}>

          {/* Table header */}
          <div className={styles.tableHeader}>
            {['Quote', 'Customer', 'Status', 'Last updated'].map(col => (
              <div key={col} className={styles.tableHeaderCell}>
                <span>{col}</span>
              </div>
            ))}
          </div>

          {rows.map(row => {
            const status = row.navigate ? alexStatus : row.status;
            return (
            <button
              key={row.id}
              className={`${styles.tableRow}${row.navigate ? ` ${styles.tableRowNavigable}` : ''}`}
              onClick={() => row.navigate && onReturn?.()}
              style={{ cursor: row.navigate ? 'pointer' : 'default' }}
            >
              <div className={styles.tableCell}>
                <span className={styles.quoteLink}>{row.id}</span>
              </div>
              <div className={styles.tableCell}>
                <div className={styles.entityLockup}>
                  <img src={row.img} alt="" className={styles.entityAvatar} />
                  <div className={styles.entityText}>
                    <span className={styles.entityName}>{row.name}</span>
                    <span className={styles.entityMeta}>{row.email}</span>
                  </div>
                </div>
              </div>
              <div className={styles.tableCell}>
                <span
                  className={styles.statusTag}
                  style={{ background: STATUS_BG[status] ?? 'rgba(0,0,0,0.08)' }}
                >
                  {status}
                </span>
              </div>
              <div className={styles.tableCell}>
                <span className={styles.cellText}>{row.date}</span>
              </div>
            </button>
          );})}


          {/* Footer */}
          <div className={styles.tableFooter}>
            <span className={styles.footerCount}>Showing 1–10 of 10</span>
          </div>

        </div>
      </main>

    </div>
  );
}
