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
import { Label } from 'recharts';
import { Button } from '../ui/button';

interface pHCalculatorProps {
  poolVolume: number;
}

const chemicalDosages: number[] = [6.0, 5.5, 12, 1.0, 4.0];
const PH_PPM: number = 0.2;


const PHCalculator = ({poolVolume}: pHCalculatorProps) => {
  const [testPH, setTestPH] = React.useState(0);
  const [idealPH, setIdealPH] = React.useState(7.5);
  const [chemical, setChemical] = React.useState(0);
    const [result, setResult] = React.useState('');
  const chemicalOptions = [
    { name: 'Sodium Carbonate', value: 0 },
    { name: 'Sodium Hydroxide 50%', value: 1 },
    { name: 'Muriatic Acid', value: 2 },
    { name: 'Sodium Bisulfate', value: 3 },
    { name: 'Carbon Dioxide', value: 4 },
  ];
  const calculatePh = () => {
    if (testPH !== null && idealPH !== null && chemical !== null) {
      const absoluteAdjustment: number = Math.abs(idealPH - testPH);
      const adjustment : number = idealPH - testPH;

      if (adjustment < 0 && (chemical === 0 || chemical === 1)){
        return setResult('These Chemicals will increase your pH. Try Muriatic Acid, Sodium Bisulfate or Carbon Dioxide');
      } else if (adjustment > 0 && (chemical === 2 || chemical === 3 || chemical === 4)){
        return setResult('These Chemicals will decrease your pH. Try Sodium Carbonate or Sodium Hydroxide 50%');
      }
      const dosage: number = chemicalDosages[chemical];
      const step5: number = absoluteAdjustment / PH_PPM;
      const step6: number = poolVolume / 10000;
      const calculationResult: number = dosage * step5 * step6;
      let resultStr: string = '';

      if (chemical === 0 || chemical === 4) {
        resultStr = ' oz.';
      } else if (chemical === 1 || chemical === 2) {
        resultStr = ' fl. oz.';
      } else {
        resultStr = ' lbs.';
      }

      setResult(`Add ${calculationResult.toFixed(2)} ${resultStr} of ${chemicalOptions.find(option => option.value === chemical)?.name}`);
    }
  };
  return (
    <div className='flex flex-col bg-white shadow-sm w-[250px]'>
      <div className='flex bg-green-600 p-2'>
        <h1 className='text-xl text-white'>pH</h1>
      </div>
      <div className='flex flex-col my-2 p-2'>
        {poolVolume === 0 && (
            <h2 className='text-md text-red-600'>
                Please enter pool volume
            </h2>
        )}
        <h2 className='text-md'>
          <span className='font-medium'>Goal Range:</span> 7.2 - 7.8
        </h2>
      </div>
      <div className='flex flex-row items-center justify-between p-2 space-x-2'>
        <div className='flex flex-col'>
          <label className='text-sm font-medium'>Tested</label>
          <Input
            type='number'
            className=''
            name='testPH'
            onChange={(e) => setTestPH(parseFloat(e.target.value))}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium'>Goal</label>
          <Input
            type='number'
            className=''
            name='idealPH'
            defaultValue={idealPH}
            onChange={(e) => setIdealPH(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className='p-2'>
        <label className='text-sm font-medium'>Chemical to adjust pH</label>
        <Select required onValueChange={(e) => setChemical(parseInt(e))}>
          <SelectTrigger className='px-1 text-left'>
            <SelectValue placeholder='Select Chemical' />
          </SelectTrigger>
          <SelectContent>
            {chemicalOptions.map((option, index) => (
              <SelectItem key={index} value={option.value.toString()}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className='p-2 text-center'>
      <Button className='bg-green-600' type='button' onClick={calculatePh}>Submit</Button>
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

export default PHCalculator;
