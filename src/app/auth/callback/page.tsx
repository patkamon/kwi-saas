'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'

export default function CallbackPage() {
  const supabase = createClient()
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/'); // ✅ redirect to home
      } else {
        router.push('/login');
      }
    };

    checkSession();
  }, []);

  return <p>Redirecting...</p>;
}
