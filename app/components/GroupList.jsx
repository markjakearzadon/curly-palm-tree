"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { plus } from "@/constant";
import Image from "next/image";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const { status, data: session } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") router.push("/api/auth/signin");

  useEffect(() => {
    const fetchGroups = async () => {
      fetch("http://localhost:3000/api/groups")
        .then((res) => res.json())
        .then((data) => setGroups(data));
    };

    fetchGroups();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="m-2 p-3 bg-sky-300 rounded-md">
        <Link href="/create">
          <Image
            src={plus}
            alt="create"
            width={15}
            height={15}
          />
        </Link>
      </div>
      {groups &&
        groups.map((group) => (
          <Link
            href={`/${group.id}`}
            className="p-5 md:hover:bg-red-200 border-b md:border-none border-gray-400 md:max-w-[240px] truncate"
            key={group.id}
          >
            {group.title}
          </Link>
        ))}
    </div>
  );
};

export default GroupList;
