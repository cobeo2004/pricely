import { auth, signIn, signOut } from "@/lib/auth";
import { navLinks } from "@/lib/utils/navBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
async function NavBar() {
  const session = await auth();
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={27}
            height={27}
          />
          <p className="nav-logo">
            Price<span className="text-primary">ly</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
          {navLinks.map((val, idx) => (
            <Link key={idx} href={val.href} className="flex items-center gap-2">
              <Image
                src={val.images.src}
                alt={val.images.alt}
                width={28}
                height={28}
                className="object-contain"
              />
            </Link>
          ))}
          {session && session.user ? (
            <>
              <Image
                src={session.user.image as string}
                alt="user image"
                width={37}
                height={37}
              />
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">Sign out</button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <button type="submit">Sign in</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
