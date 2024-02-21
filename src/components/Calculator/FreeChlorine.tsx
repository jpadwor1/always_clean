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

const FreeChlorine = ({ poolVolume }: FreeChlorineProps) => {
  const [chlorineReading, setChlorineReading] = React.useState<number | null>(
    null
  );
  const [idealChlorine, setIdealChlorine] = React.useState(5);
  const [chemical, setChemical] = React.useState(0);
  const [result, setResult] = React.useState('');
  const chemicalOptions = [
    { name: 'Calcium HypoChlorite 65%', factor: 78000 },
    { name: 'Sodium HypoChlorite 12%', factor: 30000 },
    { name: 'Lithium HypoChlorite 35%', factor: 42000 },
    { name: 'Trichlor 90%', factor: 108000 },
    { name: 'Dichlor 62%', factor: 74400 },
    { name: 'Dichlor 56%', factor: 67200 },
    { name: 'Sodium Thiosulfate (Neutralizer)', factor: 117600 },
    { name: 'Sodium Sulfite 100%', factor: 67250 },
  ];

  // Chemicals that will decrease chlorine level
const decreaseChlorineFactors = chemicalOptions
.filter(chemical => 
  chemical.name.includes('Thiosulfate') || chemical.name.includes('Sulfite'))
.map(chemical => chemical.factor);

// Chemicals that will increase chlorine level
const increaseChlorineFactors = chemicalOptions
.filter(chemical => 
  !chemical.name.includes('Thiosulfate') && !chemical.name.includes('Sulfite'))
.map(chemical => chemical.factor);

  const calculate = () => {
    if (chlorineReading === null || idealChlorine === null || chemical === null) {
      return setResult('Please fill all fields');
    }
  
    let change;
    if (decreaseChlorineFactors.includes(chemical)) {
      change = chlorineReading - idealChlorine;
    } else {
      change = idealChlorine - chlorineReading;
    }
  
    if (decreaseChlorineFactors.includes(chemical) && change < 0) {
      return setResult(
        'This chemical will decrease your chlorine. Try another chemical.'
      );
    } else if (increaseChlorineFactors.includes(chemical) && change < 0) {
      return setResult(
        'This chemical will increase your chlorine. Try Sodium Thiosulfate or Sodium Sulfite.'
      );
    }
    const amountNeeded = (poolVolume / chemical) * change;
    const result = amountNeeded * 16;
    setResult(
      'Add ' +
        result.toFixed(2) +
        ' oz of ' +
        chemicalOptions.find((option) => option.factor === chemical)?.name
    );
  };
  return (
    <div className='flex flex-col bg-white shadow-sm w-[250px]'>
      <div className='flex bg-blue-600 p-2'>
        <h1 className='text-xl text-white'>Free Chlorine (FC)</h1>
      </div>
      <div className='flex flex-col my-2 p-2'>
        {poolVolume === 0 && (
          <h2 className='text-md text-red-600'>Please enter pool volume</h2>
        )}
        <h2 className='text-md'>
          <span className='font-medium'>Goal Range:</span> 3 to 7
        </h2>
      </div>
      <div className='flex flex-row items-center justify-between p-2 space-x-2'>
        <div className='flex flex-col'>
          <label className='text-sm font-medium'>Tested</label>
          <Input
            type='number'
            className=''
            name='testChlorine'
            onChange={(e) => setChlorineReading(parseFloat(e.target.value))}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium'>Goal</label>
          <Input
            type='number'
            className=''
            name='idealChlorine'
            defaultValue={idealChlorine}
            onChange={(e) => setIdealChlorine(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className='p-2'>
        <label className='text-sm font-medium'>Chemical to be used</label>
        <Select required onValueChange={(e) => setChemical(parseInt(e))}>
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
        <Button type='button' onClick={calculate}>
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

export default FreeChlorine;
