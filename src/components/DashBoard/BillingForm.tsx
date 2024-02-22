'use client';

import { getCustomerInvoices, getUserSubscriptionPlan } from '@/lib/stripe';
import { useToast } from '../ui/use-toast';
import { trpc } from '@/app/_trpc/client';
import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button, buttonVariants } from '../ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Customer } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { STRIPE_PLANS } from '@/lib/PLANS';
import { useRouter } from 'next/navigation';

interface BillingFormProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
  userId: boolean;
  invoices: Awaited<ReturnType<typeof getCustomerInvoices>>;
  customer: Customer;
  role: string;
}

const FormSchema = z.object({
  discount: z.string().optional(),
});

const AgreementSchema = z.object({
  agreementCode: z.string(),
});

const BillingForm = ({
  invoices,
  subscriptionPlan,
  userId,
  customer,
  role,
}: BillingFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  };
  const agreementForm = useForm<z.infer<typeof AgreementSchema>>({
    resolver: zodResolver(AgreementSchema),
  });

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
  const updateCustomerDiscount = trpc.updateCustomerDiscount.useMutation();
  const updateServiceAgreementCode =
    trpc.updateCustomerServiceAgreementCode.useMutation();
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = {
      customerId: customer.id,
      discount: data.discount,
    };
    updateCustomerDiscount.mutate(formData, {
      onSuccess: () => {
        toast({
          title: 'Discount Applied',
          description: 'The discount has been applied to the customer account.',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      },
    });
  }

  function updateServiceAgreement(formData: z.infer<typeof AgreementSchema>) {
    const newFormData = {
      customerId: customer.id,
      agreementCode: formData.agreementCode,
    };
    updateServiceAgreementCode.mutate(newFormData, {
      onSuccess: () => {
        toast({
          title: 'Agreement Applied',
          description:
            'The agreement has been applied to the customer account.',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      },
    });
  }
  const createInvoice = trpc.getCreateInvoice.useMutation();

  const agreementPlans = STRIPE_PLANS.map((plan) => {
    return {
      name: plan.name,
      price: plan.price,
    };
  });
  const handleInvoice = () => {
    const invoiceData = {
      customerId: customer.id,
    };

    createInvoice.mutate(invoiceData, {
      onSuccess: () => {
        toast({
          title: 'Invoice Sent',
          description: (
            <>
              <p>Invoice Sent</p>
            </>
          ),
        });
        handleRefresh();
      },
      onError: (error: any) => {
        toast({
          title: 'Oops Something went wrong',
          description: (
            <>
              <p>try again later</p>
              <p>{error.message}</p>
            </>
          ),
        });
        handleRefresh();
      },
    });
  };
  return (
    <Card className=''>
      {role === 'ADMIN' ? (
        <>
          <div className='p-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-2/3 space-y-6 flex items-center space-x-4'
              >
                <FormField
                  control={form.control}
                  name='discount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg'>
                        Customer Discount
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={customer.discount}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a discount to apply to this customer' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Winter Special'>
                            Winter Special (125/mo)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select a discount to apply to this customer&apos;s
                        account. This will affect all future invoices.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit'>Submit</Button>
              </form>
            </Form>
          </div>
          <div className='p-4'>
            <Form {...agreementForm}>
              <form
                onSubmit={agreementForm.handleSubmit(updateServiceAgreement)}
                className='w-2/3 space-y-6 flex items-center space-x-4'
              >
                <FormField
                  control={agreementForm.control}
                  name='agreementCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg'>
                        Customer Agreement
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={customer.agreementCode}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select an agreement type to apply to this customer' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {agreementPlans.map((plan) => (
                            <SelectItem key={plan.name} value={plan.name}>
                              {plan.name} ({plan.price}/mo)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select a discount to apply to this customer&apos;s
                        account. This will affect all future invoices.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit'>Submit</Button>
              </form>
            </Form>
          </div>
          <Button
            onClick={handleInvoice}
            className='bg-gray-600 ml-4 hover:bg-black'
          >
            Send Invoice
          </Button>
          <p className='ml-4'>
            Last invoice sent:{' '}
            {format(customer.lastInvoiceSent, 'MMM do, yyyy')}
          </p>
        </>
      ) : (
        <div className='p-4'>
          <h2 className='text-xl font-medium'>Current Discounts</h2>
          <p className='text-md text-gray-600'>
            {customer.discount
              ? customer.discount
              : 'You currently do not have a discount attached to your account.'}
          </p>
        </div>
      )}

      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>
          {!invoices || invoices.length === 0
            ? 'You have no billing history to display'
            : 'Your invoices'}
        </CardDescription>
        {invoices && invoices.length > 0 && (
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='md:flex hidden'>Invoice Sent</TableHead>
                <TableHead className=''>Due Date</TableHead>
                <TableHead className='md:flex hidden'>Status</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead className='text-right'>Pay Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(
                (invoice: Awaited<ReturnType<typeof getCustomerInvoices>>) => (
                  <TableRow key={invoice.id}>
                    <TableCell className='md:flex hidden'>
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
                        'font-medium md:flex hidden'
                      )}
                    >
                      {new Date(invoice.due_date * 1000) < new Date() &&
                      !invoice.paid
                        ? 'PAST DUE'
                        : invoice.paid
                        ? 'PAID'
                        : 'Payment Due'}
                    </TableCell>

                    <TableCell>
                      {formatCurrency(invoice.total, 'USD')}
                    </TableCell>

                    <TableCell className='text-right'>
                      <Link
                        href={invoice.paid ? '#' : invoice.hosted_invoice_url}
                        className={cn(
                          buttonVariants({}),
                          invoice.paid ? 'bg-green-700' : 'bg-blue-600'
                        )}
                      >
                        {invoice.paid ? 'Paid' : 'Pay'}
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className='md:grid hidden' colSpan={3}>
                  Total
                </TableCell>
                <TableCell className='md:hidden grid' colSpan={1}>
                  Total
                </TableCell>
                <TableCell className=''>{invoiceTotal()}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </CardHeader>
      {!invoices || invoices.length === 0 ? (
        <CardFooter>
          <div className='flex flex-col space-y-2'>
            <p>
              If this is a mistake, please contact support at 760-912-7396 or
              send us a message.
            </p>
            <Link href='/contact' className={cn(buttonVariants({}))}>
              Contact Us
            </Link>
          </div>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default BillingForm;
