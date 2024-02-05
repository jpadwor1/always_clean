import ContactSection from '@/components/ContactSection'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PricingModule from '@/components/PricingModule'
import ServiceCTACard from '@/components/Services/ServiceCTACard'
import React from 'react'

const Page = () => {
  return (
    <MaxWidthWrapper>
        <PricingModule linkVisibility={true} />
        <ServiceCTACard />
        <ContactSection  />
    </MaxWidthWrapper>
  )
}

export default Page
