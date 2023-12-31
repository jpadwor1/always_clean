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
import { X } from 'lucide-react';
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
  id: number;
  name: string;
  price: number;
  units: string;
} | null;

const UtilityPage = () => {
  const [selectedChemical, setSelectedChemical] =
    React.useState<Chemical>(null);
    const [newChemical, setNewChemical] = React.useState<Chemical>(null);
    const [open, setOpen] = React.useState<boolean>(false);

    const addChemical = (data: Chemical) => {
        setNewChemical(data)
        setOpen(false);
    }
  const handleEditClick = (chemical: Chemical) => {
    setSelectedChemical(chemical);
  };

  const handleSave = () => {
   
    console.log('Saved:', selectedChemical);
    setSelectedChemical(null); // Reset or close dialog after save
  };
  return (
    <MaxWidthWrapper>
      <div className='flex flex-col items-center justify-center shadow-md bg-white rounded-md'>
        <div><h1 className='text-xl text-gray-900 font-semibold'>Chemical Database</h1>
        <p className='text-md text-gray-500'>Add or update current chemical in use</p></div>
        
      <Button onClick={() => setOpen(true)}>Add Chemical</Button>
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
            {chemicalData.map((chemical) => (
              <TableRow key={chemical.id}>
                <TableCell>{chemical.name}</TableCell>
                <TableCell>{chemical.units}</TableCell>
                <TableCell>${chemical.price.toFixed(2)}</TableCell>
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
              <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
                <Button
                  variant='ghost'
                  onClick={() => setSelectedChemical(null)}
                >
                  <X className='h-4 w-4' />
                </Button>
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
    </MaxWidthWrapper>
  );
};

export default UtilityPage;
