import Link from 'next/link';
import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h3>Columbia University Africa Alumni</h3>
                        <p>Empowering African leaders through mentorship and community.</p>
                    </div>

                    <div className={styles.column}>
                        <h4>Community</h4>
                        <Link href="/about">About Us</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/streams">Streams</Link>
                        <Link href="/events">Events</Link>
                    </div>

                    <div className={styles.column}>
                        <h4>Connect</h4>
                        <a href="https://discord.gg/buzRNDjggr" target="_blank" rel="noopener noreferrer">Discord Server</a>
                        <a href="https://linkedin.com/company/cu-africa-alumni" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="mailto:info@cu-aa.org">Contact Us</a>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} CU-AA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
