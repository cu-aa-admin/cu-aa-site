'use client'

export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
        }}>
            <div style={{ textAlign: 'center', maxWidth: '480px' }}>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                    Something went wrong
                </h1>
                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                    An unexpected error occurred. Please try again.
                </p>
                <button
                    onClick={reset}
                    style={{
                        padding: '0.625rem 1.5rem',
                        backgroundColor: 'var(--columbia-blue)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                    }}
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
