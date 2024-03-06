"use client";

import React from "react";

import Image from "next/image";
import { cry } from "@/constant";

import { usePathname } from "next/navigation";

const NotFoundPage = () => {
  const pathname = usePathname();

  return (
    <div className="col-span-5 md:col-span-3 p-5">
      <div className="flex flex-col gap-y-2">
        <p>the requested url doesn't exist.</p>
        <Image src={cry} alt="niggacrying" />
      </div>
    </div>
  );
};

export default NotFoundPage;
