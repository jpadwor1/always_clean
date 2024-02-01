'use client';
import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';
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
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2, X } from 'lucide-react';
import { trpc } from '@/app/_trpc/client';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const chemicalData = [
  {
    id: 1,
    name: 'Chlorine',
    price: 15.5,
    units: 'Ounces', // Placeholder price, replace with actual price
  },
  {
    id: 2,
    name: 'Chlorine Tablets',
    price: 20.0,
    units: 'Each', // Placeholder price, replace with actual price
  },
  {
    id: 3,
    name: 'Algaecide',
    price: 25.0,
    units: 'Ounces', // Placeholder price, replace with actual price
  },
  {
    id: 4,
    name: 'Muriatic Acid',
    price: 10.0,
    units: 'Ounces', // Placeholder price, replace with actual price
  },
];

type Chemical = {
  id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  units: string | undefined;
} | null;

const UtilityPage = () => {
  const router = useRouter();
  const [selectedChemical, setSelectedChemical] =
    React.useState<Chemical>(null);
  const [newChemical, setNewChemical] = React.useState<Chemical>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [Loading, setLoading] = React.useState(false);
  const [chemicals, setChemicals] = React.useState<Chemical[]>([]);
  const { mutate: addChemical } = trpc.addChemical.useMutation();
  const { data: dbChemicals, isLoading, error } = trpc.getChemicals.useQuery();

  React.useEffect(() => {
    if (dbChemicals) {
      setChemicals(dbChemicals);
    }
  }, [dbChemicals]);

  const updateChemical = trpc.updateChemical.useMutation();

  const handleAddChemical = () => {
    if (newChemical) {
      setLoading(true);

      const formattedChemical = {
        id: newChemical?.id || '',
        name: newChemical?.name || '',
        units: newChemical?.units || '',
        price: newChemical?.price || 0,
      };
      addChemical(formattedChemical, {
        onSuccess: () => {
          toast({
            title: 'Chemical Added',
            description: 'Chemical has been added to the database',
          });
          setLoading(false);
          setOpen(false);
        },
        onError: (error) => {
          const errorMessage = error.message;
          toast({
            title: 'Chemical Add Failed',
            description: errorMessage,
          });
          setLoading(false);
          setOpen(false);
        },
      });
    } else {
      toast({
        title: 'Error',
        description: 'Please fill out all fields',
      });
    }
  };

  const handleEditClick = (chemical: Chemical) => {
    setSelectedChemical(chemical);
  };

  const handleSave = () => {

    const updatedChemical = {
      id: selectedChemical?.id || '',
      name: selectedChemical?.name || '',
      units: selectedChemical?.units || '',
      price: selectedChemical?.price || 0,
    };
    updateChemical.mutate(updatedChemical, {
      onSuccess: () => {
        toast({
          title: 'Chemical Updated',
          description: 'Chemical has been updated',
        });
        setSelectedChemical(null);
      },
      onError: () => {
        toast({
          title: 'Oops, something went wrong!',
          description: 'Chemical failed to update. Try again later.',
        });
        setSelectedChemical(null);
      },
    });
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

  return (
    <MaxWidthWrapper>
      <div className='flex flex-col items-center justify-center shadow-md bg-white rounded-md'>
        <div className='flex flex-row justify-between p-4 space-y-4 w-full'>
          <div className='flex flex-col'>
            <h1 className='text-xl text-gray-900 font-semibold'>
              Chemical Database
            </h1>
            <p className='text-md text-gray-500'>
              Add or update current chemical in use
            </p>
          </div>

          <Button className='bg-blue-400' onClick={() => setOpen(true)}>
            Add Chemical
          </Button>
        </div>
        <Table>
          <TableCaption>Chemical Database</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Chemical Name</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chemicals.map((chemical) => (
              <TableRow key={chemical?.id}>
                <TableCell>{chemical?.name}</TableCell>
                <TableCell>{chemical?.units}</TableCell>
                <TableCell>${chemical?.price?.toFixed(2)}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(chemical)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedChemical && (
          <Dialog open={selectedChemical ? true : false}>
            <DialogContent>
              <DialogClose
                onClick={() => setSelectedChemical(null)}
                className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
              >
                <X className='h-4 w-4' />
                <span className='sr-only'>Close</span>
              </DialogClose>
              <DialogHeader>
                <DialogTitle>Edit Chemical Information</DialogTitle>
                <DialogDescription>
                  Update the details of the chemical.
                </DialogDescription>
              </DialogHeader>

              <div className='flex flex-col space-y-3'>
                <div className='flex flex-row space-x-1 items-center no-wrap'>
                  <Label className='no-wrap'>Chemical Name</Label>
                  <Input
                    type='text'
                    value={selectedChemical.name}
                    onChange={(e) =>
                      setSelectedChemical({
                        ...selectedChemical,
                        name: e.target.value,
                      })
                    }
                    placeholder='Chemical Name'
                  />
                </div>
                <div className='flex flex-row space-x-1 items-center'>
                  <Label>Units</Label>
                  <Input
                    type='text'
                    value={selectedChemical.units}
                    onChange={(e) =>
                      setSelectedChemical({
                        ...selectedChemical,
                        units: e.target.value,
                      })
                    }
                    placeholder='Units'
                  />
                </div>
                <div className='flex flex-row space-x-1 items-center'>
                  <Label>Price</Label>
                  <Input
                    type='number'
                    value={selectedChemical.price}
                    onChange={(e) =>
                      setSelectedChemical({
                        ...selectedChemical,
                        price: parseFloat(e.target.value),
                      })
                    }
                    placeholder='Price'
                  />
                </div>
              </div>
              <DialogFooter className='sm:justify-between'>
                <Button
                  onClick={() => setSelectedChemical(null)}
                  variant='destructive'
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Dialog open={open}>
        <DialogContent>
          <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
            <Button variant='ghost' onClick={() => setSelectedChemical(null)}>
              <X className='h-4 w-4' />
            </Button>
            <span className='sr-only'>Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Add Chemical Information</DialogTitle>
            <DialogDescription>
              Add the details of the chemical.
            </DialogDescription>
          </DialogHeader>

          <div className='flex flex-col space-y-3'>
            <div className='flex flex-row space-x-1 items-center no-wrap'>
              <Label className='no-wrap'>Chemical Name</Label>
              <Input
                type='text'
                onChange={(e) =>
                  setNewChemical({
                    id: '',
                    name: e.target.value,
                    price: newChemical?.price as number,
                    units: newChemical?.units as string,
                  })
                }
                placeholder='Chemical Name'
              />
            </div>
            <div className='flex flex-row space-x-1 items-center'>
              <Label>Units</Label>
              <Input
                type='text'
                onChange={(e) =>
                  setNewChemical({
                    id: '',
                    name: newChemical?.name as string,
                    price: newChemical?.price as number,
                    units: e.target.value,
                  })
                }
                placeholder='Units'
              />
            </div>
            <div className='flex flex-row space-x-1 items-center'>
              <Label>Price</Label>
              <Input
                type='number'
                onChange={(e) =>
                  setNewChemical({
                    id: '',
                    name: newChemical?.name as string,
                    price: parseFloat(e.target.value),
                    units: newChemical?.units as string,
                  })
                }
                placeholder='Price'
              />
            </div>
          </div>
          <DialogFooter className='sm:justify-between'>
            <Button onClick={() => setNewChemical(null)} variant='destructive'>
              Cancel
            </Button>
            <Button onClick={handleAddChemical}>
              {Loading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MaxWidthWrapper>
  );
};

export default UtilityPage;
