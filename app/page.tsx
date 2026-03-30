import styles from "./page.module.css";
import { loadUniversityRows } from "./university-data";
import UniversityBrowser from "./university-browser";
import SiteHeader from "./site-header";

export default async function Home() {
  const rows = await loadUniversityRows();

  return (
    <div className={styles.page}>
      <SiteHeader activeTab="Trường" />

      <main className={styles.main}>
        <UniversityBrowser rows={rows} />
      </main>
    </div>
  );
}
