import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import TestimonialSection from '@/components/Home/TestimonialSection'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import CommunityCTA from '@/components/Services/CommunityCTA'
import { CheckSquare } from 'lucide-react'

const Page = () => {
    return (
        <MaxWidthWrapper>
            <div className='py-20 md:py-28'>
                <div className='container px-4 mx-auto'>
                    <div className='flex flex-wrap xl:items-center -mx-4'>
                        <div className='w-full md:w-1/2 px-4 mb-16 md:mb-0'>
                            <h1 className='mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight'>
                                Pristine Pools, Exceptional Service
                            </h1>
                            <p className='mb-8 text-lg md:text-xl text-slate-600'>
                                Expert Pool Cleaning servicing Florence and surrounding areas for a Sparkling, Hassle-Free Summer. We
                                offer a wide range of pool cleaning services that will suit your
                                needs and budget. Contact us today to learn more about our
                                services. Or book directly below.
                            </p>
                            <div className='flex flex-wrap'>
                                <div className='w-full md:w-auto py-1 md:py-0 md:mr-4'>
                                    <Link href='/booking'>
                                        <Button
                                            variant={'secondary'}
                                            className='shadow-lg hover:shadow-xl'
                                        >
                                            Book Here
                                        </Button>
                                    </Link>

                                    <Link
                                        className='md:hidden inline-flex'
                                        href='tel:520-525-5956'
                                    >
                                        <Button className='shadow-lg hover:shadow-xl ml-2'>
                                            Call Now
                                        </Button>
                                    </Link>
                                    <Link
                                        className='md:inline-flex hidden'
                                        href='tel:520-525-5956'
                                    >
                                        <Button className='shadow-lg hover:shadow-xl ml-2'>
                                            520-525-5956
                                        </Button>
                                    </Link>
                                </div>
                                <div className='w-full md:w-auto py-1 md:py-0' />
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 px-4'>
                            <div className='relative mx-auto md:mr-0 max-w-max'>
                                <Image
                                    width={500}
                                    height={500}
                                    className='absolute z-10 -left-14 -top-12 w-28 md:w-auto'
                                    src='/circle3-yellow.svg'
                                    priority={true}
                                    alt=''
                                />
                                <Image
                                    width={500}
                                    height={500}
                                    className='absolute z-10 -right-7 -bottom-8 w-28 md:w-auto'
                                    src='/dots3-blue.svg'
                                    priority={true}
                                    alt=''
                                />
                                <Image
                                    width={500}
                                    height={500}
                                    className='relative rounded-7xl'
                                    src='/pool.webp'
                                    alt=''
                                    priority={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className='text-3xl md:text-5xl lg:text-6xl font-bold text-center mt-6 mb-8 tracking-tight'>
                What Our Customers Are Saying
            </h2>

            <TestimonialSection />

            {/* CTASection */}
            <CommunityCTA buttonType='call' />

            <section
                className='my-20 py-24 md:pb-32 bg-white'
                style={{
                    backgroundImage: 'url("/pattern-white.svg")',
                    backgroundPosition: 'center',
                }}
            >
                <div className='container px-4 mx-auto'>
                    <div className='md:max-w-4xl mb-12 mx-auto text-center'>
                        <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-full shadow-sm'>
                            FLORENCE POOL CLEANING
                        </span>
                        <h1 className='mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter'>
                            Reliable Pool Cleaning Services in Florence, AZ
                        </h1>
                        <p className='text-lg md:text-xl text-gray-500 font-medium'>
                            At Krystal Clean Pool Service, we specialize in providing top-notch pool cleaning and maintenance for residents of Florence, AZ. Our expert team ensures your pool remains pristine, safe, and ready for enjoyment all year round.
                        </p>
                    </div>
                    <div className='flex flex-wrap -mx-4'>
                        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
                            <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />
                                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                                    Surface Cleaning
                                </h3>
                                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                                    Crystal Clear Pools in Florence, AZ
                                </h2>
                                <p className='text-gray-500 font-medium'>
                                    Our surface cleaning removes leaves, debris, and floating impurities, giving your Florence pool a spotless and inviting look every time.
                                </p>
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
                            <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

                                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                                    Vacuuming and Brushing
                                </h3>
                                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                                    Comprehensive Pool Care in Florence
                                </h2>
                                <p className='text-gray-500 font-medium'>
                                    Our team meticulously vacuums and brushes the pool floor and
                                    walls, removing dirt, algae, and build-up. This not only keeps
                                    your pool looking great but also helps in maintaining a
                                    healthy swimming environment.
                                </p>
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
                            <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

                                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                                    Filter Cleaning
                                </h3>
                                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                                    Keep Florence Pools Running Smoothly
                                </h2>
                                <p className='text-gray-500 font-medium'>
                                    Regular cleaning and inspection of the pool&apos;s filter
                                    system are crucial. We ensure that filters are clean and
                                    functioning efficiently, which is essential for maintaining
                                    water clarity and hygiene.
                                </p>
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
                            <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

                                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                                    Chemical Balancing
                                </h3>
                                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                                    Safe, Balanced Water for Florence Families
                                </h2>
                                <p className='text-gray-500 font-medium'>
                                    Balancing the chemicals in your pool is vital for preventing
                                    bacteria and algae growth. Our experts test and adjust
                                    chlorine, pH, and other chemical levels to ensure your pool
                                    water is safe and comfortable for swimming.
                                </p>
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
                            <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

                                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                                    Equipment Check
                                </h3>
                                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                                    Reliable Pool Equipment in Florence
                                </h2>
                                <p className='text-gray-500 font-medium'>
                                    We perform routine checks on all pool equipment, including
                                    pumps, heaters, and automatic cleaners, to ensure everything
                                    is in perfect working order, thus avoiding any unexpected
                                    disruptions.
                                </p>
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
                            <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

                                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                                    Seasonal Services
                                </h3>
                                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                                    Seasonal Pool Care for Florence, AZ
                                </h2>
                                <p className='text-gray-500 font-medium'>
                                    Our services adapt to the changing seasons. Whether it&apos;s
                                    preparing your pool for summer use or winterizing it to
                                    prevent damage during colder months, we&apos;ve got you
                                    covered year-round.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MaxWidthWrapper>
    )
}

export default Page