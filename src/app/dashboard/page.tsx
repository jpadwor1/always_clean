import React from 'react';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';

import Dashboard from '@/components/DashBoard/Dashboard';

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) redirect('/auth-callback?origin=dashboard');

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (dbUser?.role !== 'ADMIN') {
    redirect('/auth-callback?origin=client');
  }


  return <Dashboard />;

};

export default Page;
