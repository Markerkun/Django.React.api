import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  username: string;
  email?: string;
  avatarUrl?: string;
};

export default function UserPage(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to fetch from a typical API endpoint; fallback to mock data if it fails.
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setUser(data);
      } catch (e) {
        // Fallback mock user so the page still shows something during development
        console.warn('Could not fetch /api/user, using mock user:', e);
        setUser({ id: 1, username: 'demo_user', email: 'demo@example.com' });
        setError('Could not load remote user; showing demo data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div style={styles.container}>Завантаження...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt="avatar" style={styles.avatar} />
        ) : (
          <div style={styles.avatarPlaceholder}>{user?.username?.charAt(0).toUpperCase()}</div>
        )}

        <div style={styles.info}>
          <h2 style={styles.username}>{user?.username}</h2>
          {user?.email && <p style={styles.email}>{user.email}</p>}
          {error && <p style={styles.error}>{error}</p>}
        </div>
      </div>

      <div style={styles.actions}>
        <button style={styles.button} onClick={() => alert('Edit profile (not implemented)')}>
          Редагувати
        </button>
        <button style={{ ...styles.button, background: '#eee', color: '#333' }} onClick={() => alert('Log out (not implemented)')}>
          Вийти
        </button>
      </div>
    </div>
  );
}

const styles: { [k: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '32px',
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    color: '#222',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
    background: '#fff',
    minWidth: '320px',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: '50%',
    background: '#0070f3',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32,
    fontWeight: 600,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  username: {
    margin: 0,
    fontSize: 20,
  },
  email: {
    margin: '6px 0 0 0',
    color: '#666',
    fontSize: 14,
  },
  error: {
    marginTop: 8,
    color: '#b00020',
    fontSize: 13,
  },
  actions: {
    marginTop: 20,
    display: 'flex',
    gap: 12,
  },
  button: {
    padding: '8px 14px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    background: '#0066ff',
    color: '#fff',
  },
};
