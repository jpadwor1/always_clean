'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
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
import { MultiSelect } from 'react-multi-select-component';
import UploadDropzone from '@/components/UploadDropzone';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Chemical, User } from '@prisma/client';

type Option = {
  label: string;
  value: string;
};

interface FileData {
  id: string | undefined;
  downloadURL: string;
  fileName: string;
  serviceId: string | undefined;
}

interface ServiceFormProps {
  customerId: string | undefined;
  user: User;
}

type ChemicalQuantities = {
  [key: string]: number;
};

const FormSchema = z.object({
  dateCompleted: z.string({
    required_error: 'Please enter the completion date.',
  }),
  tasksPerformed: z.string({
    required_error: 'Please enter the tasks you completed.',
  }),
  service: z.string().min(1, 'Please select a service.'),
  notes: z.string().optional(),
  files: z
    .array(
      z.object({
        downloadURL: z.string(),
        fileName: z.string(),
        id: z.string(),
        serviceEventId: z.string(),
      })
    )
    .optional(),
});

const ServiceForm = ({ customerId, user }: ServiceFormProps) => {
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
    dateCompleted: new Date(),
    tasksPerformed: [],
    service: '',
  });
  const [selected, setSelected] = React.useState<Option[]>([]);
  const [selectedChemicals, setSelectedChemicals] = React.useState<Option[]>(
    []
  );
  const [fileData, setFileData] = React.useState<FileData[]>([]);
  const [chemicalQuantities, setChemicalQuantities] =
    React.useState<ChemicalQuantities>({});

  const options = [
    { label: 'Vacuum', value: 'Vacuum' },
    { label: 'Balanced Chemicals', value: 'Balanced Chemicals' },
    { label: 'Cleaned Tile Band', value: 'Cleaned Tile Band' },
    { label: 'Cleaned Filters', value: 'Cleaned Filters' },
    { label: 'Skimmed', value: 'Skimmed' },
    { label: 'Performed pH test', value: 'Performed pH test' },
  ];

  const handleChemicalQuantityChange = (chemical: string, quantity: string) => {
    setChemicalQuantities((prevQuantities) => ({
      ...prevQuantities,
      [chemical]: Number(quantity), // Ensure the quantity is a number
    }));
  };

  const mutation = trpc.createServiceEvent.useMutation();
  const { data: chemicals } = trpc.getChemicals.useQuery();
  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {},
    retry: true,
    retryDelay: 500,
  });
  const { mutate: createFile } = trpc.getCreateFile.useMutation({
    onSuccess: (file) => {
      setFileData((prevData) => [
        ...prevData,
        {
          downloadURL: file?.key || '',
          fileName: file?.name || '',
          id: file?.id || '',
          serviceId: '',
        },
      ]);
    },
  });

  const chemicalOptions = chemicals?.map((chemical: Chemical) => ({
    label: chemical.name,
    value: chemical.name,
  }));

  const handleFileUpload = (downloadURL: string, fileName: string) => {
    setFileData((prevData) => [
      ...prevData,
      { downloadURL, fileName, id: '', serviceId: '' },
    ]);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = {
      ...data,
      dateCompleted: data.dateCompleted,
      nextServiceDate: new Date(),
      customerType: 'ACTIVE' as CustomerType,
      tasksPerformed: selected.map((task) => task.label),
      chemicalsUsed: selectedChemicals.map((chemical) => ({
        name: chemical.label,
        quantity: chemicalQuantities[chemical.value] || 0,
      })),
      customerId: customerId,
      files: fileData.map((file) => ({
        ...file,
        id: file.id || '',
        serviceEventId: '',
      })),
      technicianId: user?.id,
    };

    try {
      
      await Promise.all(
        fileData.map(async (file) => {
          await createFile({
            downloadURL: file.downloadURL,
            fileName: file.fileName,
          });
          startPolling({ downloadURL: file.downloadURL });
        })
      );

      mutation.mutate(
        {
          ...formData,
        },
        {
          onSuccess: (dbServiceEvent) => {
            toast({
              title: 'Service Event Created',
              description: (
                <>
                  <p>Succesfully completed a job! Great work!</p>
                </>
              ),
            });
            router.push(`/dashboard/customer/${customerId}/service-history/${dbServiceEvent.id}`);
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
          },
        }
      );
    } catch (error: any) {
      toast({
        title: 'Oops Something went wrong',
        description: (
          <>
            <p>try again later</p>
            <p>{error.message}</p>
          </>
        ),
      });
    }
  }

  return (
    <div className='flex flex-col mb-8 rounded-md w-full text-center gap-2 items-center'>
      <h2 className='text-2xl font-bold'>Complete Service Details</h2>
      <Separator className='' />
      <div className='flex flex-col items-center justify-center w-[100%] sm:w-3/4 text-left mt-3'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-8'
          >
            <div className='px-4 flex flex-col'>
              <FormField
                control={form.control}
                name='service'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full mt-0'>
                    <FormLabel className='min-w-fit mr-2 mt-2 mb-1'>
                      Service Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='shadow-sm'>
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
                    <FormDescription className='text-xs'>
                      This is the service you are completing. If this is a
                      routine weekly service, it should be marked Regular Pool
                      Cleaning.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='px-4 my-2 flex flex-col'>
              <FormField
                control={form.control}
                name='dateCompleted'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full mt-0'>
                    <FormLabel className='min-w-fit mr-2 my-1'>
                      Date Completed
                    </FormLabel>
                    <Input
                      type='datetime-local'
                      onChange={(e) => {
                        const dateTimeWithSeconds = `${e.target.value}:01Z`;
                        field.onChange(dateTimeWithSeconds);
                      }}
                    />
                    {/* <Popover>
                      <PopoverTrigger className='shadow-sm' asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
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
                    </Popover> */}
                    <FormDescription className='text-xs'>
                      This is the date you completed the service.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='px-4 my-2 flex flex-col'>
              <FormField
                control={form.control}
                name='tasksPerformed'
                defaultValue=''
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full mt-0'>
                    <FormLabel className='min-w-fit mr-2 my-1'>
                      Tasks Performed
                    </FormLabel>
                    <MultiSelect
                      className='w-full shadow-sm'
                      options={options}
                      value={selected}
                      onChange={setSelected}
                      labelledBy='Select'
                    />
                    <FormDescription className='text-xs'>
                      These are the tasks you completed during the service.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <div className='px-4 my-2 flex flex-col'>
              <FormItem className='flex flex-col w-full mt-0'>
                <FormLabel className='min-w-fit mr-2 my-1'>
                  Chemicals Used
                </FormLabel>
                <MultiSelect
                  className='w-full shadow-sm'
                  options={chemicalOptions ? chemicalOptions : []}
                  value={selectedChemicals}
                  onChange={setSelectedChemicals}
                  labelledBy='Select Chemicals'
                />
              </FormItem>
              <FormDescription className='text-xs mt-1'>
                These are the chemicals you used during the service. Make your
                selections and add the quantity used.
              </FormDescription>
            </div>
            {selectedChemicals.map((chemical) => (
              <div
                key={chemical.value}
                className='flex flex-row items-center justify-center max-w-sm'
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

            <div className='px-4 my-2 flex flex-col '>
              <FormField
                control={form.control}
                name='notes'
                defaultValue=''
                render={({ field }) => (
                  <FormItem className='flex flex-col text-left w-full mt-0'>
                    <div className='flex flex-col w-full mt-0'>
                      <FormLabel className='min-w-fit mr-2 my-1'>
                        Notes
                      </FormLabel>
                      <Textarea
                        className='shadow-sm'
                        placeholder='Enter pertinent details for next technician or customer.'
                        {...field}
                      />
                    </div>
                    <FormDescription className='text-red-400'>
                      Beware this field is viewable by the customer.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <div className='px-4 my-2 flex flex-col w-full h-full text-left'>
              <Label className='ml-4 mt-2'>Upload maintenace photos</Label>
              <UploadDropzone onFileUpload={handleFileUpload} />
            </div>
            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ServiceForm;
