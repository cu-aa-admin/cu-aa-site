import { SignIn } from '@clerk/nextjs';
import styles from './sign-in.module.css';

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: {
              backgroundColor: 'var(--columbia-blue)',
              '&:hover': {
                backgroundColor: 'var(--columbia-light-blue)',
              },
            },
            card: {
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
          },
        }}
      />
    </div>
  );
}
