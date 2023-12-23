import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { LoginLink, RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import MobileNav from './MobileNav';
import UserAccountNav from './UserAccountNav';

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className='sticky h-20 inset-x-0 top-0 z-30 w-flow border-b border-gray-200 bg-white/75 backdrop-blur-lg transtion-all'>
      <MaxWidthWrapper>
        <div className='flex h-20 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex z-40 font-semibold'>
            <Image src='/logo.png' width={120} height={80} alt='Always Clean' />
          </Link>

          <MobileNav  />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                >
                  Dashboard
                </Link>

                <LoginLink
                  className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                >
                  Login
                </LoginLink>

                <RegisterLink className={buttonVariants({ size: 'sm' })}>
                  Get Started <ArrowRight className='ml-1.5 h-5 w-5' />
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                >
                  Dashboard
                </Link>

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? 'Your Account'
                      : `${user.given_name} ${user.family_name}`
                  }
                  imageUrl={user.picture ?? ''}
                  email={user.email ?? ''}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
