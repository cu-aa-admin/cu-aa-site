import Link from 'next/link';
import styles from './about.module.css';

export const metadata = {
    title: "About Us | CU-AA",
    description: "Our mission to connect alumni across Africa for meaningful dialogue and collaborative solutions.",
};

export default function AboutPage() {
    return (
        <main>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1>About Columbia University Africa Alumni</h1>
                    <p className={styles.heroSubtitle}>United by education, driven by Africa&apos;s potential</p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.contentBlock}>
                        <h2>Our Story</h2>
                        <p>
                            The purpose of the alumni group is to bring together alumni from Africa to share experiences, knowledge, and collaborative opportunities.
                        </p>
                        <p>
                            Columbia University Africa Alumni (CU-AA) was formed in 2023 by a group of passionate Columbia graduates
                            who recognized the need for a platform where African alumni could come together to discuss the pressing
                            issues facing our continent. What started as informal conversations among friends has grown into a
                            vibrant community of over 90 alumni from 12 African countries.
                        </p>
                        <p>
                            We believe that Columbia&apos;s diverse African alumni network represents an untapped resource for addressing
                            Africa&apos;s challenges. By bringing together professionals from various fields - technology, healthcare,
                            finance, policy, and education - we create a unique space for interdisciplinary dialogue and solution-building.
                        </p>
                    </div>

                    <div className={styles.contentBlock}>
                        <h2>Our Mission</h2>
                        <div className={styles.grid}>
                            <div className={styles.card}>
                                <h3>🌍 Foster Dialogue</h3>
                                <p>Create spaces for alumni to discuss critical issues affecting African countries, from economic
                                    development to climate change.</p>
                            </div>

                            <div className={styles.card}>
                                <h3>💡 Generate Solutions</h3>
                                <p>Move beyond discussion to action by developing practical, implementable solutions that leverage
                                    our collective expertise.</p>
                            </div>

                            <div className={styles.card}>
                                <h3>🤝 Build Connections</h3>
                                <p>Strengthen ties between Columbia alumni across Africa and with the broader African diaspora,
                                    creating opportunities for collaboration.</p>
                            </div>

                            <div className={styles.card}>
                                <h3>🚀 Empower Leaders</h3>
                                <p>Through mentorship and knowledge sharing, prepare the next generation of African leaders to
                                    tackle tomorrow&apos;s challenges.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentBlock}>
                        <h2>What We Do</h2>
                        <p>
                            Our activities center around creating platforms for engagement and action:
                        </p>
                        <ul className={styles.activityList}>
                            <li><strong>Group Chat:</strong> A space for alumni to share perspectives on African issues, propose solutions, and engage in constructive debate</li>
                            <li><strong>Mentorship Program:</strong> Connecting experienced alumni with emerging leaders to foster professional and personal growth</li>
                            <li><strong>Learning and Discussion:</strong> Regular virtual and in-person gatherings to discuss specific topics affecting African countries</li>
                            <li><strong>Resource Sharing:</strong> Creating a repository of knowledge, contacts, and opportunities for our community</li>
                            <li><strong>Social Media:</strong> Create articles relevant to Africa</li>
                        </ul>
                    </div>

                    <div className={styles.contentBlock}>
                        <h2>Our Values</h2>
                        <div className={styles.grid}>
                            <div className={styles.valueCard}>
                                <h3>Collaboration</h3>
                                <p>We believe in the power of collective intelligence.</p>
                            </div>
                            <div className={styles.valueCard}>
                                <h3>Innovation</h3>
                                <p>We embrace creative solutions to age-old challenges.</p>
                            </div>
                            <div className={styles.valueCard}>
                                <h3>Impact</h3>
                                <p>We focus on creating tangible, measurable change.</p>
                            </div>
                            <div className={styles.valueCard}>
                                <h3>Integrity</h3>
                                <p>We maintain the highest ethical standards.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentBlock}>
                        <h2>Join Our Community</h2>
                        <p>
                            Whether you&apos;re a Columbia survivor working in Africa or part of the diaspora, we welcome you.
                        </p>
                        <div className={styles.cta}>
                            <Link href="/login" className={styles.primaryBtn}>Get Involved</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
