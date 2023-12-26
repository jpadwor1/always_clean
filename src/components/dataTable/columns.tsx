'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { Customer } from './data/CustomerSchema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { format, parseISO} from 'date-fns';
export const columns: ColumnDef<Customer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'customerType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px] truncate'>
        {row.getValue('customerType') === 'VIP' ? (
          <Badge className='bg-purple-500'>Lead</Badge>
        ) : row.getValue('customerType') === 'INACTIVE' ? (
          <Badge className='bg-yellow-500'>Inactive</Badge>
        ) : row.getValue('customerType') === 'ACTIVE' ? (
          <Badge className='bg-green-600'>Active</Badge>
        ) : row.getValue('customerType') === 'LEAD' ? (
          <Badge className='bg-cyan-600'>Lead</Badge>
        ) : row.getValue('customerType') === 'LOST' ? (
          <Badge variant='destructive'>Lost</Badge>
        ) : null}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Customer Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'lastServiceDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Service Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('lastServiceDate') as string
      const formattedDate = format(parseISO(date), 'MMM-do')
      return (
        <div className='flex min-w-content items-center'>
          <span>{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'nextServiceDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Next Service Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('nextServiceDate') as string
      const formattedDate = format(parseISO(date), 'MMM-do')
      return (
        <div className='flex min-w-content items-center'>
          <span>{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Address' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex min-w-content items-center'>
          <span>{row.getValue('address')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='email' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <Link
            className='flex items-center'
            href={`mailto:${row.getValue('email')}`}
          >
            <Mail className='h-4 w-4 mr-1' />
            <span className='ml-1'>{row.getValue('email')}</span>
          </Link>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='phone' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <Phone className='h-4 w-4 mr-1' />
          <span>{row.getValue('phone')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
