import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './sidebarNav';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
};

const serviceHistoryData = [
  // Each object represents a service date and its details
  {
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },
  {
    id: '1',
    date: 'Thursday, July 2, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },{
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },{
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },{
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },{
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },{
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },{
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },{
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },{
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },{
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },{
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },{
    id: '1',
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
   
  },
  
  
];



const sidebarNavItems = [
  {
    title: 'Account',
    href: '/client',
  },
  {
    title: 'Notifications',
    href: '/client/notifications',
  },
  {
    title: 'Billing',
    href: '/client/billing',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
     
      <div className='space-y-6 p-10 pb-16 block '>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
          <p className='text-muted-foreground'>
            Manage your account settings and view service history.
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            <SidebarNav serviceHistoryData={serviceHistoryData} items={sidebarNavItems} />
          </aside>
          <div className='flex-1 lg:max-w-3xl'>{children}</div>
        </div>
      </div>
    </>
  );
}
