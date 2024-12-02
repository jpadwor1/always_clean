import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FacebookIcon, Globe, Mail, Phone } from 'lucide-react'
import React from 'react'

const Page = () => {
    return (
        <div className='flex flex-col items-center h-screen w-full sm:w-[450px] sm:mx-auto'>
            <div className='bg-blue-800 flex flex-col items-center justify-center w-full pt-12 pb-16 -mb-7'>
                <img src='/about/jrHeadshot.jpeg' alt='John Sr' className='rounded-full w-32 h-32 mb-4 shadow-lg' />
                <h1 className='text-white tracking-wide'>John Padworski Jr</h1>
                <h2 className='text-white tracking-wider'>Operations Manager</h2>
            </div>
            <div className='flex flex-row items-center w-full justify-center space-x-7'>
                <a href='tel:520-525-5956' className='shadow-md text-white font-semibold  rounded-full p-2 bg-gray-200'>
                    <Phone className='w-8 h-8 text-blue-300' />
                </a>
                <a href='mailto:support@krystalcleanpools.com' className='shadow-md text-white font-semibold  rounded-full p-2 bg-gray-200'>
                    <Mail className='w-8 h-8 text-blue-300' />
                </a>
                <a href='/' className='shadow-md text-white font-semibold  rounded-full p-2 bg-gray-200'>
                    <Globe className='w-8 h-8 text-blue-300' />
                </a>
            </div>
            <div className='flex flex-col items-start jutify-start w-full mt-8 px-4'>
                <div className='w-full'>
                    <h3 className='text-gray-700 mb-2 text-sm font-semibold'>
                        Mobile
                    </h3>
                    <p className='text-gray-700 mb-4'>
                        +1 (520)-525-5956
                    </p>
                    <Separator className='w-full' />
                </div>
                <div className='w-full mt-2'>
                    <h3 className='text-gray-700 mb-2 text-sm font-semibold'>
                        Email
                    </h3>
                    <a href='mailto:support@krystalcleanpools.com' className='text-gray-700'>
                        support@krystalcleanpools.com
                    </a>
                    <Separator className='w-full mt-4' />
                </div>
                <div className='w-full mt-3'>
                    <h3 className='text-gray-700 mb-2 text-sm font-semibold'>
                        Website
                    </h3>
                    <a href='/' className='text-blue-600 mb-2'>
                        krystalcleanpools.com
                    </a>
                    <Separator className='w-full mt-4' />
                </div>

                <div className='flex flex-col items-center justify-center w-full mt-4 '>
                    <h4 className='text-sm font-medium text-gray-700'>Connect with John Jr</h4>
                    <a target='_blank' href='https://www.facebook.com/profile.php?id=61556652453501' className='text-blue-600 font-semibold mt-2'>
                        <FacebookIcon className='w-8 h-8 text-blue-600 mt-2' />
                    </a>

                </div>


            </div>

        </div>
    )
}

export default Page