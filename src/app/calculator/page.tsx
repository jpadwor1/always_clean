'use client'
import React from 'react'
import { useToast } from '@/components/ui/use-toast';
import {useState} from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const Page = () => {
    const toast = useToast();
    const calculateChem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const currentPH = parseFloat(form.elements['currentPH'].value);
        const desiredPH = parseFloat(form.elements['desiredPH'].value);
        const poolCapacity = parseFloat(form.elements['poolCapacity'].value);
        const acidConcentration = parseFloat(form.elements['acidConcentration'].value);

        const chemicalChange = desiredPH - currentPH;

        if (chemicalChange > 0) {
            // Use soda ash for increasing pH
            const dosagePer10kGallons = chemicalChange * 10; // Modify based on the formula
            const requiredSodaAsh = (poolCapacity / 10000) * dosagePer10kGallons;

            console.log(`Amount of soda ash needed: ${requiredSodaAsh.toFixed(2)} pounds`);
        } else if (chemicalChange < 0) {
            // Use muriatic acid for decreasing pH
            const standardDosage = poolCapacity / 10000 * (Math.abs(chemicalChange) / 0.2);
            let requiredAcid;

            if (acidConcentration === 31.45) {
                requiredAcid = standardDosage; // in quarts
            } else {
                requiredAcid = standardDosage * (31.45 / acidConcentration);
            }

            console.log(`Amount of muriatic acid needed: ${requiredAcid.toFixed(2)} quarts`);
        } else {
            console.log("No adjustment needed.");
        }
    }

    const calculateChlorine = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const currentPH = parseFloat(form.elements['currentPH'].value);
        const poolCapacity = parseFloat(form.elements['poolCapacity'].value);
        const acidConcentration = parseFloat(form.elements['acidConcentration'].value);

        const chemicalChange = desiredPH - currentPH;

    
    }

    return (
        <MaxWidthWrapper>
        <div className='flex flex-col items-center'>
            <form onSubmit={calculateChem}>
                <Input type="text" name='currentPH' placeholder="Enter the current pH" />
                <Input type="text" name='poolCapacity' placeholder="Enter the pool size in gal." />
                <Input type="text" name='desiredPH' placeholder="Enter Desired pH" />
                <Input type="text" name='acidConcentration' placeholder="Enter Acid Concentration (%)" />
                <Button type="submit">Calculate</Button>
            </form>
        </div>
        <div className='flex flex-col items-center mt-10'>
            <h2>Chlorine Chemical Calculation</h2>
            <form onSubmit={calculateChlorine}>
                <Input type="text" name='ppmIncrease' placeholder="Enter the need PPM increase" />
                <Input type="text" name='poolCapacity' placeholder="Enter the pool size in gal." />
                <Input type="text" name='acidConcentration' placeholder="Enter Chlorine Concentration (%)" />
                <Button type="submit">Calculate</Button>
            </form>
        </div>
        </MaxWidthWrapper>
    )
}

export default Page
