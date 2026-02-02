import { SignUp } from '@clerk/nextjs';
import styles from './sign-up.module.css';

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <SignUp
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
