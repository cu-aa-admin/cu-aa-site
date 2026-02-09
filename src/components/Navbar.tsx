import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import styles from './navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>CU-AA</span>
                </Link>

                <div className={styles.links}>
                    <Link href="/about" className={styles.link}>About</Link>
                    <Link href="/contact" className={styles.link}>Contact</Link>
                    <Link href="/streams" className={styles.link}>Streams</Link>

                    <div className={styles.divider}></div>

                    <SignedIn>
                        <Link href="/profile" className={styles.link}>Profile</Link>
                        <Link href="/members/directory" className={styles.link}>Directory</Link>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>

                    <SignedOut>
                        <Link href="/sign-in" className={styles.loginBtn}>Log In</Link>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
}
