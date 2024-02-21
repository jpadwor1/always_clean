'use client';

import React from 'react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';

interface FreeChlorineProps {
  poolVolume: number;
}

interface ChemicalOption {
    name: string;
    factor: number;
    dosage: number;
    increasesAlkalinity: boolean;
  }
  
  const chemicalOptions: ChemicalOption[] = [
    { name: 'Sodium Bicarbonate', factor: 0, dosage: 1.4, increasesAlkalinity: true },
    { name: 'Sodium Carbonate', factor: 1, dosage: 14, increasesAlkalinity: true },
    { name: 'Sodium Sesquicarbonate', factor: 2, dosage: 1.25, increasesAlkalinity: true },
    { name: 'Muriatic Acid', factor: 3, dosage: 26.0, increasesAlkalinity: false },
    { name: 'Sodium Bisulfate', factor: 4, dosage: 2.1, increasesAlkalinity: false },
  ];
  
  const AL_PPM: number = 10;

const CalculateAlkalinity = ({ poolVolume }: FreeChlorineProps) => {
    const [reading, setReading] = React.useState<string>('');
    const [chemical, setChemical] = React.useState<number | null>(null);
    const [ideal, setIdeal] = React.useState<number | null>(100);
    const [result, setResult] = React.useState<string>('');
  
    const calculateAlkalinity = () => {
        const numericReading = parseFloat(reading);
        if (reading && ideal && chemical !== null) {
          const selectedChemical = chemicalOptions.find(option => option.factor === chemical);
          const adjustment = ideal - numericReading;
          const dosage = selectedChemical?.dosage ?? 0;
          const step5 = Math.abs(adjustment) / AL_PPM;
          const step6 = poolVolume / 10000;
          const calculatedResult = dosage * step5 * step6;
          let resultStr = '';
    
          if (selectedChemical?.increasesAlkalinity && adjustment < 0) {
            setResult('This chemical will increase alkalinity. Try another chemical.');
            return;
          } else if (!selectedChemical?.increasesAlkalinity && adjustment > 0) {
            setResult('This chemical will decrease alkalinity. Try another chemical.');
            return;
          }
    
          if ([0, 2].includes(chemical)) {
            resultStr = ' lbs.';
          } else if (chemical === 1) {
            resultStr = ' oz.';
          } else {
            resultStr = ' fl. oz.';
          }
    
          setResult(calculatedResult.toFixed(2) + resultStr);
        } else {
          setResult('Please fill all fields.');
        }
      };
  return (
    <div className='flex flex-col bg-white shadow-sm w-[250px]'>
      <div className='flex bg-blue-600 p-2'>
        <h1 className='text-xl text-white'>Total Alkalinity</h1>
      </div>
      <div className='flex flex-col my-2 p-2'>
        {poolVolume === 0 && (
          <h2 className='text-md text-red-600'>Please enter pool volume</h2>
        )}
        <h2 className='text-md'>
          <span className='font-medium'>Goal Range:</span> 80 - 120ppm
        </h2>
      </div>
      <div className='flex flex-row items-center justify-between p-2 space-x-2'>
        <div className='flex flex-col'>
          <label className='text-sm font-medium'>Tested</label>
          <Input
            type='number'
            className=''
            name='testReading'
            value={reading}
            onChange={e => setReading(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium'>Goal</label>
          <Input
            type='number'
            className=''
            name='ideal'
            defaultValue={ideal?.toString()}
            onChange={(e) => setIdeal(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className='p-2'>
        <label className='text-sm font-medium'>Chemical to be used</label>
        <Select required value={chemical?.toString() ?? undefined} onValueChange={e => setChemical(parseInt(e, 10))}>
          <SelectTrigger className='px-1 text-left'>
            <SelectValue placeholder='Select Chemical' />
          </SelectTrigger>
          <SelectContent>
            {chemicalOptions.map((option, index) => (
              <SelectItem key={index} value={option.factor.toString()}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='p-2 text-center'>
        <Button type='button' onClick={calculateAlkalinity}>
          Submit
        </Button>
      </div>
      <div className='text-center p-2'>
        <h2 className='text-md'>
          <p className='font-medium'>Result: </p>
          {result}
        </h2>
      </div>
    </div>
  );
};

export default CalculateAlkalinity;
