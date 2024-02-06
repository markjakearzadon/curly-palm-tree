"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
const CreatePage = () => {
  const [groupName, setGroupName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: groupName,
      }),
    });
    if (res.status === 201) {
      const data = await res.json();
      alert("Group created successfully");
      router.push(`/${data.newGroup.id}`);
    } else {
      alert("Something went wrong");
    }
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
          <input
            type="submit"
            value="Create"
            className={`${groupName ? "btn" : "btn btn-disabled"} w-fit`}
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
