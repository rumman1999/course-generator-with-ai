'use client';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    signOut(auth).then(() => {
      router.push('/auth/sign-in');
    });
  }, [router]);

  return <p>Signing out...</p>;
}
