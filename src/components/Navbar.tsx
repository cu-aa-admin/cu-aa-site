import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { signOut } from '@/app/auth/actions';
import styles from './navbar.module.css';

export default async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    {/* You can replace this text with your logo image later */}
                    <span className={styles.logoText}>CU-AA</span>
                </Link>

                <div className={styles.links}>
                    <Link href="/about" className={styles.link}>About</Link>
                    <Link href="/streams" className={styles.link}>Streams</Link>

                    <div className={styles.divider}></div>

                    {user ? (
                        <>
                            <Link href="/profile" className={styles.link}>Profile</Link>
                            <Link href="/members/directory" className={styles.link}>Directory</Link>
                            <form action={signOut}>
                                <button className={styles.logoutBtn}>Sign Out</button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className={styles.loginBtn}>Log In</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
