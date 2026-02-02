import { login, signup } from '../auth/actions'
import styles from './login.module.css'

export default async function LoginPage(props: {
    searchParams: Promise<{ message?: string; error?: string }>
}) {
    const searchParams = await props.searchParams
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to access the directory</p>

                {searchParams?.message && (
                    <div className={styles.message}>{searchParams.message}</div>
                )}
                {searchParams?.error && (
                    <div className={styles.error}>{searchParams.error}</div>
                )}

                <form className={styles.form}>
                    <div className={styles.group}>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" required />
                    </div>

                    <div className={styles.group}>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" required />
                    </div>

                    <div className={styles.actions}>
                        <button formAction={login} className={styles.primaryBtn}>Log in</button>
                        <button formAction={signup} className={styles.secondaryBtn}>Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
