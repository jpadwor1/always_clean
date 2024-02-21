'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const formSchema = z.object({
  chlorineReading: z.number(),
  idealChlorine: z.number(),
  chlorineChemical: z.string(),
});

const Calculator = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idealChlorine: 5.0,
    },
  });
  const [poolVolume, setPoolVolume] = React.useState<number>(0);
  const [ozToLbResult, setOzToLbResult] = React.useState<string>('');
  const [flozToGalResult, setFlozToGalResult] = React.useState<string>('');
  const [chlorineResult, setChlorineResult] = React.useState<string>('12');
  const labels = [
    'Chlorine',
    'pH',
    'Total Alkalinity',
    'Calcium Hardness',
    'Stabilizer (Cyanuric Acid)',
  ];
  const headers = ['Reading', 'Ideal', 'Chemical', 'Amount to be added'];
  const chemicalOptions = {
    chlorine: [
      'Chlorine Gas',
      'Calcium HypoChlorite 67%',
      'Calcium HypoChlorite 75%',
      'Sodium HypoChlorite 12% (bleach)',
      'Lithium HypoChlorite 35%',
      'Trichlor 90%',
      'Dichlor 56%',
      'Dichlor 62%',
      'Sodium Thiosulfate (Neutralizer)',
      'Sodium Sulfite 100%',
    ],
    ph: [
      'Sodium Carbonate',
      'Sodium Hydroxide 50%',
      'Muriatic Acid',
      'Sodium Bisulfate',
      'Carbon Dioxide',
    ],
    totalAlkalinity: [
      'Sodium Bicarbonate',
      'Sodium Carbonate',
      'Sodium Sesquicarbonate',
      'Muriatic Acid',
      'Sodium Bisulfate',
    ],
    caHardness: ['Calcium Chloride 100%', 'Calcium Chloride 77%'],
    stabilizer: ['Cyanuric Acid', 'Dichlor 56%'],
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  // Example conversion function updated to TypeScript
  const ozToLb = (amount: number): void => {
    const conversion = amount * 0.0625;
    const result = `${amount} oz. = ${conversion} lbs.`;
    setOzToLbResult(result);
  };

  const flozToGal = (amount: number): void => {
    const conversion = amount * 0.0078125;
    const result = `${amount} fl.oz. = ${conversion} gal.`;
    setFlozToGalResult(result);
  };

  // Clearing functions (simplified)
  const clearAll = (): void => {
    setPoolVolume(0);
    setOzToLbResult('');
    setFlozToGalResult('');
    // Reset other fields as needed
  };

  // TODO: Implement other functions similarly

  return (
    <div className='flex flex-col'>
      <Input
        type='number'
        name='poolVolume'
        onChange={(e) => setPoolVolume(parseInt(e.target.value))} />
    </div>
  );
};

export default Calculator;
