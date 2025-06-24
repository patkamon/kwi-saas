'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { signout } from '@/lib/auth-actions';

export default function LoginButton() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const setup = async () => {
      const supabase = await createClient();

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        console.log('Auth state changed:', _event, session);
        // storing user.id in session storage
        if (session?.user) {
          sessionStorage.setItem('user_id', session.user.id);
        } else {
          sessionStorage.removeItem('user_id');
        }
        // Optionally reload the page:
        router.refresh(); // <-- if you want to reload current route data
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    setup();
  }, []);

  return user ? (
    <button
      className="text-sm text-red-600 hover:underline"
      onClick={async () => {
        sessionStorage.removeItem("user_id");
        signout();
        setUser(null);
      }}
    >
      ออกจากระบบ
    </button>
  ) : (
    <button
      className="text-sm text-blue-700 hover:underline"
      onClick={() => router.push('/auth/login')}
    >
      เข้าสู่ระบบ
    </button>
  );
}