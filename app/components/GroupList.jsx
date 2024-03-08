"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { kiwi, plus } from "@/constant";
import Image from "next/image";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const router = useRouter();
  const { status, data: session } = useSession(null);

  useEffect(() => {
    const fetchGroups = async () => {
      const grouplist = await fetch(`/api/user/group`, {
        next: { revalidate: 10 },
      });
      const res = await grouplist.json();
      setGroups(res);
      // .then((res) => res.json())
      // .then((data) => setGroups(data));
    };
    if (status === "unauthenticated" || status === "loading") {
      router.push("/create/user");
    } else {
      fetchGroups();
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <div>
        <div className="flex gap-x-2 m-2 p-3 bg-sky-200 rounded-md">
          <div className="flex items-center justify-center rounded-full w-6 h-6 bg-sky-300">
            <Link href="/create">
              <Image src={plus} alt="create" width={15} height={15} />
            </Link>
          </div>
          <div className="flex items-center justify-center rounded-full w-6 h-6 bg-sky-300">
            <Link href="/join">
              <Image src={kiwi} alt="create" width={15} height={15} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {groups &&
          groups?.map((group) => (
            <Link
              href={`/${group.id}`}
              className="p-5 md:hover:bg-red-200 border-b md:border-none border-slate-50 md:max-w-[240px] truncate"
              key={group.id}
            >
              {group.title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default GroupList;
