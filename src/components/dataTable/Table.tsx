'use client';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { columns } from '@/components/dataTable/columns';
import { DataTable } from '@/components/dataTable/data-table';
import { trpc } from '@/app/_trpc/client';
import { Loader2, CheckIcon, ChevronsUpDown, CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button, buttonVariants } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CustomerType } from '@/lib/utils';

interface TaskProps {
  userId: string | undefined;
}

type SelectSingleEventHandler = (date: Date | undefined) => void;

export default function TaskPage({ userId }: TaskProps) {
  const { data: customers, isLoading, error } = trpc.getCustomers.useQuery();
  const { toast } = useToast();
  const customerData = customers?.map((customer) => {
    const {
      id,
      name,
      address,
      email,
      phone,
      customerType,
      nextServiceDate,
      lastServiceDate,
    } = customer;
    const formattedNextServiceDate = new Date(nextServiceDate);
    const formattedLastServiceDate = new Date(lastServiceDate);
    return {
      id,
      name,
      address,
      email,
      phone,
      customerType,
      formattedNextServiceDate,
      formattedLastServiceDate,
    };
  });
  const [date, setDate] = React.useState<Date>(new Date());
  const [newCustomerData, setNewCustomerData] = React.useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    customerType: 'LEAD' as CustomerType,
    nextServiceDate: date,
    formattedLastServiceDate: date,
    id: ''
  });
  const [open, setOpen] = React.useState<boolean>(false);
  const [customerValue, setCustomerValue] = React.useState<string>('');
  const customerTypes = [
    {
      value: 'LEAD',
      label: 'Lead',
    },
    {
      value: 'ACTIVE',
      label: 'Active',
    },
    {
      value: 'INACTIVE',
      label: 'Inactive',
    },
    {
      value: 'VIP',
      label: 'VIP',
    },
    {
      value: 'LOST',
      label: 'Lost',
    },
  ];
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  useEffect(() => {
    if (error) {
      toast({
        title: 'There was a problem...',
        description: 'Please try again in a moment',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const { mutate: addCustomer } = trpc.addCustomer.useMutation({
    onSuccess: () => {
      toast({
        title: 'Customer added',
        description: 'Customer has been added to the database',
        variant: 'destructive',
      });

      setNewCustomerData({
        name: '',
        address: '',
        email: '',
        phone: '',
        customerType: 'LEAD' as CustomerType,
        nextServiceDate: date,
        formattedLastServiceDate: date,
        id: ''
      });

      customerData?.push({
        ...newCustomerData,
        formattedNextServiceDate: newCustomerData.nextServiceDate,
      });
    },
    onError: (error) => {
      toast({
        title: 'There was a problem...',
        description:
          error.message == 'Customer already exists'
            ? error.message
            : 'Try again in a moment',
        variant: 'destructive',
      });


      setNewCustomerData({
        name: '',
        address: '',
        email: '',
        phone: '',
        customerType: 'LEAD' as CustomerType,
        nextServiceDate: date,
        formattedLastServiceDate: date,
        id: ''
      });
    },
  });

  const handleDateSelect: SelectSingleEventHandler = (date) => {
    if (date) {
      setDate(date);
      setSelectedDate(date);
    } else {
      setSelectedDate(new Date());
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedCustomerData = {
      ...newCustomerData,
      nextServiceDate: newCustomerData.nextServiceDate.toISOString(),
    };
    addCustomer({ ...formattedCustomerData });
  };

  return (
    <>
      <div className='h-full flex-1 flex-col space-y-8 md:p-8 flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div>
            <Dialog>
              <DialogTrigger className={buttonVariants({ variant: 'default' })}>
                Add Customer
              </DialogTrigger>
              <DialogContent className='sm:max-w-[525px]'>
                <DialogHeader>
                  <DialogTitle>Add Customer</DialogTitle>
                  <DialogDescription>
                    Add relevant customer info. Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='name' className='text-right'>
                        Name
                      </Label>
                      <Input
                        value={newCustomerData.name}
                        id='name'
                        type='text'
                        className='col-span-3'
                        onChange={(e) =>
                          setNewCustomerData((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='address' className='text-right'>
                        Address
                      </Label>
                      <Input
                        id='address'
                        value={newCustomerData.address}
                        onChange={(e) =>
                          setNewCustomerData((prevState) => ({
                            ...prevState,
                            address: e.target.value,
                          }))
                        }
                        className='col-span-3'
                      />
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='email' className='text-right'>
                        Email
                      </Label>
                      <Input
                        id='email'
                        type='email'
                        value={newCustomerData.email}
                        onChange={(e) =>
                          setNewCustomerData((prevState) => ({
                            ...prevState,
                            email: e.target.value,
                          }))
                        }
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='phone' className='text-right'>
                        Phone Number
                      </Label>
                      <Input
                        id='phone'
                        type='tel'
                        value={newCustomerData.phone}
                        onChange={(e) =>
                          setNewCustomerData((prevState) => ({
                            ...prevState,
                            phone: e.target.value,
                          }))
                        }
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='phone' className='text-right'>
                        Service Day
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[280px] justify-start text-left font-normal',
                              !date && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {date ? (
                              format(date, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                          <Calendar
                            mode='single'
                            selected={date}
                            onSelect={handleDateSelect}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='type' className='text-right'>
                        Status
                      </Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            role='combobox'
                            aria-expanded={open}
                            className='w-[200px] justify-between'
                          >
                            {customerValue
                              ? customerTypes.find(
                                  (type) =>
                                    type.value.toLowerCase() ===
                                    customerValue.toLowerCase()
                                )?.label
                              : 'Select type...'}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput
                              placeholder='Search type...'
                              className='h-9'
                            />
                            <CommandEmpty>No type found.</CommandEmpty>
                            <CommandGroup>
                              {customerTypes.map((type) => (
                                <CommandItem
                                  key={type.value}
                                  value={type.value}
                                  onSelect={(currentValue) => {
                                    setCustomerValue(
                                      currentValue.toLowerCase() ===
                                        customerValue.toLowerCase()
                                        ? ''
                                        : currentValue.toUpperCase()
                                    );
                                    setOpen(false);
                                    setNewCustomerData((prevState) => ({
                                      ...prevState,
                                      customerType:
                                        currentValue.toUpperCase() as CustomerType,
                                    }));
                                  }}
                                  id='customerType'
                                >
                                  {type.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      customerValue === type.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button>Save changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <DataTable
          data={
            customerData?.map((customer) => ({
              ...customer,
              nextServiceDate: customer.formattedNextServiceDate.toISOString(),
              lastServiceDate: customer.formattedLastServiceDate.toISOString(),
              id: customer.id
            })) || []
          }
          columns={columns}
        />
      </div>
    </>
  );
}
