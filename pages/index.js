import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page immediately when the app is loaded
    router.push('/login');
  }, [router]);

  return null; // Since we are redirecting, no content is needed here
}
