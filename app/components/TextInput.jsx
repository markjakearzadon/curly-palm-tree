"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

const TextInput = ({ data, setN }) => {
  const [text, setText] = useState("");
  const { status, data: session } = useSession()
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setText("");
    fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
        userId: session.user.id,
        groupId: data,
      }),
    }).then((res) => {
      console.log(res.status);
      setN(true);
    });

    console.log(session)
  };

  return (
    <div className="w-full md:max-w-[360px] absolute p-2 bottom-0">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex justify-center gap-x-5"
      >
        <input
          type="text"
          value={text}
          className="p-2 w-full rounded-lg border outline-none"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <input type="submit" value="Send" className="md:hidden" />
      </form>
    </div>
  );
};

export default TextInput;
