'use client'

import { trpc } from '@/app/_trpc/client'
import React from 'react'

const PaymentTable = () => {
    const {data: invoices, isLoading, error} = trpc.getInvoices.useQuery();


    if(isLoading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    console.log(invoices)
  return (
    <div>
      
    </div>
  )
}

export default PaymentTable
