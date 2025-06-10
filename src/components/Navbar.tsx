import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import MobileNav from "./MobileNav";
import UserAccountNav from "./UserAccountNav";
import NavbarMenu from "./NavbarMenu";
import { db } from "@/db";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const dbCustomer = await db.customer.findFirst({
    where: {
      id: user?.id,
    },
  });
  const role = dbCustomer?.role;
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

          <MobileNav role={role} isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            <NavbarMenu />

            {!user ? (
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
            ) : (
              <>
                <Link
                  href={dbCustomer?.role === "ADMIN" ? "/dashboard" : "/client"}
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  {dbCustomer?.role === "ADMIN"
                    ? "Dashboard"
                    : "Service History"}
                </Link>

                <UserAccountNav
                  name={
                    !dbCustomer?.name ? "Your Account" : `${dbCustomer?.name} `
                  }
                  imageUrl={user.picture ?? ""}
                  email={user.email ?? ""}
                  role={dbCustomer?.role ?? ""}
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
