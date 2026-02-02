import Link from 'next/link';
import styles from './streams.module.css';

export const metadata = {
    title: "Streams | CU-AA",
    description: "Join our dedicated discussion streams.",
};

const STREAMS = [
    {
        id: 'economics',
        title: 'Economics',
        description: 'Discuss market trends, policy analysis, and economic research.',
        icon: '📊',
        color: '#002E6D'
    },
    {
        id: 'technology',
        title: 'Technology',
        description: 'Explore tech innovation, digital transformation, and startups.',
        icon: '💻',
        color: '#002E6D'
    },
    {
        id: 'community',
        title: 'Community',
        description: 'General discussions, announcements, and community building.',
        icon: '🌍',
        color: '#002E6D'
    }
];

export default function StreamsPage() {
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1>Discussion Streams</h1>
                    <p>Join focused conversations on the topics that matter most.</p>
                </div>
            </section>

            <section className={styles.container}>
                <div className={styles.grid}>
                    {STREAMS.map(stream => (
                        <div key={stream.id} className={styles.card}>
                            <div className={styles.icon}>{stream.icon}</div>
                            <h2>{stream.title}</h2>
                            <p>{stream.description}</p>
                            <div className={styles.actions}>
                                <a
                                    href="https://discord.gg/buzRNDjggr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.discordBtn}
                                >
                                    Join Discord Channel
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
