'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { CustomerType, cn } from '@/lib/utils';
import { trpc } from '@/app/_trpc/client';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { MultiSelect } from 'react-multi-select-component';

type Option = {
  label: string;
  value: string;
};

type ChemicalQuantities = {
  [key: string]: number;
};

const FormSchema = z.object({
  dateCompleted: z.date({
    required_error: 'Please enter the completion date.',
  }),
  tasksPerformed: z.string({
    required_error: 'Please enter the tasks you completed.',
  }),
  service: z.string().min(1, 'Please select a service.'),
});

const ServiceForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const {
    formState: { errors, isValid },
  } = form;
  const components: { title: string; href: string; description: string }[] = [
    {
      title: 'Regular Pool Cleaning',
      href: '/services/regular-cleaning',
      description:
        'Routine cleaning services including skimming, vacuuming, and brushing to keep your pool pristine.',
    },
    {
      title: 'Chemical Balancing',
      href: '/services/chemical-balancing',
      description:
        'Expert testing and adjustment of pool water chemicals to ensure a safe and balanced swimming environment.',
    },
    {
      title: 'Algae Treatment',
      href: '/services/algae-treatment',
      description:
        'Effective solutions for algae removal and prevention, keeping your pool clean and clear.',
    },
    {
      title: 'Tile and Deck Cleaning',
      href: '/services/tile-deck-cleaning',
      description:
        'Specialized cleaning for pool tiles and decks to remove dirt, grime, and mildew, ensuring a spotless pool area.',
    },
    {
      title: 'Pool Opening & Closing',
      href: '/services/opening-closing',
      description:
        'Seasonal services to prepare your pool for the summer and winterize it for the off-season.',
    },
  ];
  const [formData, setFormData] = React.useState({
    label: '',
    dateCompleted: new Date(),
    tasksPerformed: [],
    service: '',
  });
  const [selected, setSelected] = React.useState<Option[]>([]);
  const [selectedChemicals, setSelectedChemicals] = React.useState<Option[]>(
    []
  );
  const [chemicalQuantities, setChemicalQuantities] =
    React.useState<ChemicalQuantities>({});

  const handleChemicalQuantityChange = (chemical: string, quantity: string) => {
    setChemicalQuantities((prevQuantities) => ({
      ...prevQuantities,
      [chemical]: Number(quantity), // Ensure the quantity is a number
    }));
  };
  const options = [
    { label: 'Vacuum', value: 'Vacuum' },
    { label: 'Balanced Chemicals', value: 'Balanced Chemicals' },
    { label: 'Cleaned Tile Band', value: 'Cleaned Tile Band' },
    { label: 'Cleaned Filters', value: 'Cleaned Filters' },
    { label: 'Skimmed', value: 'Skimmed' },
    { label: 'Performed pH test', value: 'Performed pH test' },
  ];
  const chemicalOptions = [
    { label: 'Chlorine', value: 'Chlorine' },
    { label: 'Algaecide', value: 'Algaecide' },
    { label: 'Chlorine Tablet', value: 'Chlorine Tablet' },
    { label: 'Muriatic Acid', value: 'Muriatic Acid' },
  ];
  const mutation = trpc.createServiceEvent.useMutation();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = {
      ...data,
      nextServiceDate: new Date(),
      customerType: 'ACTIVE' as CustomerType,
      tasksPerformed: selected.map((task) => task.label),
      chemicalsUsed: selectedChemicals.map((chemical) => ({
        name: chemical.label,
        quantity: chemicalQuantities[chemical.value] || 0,
      })),
    };
    toast({
      title: 'This is what was submitted',
      description: (
        <>
          <p>{JSON.stringify(formData, null, 2)}</p>
        </>
      ),
    });

    // mutation.mutate(
    //   { ...formData },
    //   {
    //     onSuccess: () => {
    //       router.push('/booking-confirmation');
    //     },
    //     onError: (error: any) => {
    //       toast({
    //         title: 'Oops Something went wrong',
    //         description: (
    //           <>
    //             <p>try again later</p>
    //             <p>{error.message}</p>
    //           </>
    //         ),
    //       });
    //     },
    //   }
    // );
  }

  return (
    <div className='flex flex-col -mx-4 mb-8 rounded-md w-full text-center gap-2 items-center'>
      <h2 className='text-2xl font-bold'>Complete Service Details</h2>
      <div className='flex flex-col items-center justify-center w-3/4 text-center'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6'
          >
            <div className='px-4 flex flex-row justify-center items-center'>
              <FormField
                control={form.control}
                name='service'
                render={({ field }) => (
                  <FormItem className='flex flex-row justify-center items-center w-full mt-0'>
                    <FormLabel className='min-w-fit mr-2 mt-2'>
                      Service Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a service' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {components.map((component) => (
                          <SelectItem
                            onChange={() =>
                              setFormData({
                                ...formData,
                                service: component.title,
                              })
                            }
                            value={component.title}
                            key={component.title}
                          >
                            {component.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='px-4 my-2 flex flex-row items-center text-center align-middle '>
              <FormField
                control={form.control}
                name='dateCompleted'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center w-full mt-0'>
                    <FormLabel className='min-w-fit mr-2 mt-2'>
                      Date Completed
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[400px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          onSelect={field.onChange}
                          disabled={(date) => date <= new Date('2023-12-1')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='px-4 my-2 flex flex-row items-center text-center align-middle '>
              <FormField
                control={form.control}
                name='tasksPerformed'
                defaultValue=''
                render={({ field }) => (
                  <FormItem className='flex flex-row justify-center items-center w-full mt-0'>
                    <FormLabel className='min-w-fit mr-2 mt-2'>
                      Tasks Performed
                    </FormLabel>
                    <MultiSelect
                      className='w-full'
                      options={options}
                      value={selected}
                      onChange={setSelected}
                      labelledBy='Select'
                    />
                  </FormItem>
                )}
              />
            </div>
            <div className='px-4 my-2 flex flex-row items-center text-center align-middle '>
              <FormItem className='flex flex-row justify-center items-center w-full mt-0'>
                <FormLabel className='min-w-fit mr-2 mt-2'>
                  Chemicals Used
                </FormLabel>
                <MultiSelect
                  className='w-full'
                  options={chemicalOptions}
                  value={selectedChemicals}
                  onChange={setSelectedChemicals}
                  labelledBy='Select Chemicals'
                />
              </FormItem>
            </div>
            {selectedChemicals.map((chemical) => (
              <div
                key={chemical.value}
                className='flex flex-row items-center justify-center'
              >
                <FormLabel>{chemical.label} Quantity:</FormLabel>
                <Input
                  type='number'
                  placeholder={
                    chemical.label === 'Chlorine Tablet'
                      ? 'Enter quantity'
                      : 'Enter quantity in ounces'
                  }
                  onChange={(e) =>
                    handleChemicalQuantityChange(chemical.value, e.target.value)
                  }
                />
              </div>
            ))}
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ServiceForm;
