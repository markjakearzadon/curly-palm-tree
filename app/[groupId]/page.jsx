"use client";

import React, { useEffect, useState } from "react";

const GroupMessages = () => {
  const [data, setData] = useState();

  useEffect(() => {
    async function getMessages() {
      fetch(`http://localhost:3000/api/groups/3`)
        .then((res) => res.json())
        .then((d) => setData(d));
    }
    getMessages();
  }, []);

  return (
    <div>
      <ul>
        {data &&
          data.messages.map((message) =>
            message.userId === data.user.id ? (
              <li key={message.id} className="bg-red-400">{message.message}</li>
            ) : (
              <li key={message.id} className="bg-blue-400">{message.message}</li>
            )
          )}
      </ul>
    </div>
  );
};

export default GroupMessages;
