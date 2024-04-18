import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/components/ui/overview';
import { RecentSales } from '@/components/ui/recent-sales';
import Table from '@/components/dataTable/Table';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import UtilityPage from '../UtilityPage';
import MyCalendar from '../Calendar/BigCalendar';
import { Button } from '../ui/button';
import Link from 'next/link';

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;

  return (
    <>
      <div className='flex-col md:flex'>
        <div className='flex-1 sm:space-y-4 space-y-0 sm:pt-6 pt-2 '>
          <div className='sm:flex hidden sm:flex-row items-center justify-between space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight sm:p-4'>
              Dashboard
            </h2>
          </div>
          <Tabs defaultValue='customers' className='space-y-4'>
            <TabsList className='sm:p-4'>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='customers'>Customers</TabsTrigger>
              <TabsTrigger value='schedule'>Schedule</TabsTrigger>
              <TabsTrigger value='utilities'>Utilities</TabsTrigger>
            </TabsList>
            <TabsContent value='overview' className='space-y-4 p-4'>
              <Button>
                <Link href='/routebuilder'>Route Optimizer</Link>
              </Button>
              
            </TabsContent>

            <TabsContent value='customers' className='space-y-4 p-2'>
              <Table userId={userId} />
            </TabsContent>

            <TabsContent value='schedule' className='space-y-4'>
              <MyCalendar />
            </TabsContent>
            <TabsContent value='utilities' className='space-y-4'>
              <UtilityPage />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
