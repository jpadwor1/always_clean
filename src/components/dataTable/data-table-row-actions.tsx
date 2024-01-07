'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { labels } from './data/data';
import { customerSchema } from './data/CustomerSchema';
import Link from 'next/link';
import { trpc } from '@/app/_trpc/client';
import {toast, useToast} from '@/components/ui/use-toast';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}




export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const {mutate: deleteUser} = trpc.deleteCustomer.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Customer has been deleted',
      })
      
    },
    onError: (error) => {
      toast({
        title: 'Oops, something went wrong!',
        description: 'Try again later' + error.message,
      })
    }
  })
const customerId = (row.original as any).id;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem>
        <Link href={`/dashboard/customer/${customerId}`}>
          Edit
          </Link>
          </DropdownMenuItem>
        <DropdownMenuItem><Link href={`/dashboard/customer/${customerId}/billing`}>
          Billing
          </Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value='hi'>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteUser({id: customerId})}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
