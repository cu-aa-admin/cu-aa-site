import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
    title: "Columbia University Africa Alumni | CU-AA",
    description: "Connect with 90+ Columbia alumni building Africa's future. Join discussions, explore the directory, and engage in mentorship and community.",
};

export default function Home() {
    return (
        <div className={styles.page}>
            <main>
                <section className={styles.hero}>
                    <div className={styles.africaBg} aria-hidden="true" />
                    <div className={styles.container}>
                        <div className={styles.heroContent}>
                            <h1>Columbia University Africa Alumni</h1>
                            <p className={styles.heroSubtitle}>
                                Empowering African leaders through mentorship and community.
                                <br />
                                Join 90+ Columbia alumni building Africa&apos;s future.
                            </p>
                            <div className={styles.heroButtons}>
                                <Link href="/members/directory" className={styles.btnPrimary}>
                                    Join the Community
                                </Link>
                                <Link href="/about" className={styles.btnSecondary}>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Get Involved</h2>
                        <p className={styles.sectionIntro}>
                            Explore streams, meet alumni, and dive into our story.
                        </p>
                        <div className={styles.grid}>
                            <Link href="/streams" className={styles.card}>
                                <span className={styles.cardIcon}>💬</span>
                                <h3>Discussion Streams</h3>
                                <p>Join topic-based conversations on economics, technology, and community.</p>
                                <span className={styles.cardCta}>Explore streams →</span>
                            </Link>
                            <Link href="/members/directory" className={styles.card}>
                                <span className={styles.cardIcon}>👥</span>
                                <h3>Alumni Directory</h3>
                                <p>Find and connect with fellow Columbia alumni across Africa and the diaspora.</p>
                                <span className={styles.cardCta}>View directory →</span>
                            </Link>
                            <Link href="/about" className={styles.card}>
                                <span className={styles.cardIcon}>📖</span>
                                <h3>About CU-AA</h3>
                                <p>Our mission, story, and how we&apos;re driving impact together.</p>
                                <span className={styles.cardCta}>Read our story →</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
