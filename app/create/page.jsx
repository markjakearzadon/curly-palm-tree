"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const CreatePage = () => {
  const [groupName, setGroupName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: groupName,
      }),
    }).then(res => res.json()).then((data) => {
      alert("Group created successfully");
      router.push(`/${data.newGroup.id}`);
    })
    setGroupName("");
  };

  return (
    <div className="col-span-5 md:col-span-3 p-5">
      <h1 className="text-2xl mt-8">New Group</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col mt-8">
        <label htmlFor="groupName">Group Name</label>
        <input
          type="text"
          name="groupName"
          value={groupName}
          maxLength={32}
          minLength={3}
          onChange={(e) => setGroupName(e.target.value)}
          className="border pl-2 py-1 rounded-md"
        />

        <div className="flex justify-center mt-4">
          <input type="submit" value="Create" className="btn w-fit" />
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
