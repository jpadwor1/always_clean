import Head from 'next/head'
import React from 'react'

const Page = () => {
  return (
    <div className="container mx-auto px-4">
    <Head>
      <title>Chemical Balancing - Always Clean Pool Service</title>
    </Head>

    <h1 className="text-2xl font-bold text-center my-4">Chemical Balancing - Balanced Waters for Safe Swimming</h1>
    
    <section>
      <p className="text-md my-2">
        Balancing the chemicals in your pool is vital for preventing bacteria and algae growth. Our experts test and adjust chlorine, pH, and other chemical levels to ensure your pool water is safe and comfortable for swimming.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold my-3">Why Chemical Balancing is Essential</h2>
      <p className="text-md my-2">
        Unbalanced pool chemicals can lead to harmful bacteria and algae growth. Ensuring the right balance provides a healthier and safer swimming environment.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold my-3">Our Chemical Balancing Process</h2>
      <ul className="list-disc pl-5 my-2">
        <li>Testing and adjusting chlorine levels</li>
        <li>Maintaining the perfect pH balance</li>
        <li>Regular monitoring for consistent water quality</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold my-3">The Always Clean Pool Service Advantage</h2>
      <p className="text-md my-2">
        Choose us for experienced staff, precise chemical balancing, and a commitment to customer satisfaction.
      </p>
    </section>

    <section className="my-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Contact Us for More Details
      </button>
    </section>

  </div>
  )
}

export default Page
