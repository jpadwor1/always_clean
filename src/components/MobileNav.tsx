'use client';

import { ArrowRight, Gem, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavbarMenu from './NavbarMenu';
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
interface MobileNavProps {
  isAuth: boolean;
  role: string;
}

const MobileNav = ({ isAuth, role }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isSubscribed = false;
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const pathName = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  const closeOnCurrent = (href: string) => {
    if (pathName === href) {
      toggleOpen();
    }
  };

  return (
    <div className='cursor-pointer sm:hidden flex items-center'>
      <NavbarMenu />

      <Menu
        onClick={toggleOpen}
        className='relative z-40 w-5 h-5 text-zinc-700'
      />

      {isOpen ? (
        <>
          <div className='fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full mt-6'>
            <ul className='absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8'>
              {!isAuth ? (
                <>
                  <li>
                    <RegisterLink className='flex items-center w-full font-semibold text-green-600'>
                      Get Started
                    </RegisterLink>
                  </li>
                  <li className='my-3 h-px w-full bg-gray-300'></li>
                  <li>
                    <LoginLink className='flex items-center w-full font-semibold'>
                      Login
                    </LoginLink>
                  </li>
                  <li className='my-3 h-px w-full bg-gray-300'></li>
                  <li>
                    <Link
                      onClick={() => closeOnCurrent('/pricing')}
                      className='flex items-center w-full font-semibold '
                      href='/pricing'
                    >
                      Pricing
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      onClick={() => closeOnCurrent('/dashboard')}
                      className='flex items-center w-full font-semibold '
                      href={role === 'ADMIN' ? '/dashboard' : '/client'}
                    >
                      {role === 'ADMIN' ? 'Dashboard' : 'Profile'}
                    </Link>
                  </li>
                  {role === 'ADMIN' && (
                    <>
                      <li>
                        <Link
                          onClick={() => closeOnCurrent('/dashboard')}
                          className='flex items-center w-full font-semibold '
                          href='/create'
                        >
                          Blog Writer
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => closeOnCurrent('/dashboard')}
                          className='flex items-center w-full font-semibold '
                          href='/client'
                        >
                          Profile
                        </Link>
                      </li>
                    </>
                  )}
                  <li className='my-3 h-px w-full bg-gray-300'></li>

                  <li>
                    <LogoutLink className='flex items-center w-full font-semibold '>
                      Logout
                    </LogoutLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MobileNav;
