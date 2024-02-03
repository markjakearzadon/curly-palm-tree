import React from "react";
import { options } from "@/constant";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import Image from "next/image";

const Settings = async () => {
    const session = await getServerSession(authOptions);
    
  return (
    <div className="bg-red-100 pt-5">
        <div className="flex items-center gap-x-4 p-5">
            <Image
                src={session.user.image}
                alt="profile image"
                width={64}
                height={64}
                className="rounded-full"
            />
            <div className="flex flex-col">
              <span>{session.user.name}</span>
              <span>{session.user.email}</span>
            </div>
        </div>
      {options.map((option) => (
        <div key={option.title}
            className="p-5 hover:bg-red-200"
        >
          <Link href={option.link}>
            <h1 className="text-lg">{option.title}</h1>
          </Link>
          <p className="text-gray-700">{option.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Settings;
