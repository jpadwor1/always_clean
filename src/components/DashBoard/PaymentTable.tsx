'use client';

import { trpc } from '@/app/_trpc/client';
import { Loader2 } from 'lucide-react';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Separator } from '../ui/separator';
import { Stripe } from 'stripe';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PaymentTable = () => {
  const { data: invoices, isLoading, error } = trpc.getInvoices.useQuery();
  invoices?.sort((a: any, b: any) => a.due_date - b.due_date);

  const paidInvoices = invoices?.filter((invoice: any) => invoice.paid);
  const dueInvoices = invoices?.filter((invoice: any) => !invoice.paid);
  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-[600px]'>
        <Loader2 className='h-8 w-8 animate-spin text-blue-600 mb-3' />

        <h2 className='text-zinc-700 mb-3 lg:text-md text-md'>
          This will only take a moment. 😊
        </h2>

        <p className='text-zinc-600 mb-3 lg:text-sm text-md'>
          {' '}
          We&apos;re currently organizing our digital shelves and updating the
          customer database.
        </p>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <h2 className='text-black font-medium mb-3 lg:text-2xl text-md text-center'>
        Invoice History
      </h2>

      <Separator />

      <Tabs defaultValue="due" className="w-full mt-2">
        <TabsList className='bg-gray-200'>
          <TabsTrigger value="due">Outstanding</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>
        <TabsContent value="due">
          <Table>
            <TableCaption>Current Invoice History</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Date Sent</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dueInvoices.map((invoice: Stripe.Invoice) => (
                <TableRow key={invoice?.id}>
                  <TableCell>{invoice?.customer_name}</TableCell>
                  <TableCell>
                    {format(new Date(invoice?.created * 1000), 'MM/dd/yyyy')}
                  </TableCell>
                  <TableCell>${(invoice?.amount_due / 100).toFixed(2)}</TableCell>

                  <TableCell className='text-center'>
                    {invoice?.paid ? (
                      <span className='text-green-500'>Paid</span>
                    ) : (
                      <span className='text-red-500'>Due</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(
                        invoice?.due_date
                          ? invoice.due_date * 1000
                          : invoice?.created * 1000
                      ),
                      'MM/dd/yyyy'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="paid">
          <Table>
            <TableCaption>Current Invoice History</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Date Sent</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paidInvoices.map((invoice: Stripe.Invoice) => (
                <TableRow key={invoice?.id}>
                  <TableCell>{invoice?.customer_name}</TableCell>
                  <TableCell>
                    {format(new Date(invoice?.created * 1000), 'MM/dd/yyyy')}
                  </TableCell>
                  <TableCell>${(invoice?.amount_due / 100).toFixed(2)}</TableCell>

                  <TableCell className='text-center'>
                    {invoice?.paid ? (
                      <span className='text-green-500'>Paid</span>
                    ) : (
                      <span className='text-red-500'>Due</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(
                        invoice?.due_date
                          ? invoice.due_date * 1000
                          : invoice?.created * 1000
                      ),
                      'MM/dd/yyyy'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

    </MaxWidthWrapper>
  );
};

export default PaymentTable;
