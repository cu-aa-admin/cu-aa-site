import Link from 'next/link';
import styles from './contact.module.css';

// Replace with your actual Google Form URL when ready
const JOIN_APPLICATION_FORM_URL = 'https://forms.gle/YOUR_FORM_ID';

export const metadata = {
    title: "Contact Us | CU-AA",
    description: "Get in touch with the Columbia University Africa Alumni team.",
};

export default function ContactPage() {
    return (
        <main>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1>Contact Us</h1>
                    <p className={styles.heroSubtitle}>We&apos;d love to hear from you. Get in touch with the Columbia University Africa Alumni team.</p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.joinCta}>
                        <span className={styles.checkmark} aria-hidden>✓</span>
                        <div className={styles.joinContent}>
                            <h2>Interested in Joining?</h2>
                            <p>Apply to become a member of CU-AA.</p>
                            <a
                                href={JOIN_APPLICATION_FORM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.joinBtn}
                            >
                                Apply Now →
                            </a>
                        </div>
                    </div>

                    <div className={styles.contentBlock}>
                        <h2>Get in Touch</h2>
                        <div className={styles.methods}>
                            <div className={styles.method}>
                                <span className={styles.icon}>📧</span>
                                <div>
                                    <h3>Email</h3>
                                    <a href="mailto:info@cu-aa.org">info@cu-aa.org</a>
                                    <small>General inquiries and information</small>
                                </div>
                            </div>
                            <div className={styles.method}>
                                <span className={styles.icon}>✍️</span>
                                <div>
                                    <h3>Blog Submissions</h3>
                                    <a href="mailto:blog@cu-aa.org">blog@cu-aa.org</a>
                                    <small>Submit articles or pitch story ideas</small>
                                </div>
                            </div>
                            <div className={styles.method}>
                                <span className={styles.icon}>🤝</span>
                                <div>
                                    <h3>Partnerships</h3>
                                    <a href="mailto:partnerships@cu-aa.org">partnerships@cu-aa.org</a>
                                    <small>Collaboration and partnership opportunities</small>
                                </div>
                            </div>
                            <div className={styles.method}>
                                <span className={styles.icon}>🎯</span>
                                <div>
                                    <h3>Mentorship</h3>
                                    <a href="mailto:mentorship@cu-aa.org">mentorship@cu-aa.org</a>
                                    <small>Mentorship program inquiries</small>
                                </div>
                            </div>
                            <div className={styles.method}>
                                <span className={styles.icon}>💼</span>
                                <div>
                                    <h3>Opportunities</h3>
                                    <a href="mailto:opportunities@cu-aa.org">opportunities@cu-aa.org</a>
                                    <small>Job postings and collaboration requests</small>
                                </div>
                            </div>
                            <div className={styles.method}>
                                <span className={styles.icon}>🎮</span>
                                <div>
                                    <h3>Discord Community</h3>
                                    <a href="https://discord.gg/buzRNDjggr" target="_blank" rel="noopener noreferrer">Join our Discord</a>
                                    <small>Real-time chat with fellow alumni</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentBlock}>
                        <h2>How do I become a member?</h2>
                        <p>
                            Membership is open to all Columbia University alumni with connections to Africa.{' '}
                            <Link href="/about">Learn more about membership</Link> or{' '}
                            <a href="mailto:info@cu-aa.org">contact us directly</a>.
                        </p>
                        <div className={styles.cta}>
                            <a
                                href={JOIN_APPLICATION_FORM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.primaryBtn}
                            >
                                ✓ Interested in Joining? Apply here
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
