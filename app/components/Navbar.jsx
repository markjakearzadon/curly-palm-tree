import React from "react";

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="fixed w-full md:w-auto md:min-w-[600px] p-5 border-b">
      <div className="flex justify-between">
        <span>
          <Link href="/">Nigga</Link>
        </span>
        <div className="flex gap-x-3">
          {session ? (
            <Link href="/settings">{session.user.name}</Link>
          ) : (
            <>
              <Link href="/api/auth/signin">Sign in</Link>
              <Link href="/create/user">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
