"use client";

import React, { Suspense, useEffect, useState } from "react";

const GroupMessages = ({ params: { groupId } }) => {
  const [data, setData] = useState();

  useEffect(() => {
    async function getMessages() {
      fetch(`http://localhost:3000/api/groups/${parseInt(groupId)}`)
        .then((res) => res.json())
        .then((d) => setData(d));
    }
    getMessages();
  }, []);

  return (
    <div className="col-span-3">
      <ul>
        { !data && (
          <div className="mt-16 flex flex-col items-center">
            <span>Fetching</span>
            <span className="loading loading-ring loading-md"></span>
          </div>
        )}
        {data?.messages.map((message) =>
          message.userId === data.user.id ? (
            <li key={message.id} className="bg-red-400">
              {message.message}
            </li>
          ) : (
            <li key={message.id} className="bg-blue-400">
              {message.message}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default GroupMessages;
