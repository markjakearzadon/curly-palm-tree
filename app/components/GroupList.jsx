"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated")
      router.push("/api/auth/signin");
    const fetchGroups = async () => {
      const response = await fetch("http://localhost:3000/api/groups");
      const data = await response.json();
      setGroups(data);
    };

    fetchGroups();
  }, []);

  return (
    <div className="flex flex-col">
      {groups && groups.map((group) => <Link href={`/${group.id}`} className="p-5 md:hover:bg-red-200 border-b md:border-none border-gray-400 md:max-w-[240px] truncate" key={group.id}>{group.title}</Link>)}
    </div>
  );
};

export default GroupList;
