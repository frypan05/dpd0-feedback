import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
