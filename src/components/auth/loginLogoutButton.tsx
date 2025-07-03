'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { signout } from '@/lib/auth-actions';
import { User } from '@supabase/supabase-js';

export default function LoginButton() {
  const [user, setUser] = useState<User | null>(null);
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