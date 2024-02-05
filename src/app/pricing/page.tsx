import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PricingModule from '@/components/PricingModule'
import React from 'react'

const Page = () => {
  return (
    <MaxWidthWrapper>
        <PricingModule linkVisibility={true} />
    </MaxWidthWrapper>
  )
}

export default Page
