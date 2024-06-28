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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { STRIPE_PLANS } from '@/lib/PLANS';
import { useRouter } from 'next/navigation';
import { Textarea } from '../ui/textarea';
import { Loader2 } from 'lucide-react';

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

const InvoiceSchema = z.object({
  name: z.string(),
  amount: z.string(),
  description: z.string(),
  dueDate: z.string(),
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
  const invoiceForm = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
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
  const createCustomInvoice = trpc.createCustomInvoice.useMutation();

  function formatCurrency(amountInCents: number, currencyCode = 'USD') {
    const amount = amountInCents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  }

  const invoiceTotal = () => {
    let invoiceTotals = 0;

    invoices.forEach((invoice) => {
      if (invoice.status !== 'paid') {
        invoiceTotals += invoice.total;
      }
    });
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
  function submitInvoice(data: z.infer<typeof InvoiceSchema>) {
    // Parse the date string and create a Date object in PST
    const [year, month, day] = data.dueDate.split('-');
    const dataDueDatePST = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 24, 0, 0)); // 8 AM UTC is midnight PST

    // Convert the PST date to a Unix timestamp in seconds
    const dueDateInUTCTimestamp = Math.floor(dataDueDatePST.getTime() / 1000);

    const formData = {
      customerId: customer.id,
      name: data.name,
      amount: parseInt(data.amount),
      description: data.description,
      dueDate: dueDateInUTCTimestamp,
    };

    createCustomInvoice.mutate(formData, {
      onSuccess: () => {
        toast({
          title: 'Invoice Sent',
          description: 'The invoice has been sent to the customer account.',
        });
        handleRefresh();
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        handleRefresh();
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
                className='md:w-2/3 w-full space-y-6 flex md:flex-row flex-col items-center space-x-4'
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
                          <SelectTrigger className='md:items-center text-left'>
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
                className='md:w-2/3 w-full space-y-6 flex md:flex-row flex-col items-center space-x-4'
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
          <div className='flex items-center'>
            {/* <Button
              onClick={handleInvoice}
              className='bg-gray-600 ml-4 hover:bg-black'
            >
              Send Monthly Invoice
            </Button> */}
            {customer.lastInvoiceSent != null && (
              <p className='ml-4'>
                Last invoice sent:{' '}
                {format(customer.lastInvoiceSent, 'MMM do, yyyy')}
              </p>
            )}
          </div>

          <div className='flex mt-10 ml-5'>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create Custom Invoice</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                  <DialogTitle>Create Custom Invoice</DialogTitle>
                  <DialogDescription>
                    All of these fields will be visible to the customer on the
                    invoice.
                  </DialogDescription>
                </DialogHeader>
                <Form {...invoiceForm}>
                  <form
                    onSubmit={invoiceForm.handleSubmit(submitInvoice)}
                    className=' flex flex-col space-y-6'
                  >
                    <FormField
                      control={invoiceForm.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <Input
                            placeholder='Item Name'
                            {...field}
                            value={field.value}
                          />

                          <FormDescription>
                            Example: &apos;Initial Pool Drain and Clean&apos;
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={invoiceForm.control}
                      name='amount'
                      render={({ field }) => (
                        <FormItem>
                          <Input
                            type='number'
                            placeholder='Amount'
                            {...field}
                            value={field.value}
                          />

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={invoiceForm.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <Textarea
                            placeholder='Invoice Description'
                            {...field}
                            value={field.value}
                          />

                          <FormDescription>
                            Example: &apos;Drained 1/4 of pull, added 1 bag of
                            salt, and muriatic acid.&apos;
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={invoiceForm.control}
                      name='dueDate'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Due Date</FormLabel>
                          <Input
                            type='date'
                            placeholder='Due Date'
                            {...field}
                          />

                          <FormDescription>
                            Example: &apos;Drained 1/4 of pull, added 1 bag of
                            salt, and muriatic acid.&apos;
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='flex flex-row-reverse justify-between'>
                      <Button className='self-end' type='submit'>
                        {createCustomInvoice.isLoading ? (
                          <Loader2 className='h-4 w-4 text-white animate-spin' />
                        ) : (
                          'Submit'
                        )}
                      </Button>
                      <DialogClose asChild>
                        <Button
                          className='self-start'
                          type='button'
                          variant='secondary'
                        >
                          Close
                        </Button>
                      </DialogClose>
                    </div>
                  </form>
                </Form>

                <DialogFooter className='sm:justify-start'></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
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
                <TableHead className='md:flex justify-center items-center hidden'>
                  Invoice Sent
                </TableHead>
                <TableHead className=''>Due Date</TableHead>
                <TableHead className='md:flex justify-center items-center hidden'>
                  Status
                </TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead className='text-right'>Pay Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => {
                const dueDate = invoice.due_date
                  ? new Date(invoice.due_date * 1000)
                  : new Date();
                return (
                  <TableRow key={invoice.id} className=''>
                    <TableCell className='md:flex hidden'>
                      {format(new Date(invoice.created * 1000), 'MM/dd/yyyy')}
                    </TableCell>
                    <TableCell
                      className={cn(
                        dueDate < new Date() ? 'text-red-600' : 'text-gray-900',
                        'font-medium'
                      )}
                    >
                      {format(dueDate, 'MM/dd/yyyy')}
                    </TableCell>

                    <TableCell
                      className={cn(
                        dueDate < new Date() ? 'text-red-600' : 'text-gray-900',
                        'font-medium md:flex hidden'
                      )}
                    >
                      {dueDate < new Date() && !invoice.paid
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
                        href={
                          invoice.paid
                            ? '#'
                            : invoice.hosted_invoice_url
                            ? invoice.hosted_invoice_url
                            : '#'
                        }
                        className={cn(
                          buttonVariants({}),
                          invoice.paid ? 'bg-green-700' : 'bg-blue-600'
                        )}
                      >
                        {invoice.paid ? 'Paid' : 'Pay'}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
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
