'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'

export default function SuccessPage() {
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🎉 Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <p>
        Redirecting you to the home page in a few seconds...
      </p>
    </div>
  );
}