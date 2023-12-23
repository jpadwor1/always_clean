'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '../ui/button';

const meta = {
  title: '',
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function Modal({ isModalOpen, toggleModal, addCustomer }) {
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  // Function to handle click outside of modal content
  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal(false); // Close the modal if click is outside of modal content
      }
    },
    [modalRef, toggleModal]
  );

  useEffect(() => {
    // Add event listener when the modal is open
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, isModalOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer(formData);
    toggleModal(false);
  };

  return createPortal(
    <>
      <div className='md:py-28 bg-white z-65'>
        <div ref={modalRef} className='p-6 sm:p-10 mx-auto rounded-lg'>
          <form className='' onSubmit={handleSubmit}>
            <div className='flex flex-wrap -mx-4 mb-8 rounded-md'>
              <div className='w-full md:w-1/2 px-4 mb-8 md:mb-0'>
                <label className='block mb-2 text-coolGray-800 font-medium leading-6'>
                  First Name
                </label>
                <input
                  required
                  className='block h-12 w-full py-2 px-3 appearance-none border border-coolGray-200 rounded-lg shadow-md text-coolGray-800 leading-6 placeholder-coolGray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                  type='text'
                  placeholder='Your First Name'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className='w-full md:w-1/2 px-4'>
                <label
                  className='block mb-2 text-coolGray-800 font-medium leading-6'
                  htmlFor=''
                >
                  Last Name
                </label>
                <input
                  required
                  className='block h-12 w-full py-2 px-3 appearance-none border border-coolGray-200 rounded-lg shadow-md text-coolGray-800 leading-6 placeholder-coolGray-300 focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                  type='text'
                  name='lastName'
                  placeholder='Your Last Name'
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='mb-6'>
              <label
                className='block mb-2 text-coolGray-800 font-medium leading-6'
                htmlFor=''
              >
                Home Address
              </label>
              <input
                required
                className='block h-12 w-full py-2 px-3 appearance-none border border-coolGray-200 rounded-lg shadow-md text-coolGray-800 leading-6 placeholder-coolGray-300 focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                type='text'
                name='address'
                placeholder='Home Address'
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className='mb-6'>
              <label
                className='block mb-2 text-coolGray-800 font-medium leading-6'
                htmlFor=''
              >
                Email Address
              </label>
              <input
                required
                className='block h-12 w-full py-2 px-3 appearance-none border border-coolGray-200 rounded-lg shadow-md text-coolGray-800 leading-6 placeholder-coolGray-300 focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                type='email'
                name='email'
                placeholder='Email Address'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className='mb-6'>
              <label
                className='block mb-2 text-coolGray-800 font-medium leading-6'
                htmlFor=''
              >
                Phone Number
              </label>
              <input
                required
                className='block h-12 w-full py-2 px-3 appearance-none border border-coolGray-200 rounded-lg shadow-md text-coolGray-800 leading-6 placeholder-coolGray-300 focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                type='text'
                name='phoneNumber'
                placeholder='Phone Number'
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <Button className='' type='submit'>
              Save
            </Button>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}
