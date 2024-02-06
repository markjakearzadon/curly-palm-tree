"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { plus } from "@/constant";
import Image from "next/image";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const router = useRouter();
  const { status, data: session } = useSession(null);


  
  useEffect(() => {
    const fetchGroups = async () => {
      fetch(`/api/user/group`)
      .then((res) => res.json())
      .then((data) => setGroups(data));
    };
    if (status === "authenticated") {
      fetchGroups();
    }
    if (status === "unauthenticated") {
      router.push("/create/user");
    }
  }, [status]);

  return (
    <div className="flex flex-col">
      <div className="flex m-2 p-3 bg-sky-200 rounded-md">
        <div className="flex items-center justify-center rounded-full w-6 h-6 bg-sky-300">
          <Link href="/create">
            <Image src={plus} alt="create" width={15} height={15} />
          </Link>
        </div>
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
