"use client";

import React, { useEffect, useState } from "react";
const CreatePage = () => {
  const [groupName, setGroupName] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   useEffect(() => {
  //     fetch("/api/groups", {
  //       method: "POST",
  //       body: {
  //         title: groupName,
  //       }
  //     })
  //   }, [])
  // }

  return (
    <div className="col-span-5 md:col-span-3 p-5">
      <h1 className="text-2xl mt-8">New Group</h1>
      <form action="" className="flex flex-col mt-8">
        <label htmlFor="groupName">Group Name</label>
        <input
          type="text"
          name="groupName"
          value={groupName}
          maxLength={32}
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
