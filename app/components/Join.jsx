"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Join = () => {
  const [groups, setGroup] = useState();

  useEffect(() => {
    fetch("/api/groups")
      .then((res) => res.json())
      .then((data) => {
        setGroup(data);
      });
  }, []);

  groups?.map((group) => {
    const date = new Date(group.createdAt);
    console.log(date.toLocaleTimeString());
  });

  return (
    <div className="flex flex-col col-span-5 md:col-span-3 overflow-y-auto">
      {!groups && (
        <div className="mt-16 flex flex-col items-center">
          <span>Fetching</span>
          <span className="loading loading-ring loading-md"></span>
        </div>
      )}
      <ul>
        {groups?.map((group) => {
          const date = new Date(group.createdAt);

          return (
            <li key={group.id} className="p-5 border-b">
              <Link href={`/join/groupInfo/${group.id}`}>
                <span>
                  {group.title} | {date.toLocaleTimeString()}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Join;
