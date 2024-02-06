"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const GroupInfo = ({ params: { id } }) => {
  const { status, data: session } = useSession();
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsClicked(true);
    const res = await fetch(`/api/groups/${id}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        userId: session.user.id,
      }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Joined group successfully");
      router.push(`/`);
    } else {      
      alert(data.message);
      router.push(`/`);
    }
    setIsClicked(false);
  };

  const [groupInfo, setGroupInfo] = useState(null);

  useEffect(() => {
    fetch(`/api/groups/${id}/info`)
      .then((res) => res.json())
      .then((data) => {
        setGroupInfo(data);
        console.log(data);
      });
  }, [id]);

  return (
    <div className="p-5 col-span-5 md:col-span-3">
      <div className="flex flex-col font-sans">
        <h1 className="text-3xl font-bold">{groupInfo?.group.title}</h1>
        <p>{groupInfo?.creator.name || groupInfo?.creator.username}</p>
        <p>{new Date(groupInfo?.group?.createdAt).toLocaleDateString()}</p>
        <p>{groupInfo?.count + " member(s)"}</p>
      </div>
      <div className="pt-5">
        <button
          className={`btn ${isClicked ? "btn-disabled" : null}`}
          onClick={() => handleClick()}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default GroupInfo;
