import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import MobileNav from "./MobileNav";
import NavbarMenu from "./NavbarMenu";

const Navbar = async () => {

  return (
    <nav className="sticky h-20 inset-x-0 top-0 z-30 w-flow border-b border-gray-200 bg-white/75 backdrop-blur-lg transtion-all">
      <MaxWidthWrapper>
        <div className="flex h-20 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <Image
              src="/logo.png"
              width={120}
              height={120}
              alt="Krystal Clean"
              priority={true}
            />
          </Link>

          <MobileNav isAuth={false} />

          <div className="hidden items-center space-x-4 sm:flex">
            <NavbarMenu />


            <>
              <Link href={"https://krystalcleanpools.mypoolportal.com"}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Login
              </Link>

              <Link href={"https://krystalcleanpools.mypoolportal.com"} className={buttonVariants({ size: "sm" })}>
                Get Started <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            </>

          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
