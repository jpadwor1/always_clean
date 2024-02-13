'use client';

import { getCustomerInvoices, getUserSubscriptionPlan } from '@/lib/stripe';
import { useToast } from './ui/use-toast';
import { trpc } from '@/app/_trpc/client';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button, buttonVariants } from './ui/button';
import { Loader2, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface BillingFormProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
  userId: boolean;
  invoices: Awaited<ReturnType<typeof getCustomerInvoices>>;
}

const BillingForm = ({
  invoices,
  subscriptionPlan,
  userId,
}: BillingFormProps) => {
  const { toast } = useToast();

  const { mutate: createStripeSession, isLoading } =
    trpc.createStripeSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) window.location.href = url;
        if (!url) {
          toast({
            title: 'There was a problem...',
            description: 'Please try again in a moment',
            variant: 'destructive',
          });
        }
      },
    });

  function formatCurrency(amountInCents: number, currencyCode = 'USD') {
    const amount = amountInCents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  }

  const invoiceTotal = () => {
    let invoiceTotals = 0;

    invoices.forEach(
      (invoice: Awaited<ReturnType<typeof getCustomerInvoices>>) => {
        // Assuming 'paid' status means the invoice is not to be counted
        if (invoice.status !== 'paid') {
          // Assuming invoice.total is in the smallest currency unit (e.g., cents)
          invoiceTotals += parseInt(invoice.total, 10); // Use parseInt for whole numbers
        }
      }
    );
    return formatCurrency(invoiceTotals, 'USD');
  };

  return (
    // <form
    //   className='mt-12'
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     createStripeSession();
    //   }}
    // >
    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Subscription Plan</CardTitle>
    //       <CardDescription>
    //         You are currently on the{' '}
    //         <strong>
    //           {subscriptionPlan.name ? subscriptionPlan.name : 'Free'}
    //         </strong>{' '}
    //         plan
    //       </CardDescription>
    //     </CardHeader>
    //     <CardFooter className='flex flex-col items-center space-y-2 md:flex-row md:justify-between md:space-x-0'>
    //       <div className='flex flex-col place-items-center md:flex-row space-x-2'>
    //         <Button type='submit'>
    //           {isLoading ? (
    //             <Loader2 className='animate-spin mr-4 h-4 w-4' />
    //           ) : null}
    //           {subscriptionPlan.isSubscribed
    //             ? 'Manage Subscription'
    //             : 'Upgrade to PRO'}
    //           <ArrowRight className='h-5 w-5 ml-1.5' />
    //         </Button>
    //         {!subscriptionPlan.isSubscribed ? (
    //           <>
    //             <p className='text-slate-600 font-medium'>or</p>
    //             <Button
    //               className=' bg-teal-600'
    //             >
    //               Start Free Trial
    //               </Button>
    //           </>
    //         ) : null}
    //       </div>
    //       {subscriptionPlan.isSubscribed ? (
    //         <p className='rounded-full text-xs font-medium'>
    //           {subscriptionPlan.isCanceled
    //             ? 'Your plan will expire on '
    //             : 'Your plan will renew on '}
    //           {format(
    //             subscriptionPlan.stripeCurrentPeriodEnd!,
    //             'MMM do,yyyy'
    //           )}
    //         </p>
    //       ) : null}
    //     </CardFooter>
    //   </Card>
    // </form>
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>
          {!invoices || invoices.length === 0 ? 'You have no billing history to display' : 'Your invoices'}
        </CardDescription>
        {invoices && invoices.length > 0 && (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className=''>Invoice Sent</TableHead>
              <TableHead className=''>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount Due</TableHead>
              <TableHead className='text-right'>Pay Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map(
              (invoice: Awaited<ReturnType<typeof getCustomerInvoices>>) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    {format(new Date(invoice.created * 1000), 'MM/dd/yyyy')}
                  </TableCell>
                  <TableCell
                    className={cn(
                      new Date(invoice.due_date * 1000) < new Date()
                        ? 'text-red-600'
                        : 'text-gray-900',
                      'font-medium'
                    )}
                  >
                    {format(new Date(invoice.due_date * 1000), 'MM/dd/yyyy')}
                  </TableCell>

                  <TableCell
                    className={cn(
                      new Date(invoice.due_date * 1000) < new Date()
                        ? 'text-red-600'
                        : 'text-gray-900',
                      'font-medium'
                    )}
                  >
                    {new Date(invoice.due_date * 1000) < new Date() &&
                    !invoice.paid
                      ? 'PAST DUE'
                      : invoice.paid
                      ? 'PAID'
                      : 'Payment Due'}
                  </TableCell>

                  <TableCell>{formatCurrency(invoice.total, 'USD')}</TableCell>

                  <TableCell className='text-right'>
                    <Link
                      href={invoice.paid ? '#' : invoice.hosted_invoice_url}
                      className={cn(
                        buttonVariants({}),
                        invoice.paid ? 'bg-green-700' : 'bg-blue-600'
                      )}
                    >
                      {invoice.paid ? 'Paid' : 'Make Payment'}
                    </Link>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className=''>{invoiceTotal()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        )}
      </CardHeader>
      {!invoices || invoices.length === 0 ? (
        <CardFooter>
          <div className="flex flex-col space-y-2">
        <p>
        If this is a mistake, please contact support at 760-912-7396 or send us a message.</p>
        <Link href='/contact' className={cn(buttonVariants({}))}>Contact Us</Link>
        </div>
        </CardFooter>
      ): null}
      
    </Card>
  );
};

export default BillingForm;
