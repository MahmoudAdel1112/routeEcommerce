'use client';

import { useSession } from 'next-auth/react';

export default function LoginStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md mt-4">
      {session ? (
        <p>Logged in as <span className="font-bold">{session.user?.name}</span></p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}
