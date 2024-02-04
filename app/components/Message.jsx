"use client";
import React, { useEffect, useState } from "react";

const Message = ({ groupId, data, setData, n, setN }) => {

  useEffect(() => {
    const controller = new AbortController();

    async function getMessages() {
      fetch(`http://localhost:3000/api/groups/${parseInt(groupId)}`, {
        cache: "no-store"
      })
        .then((res) => res.json())
        .then((d) => setData(d));
    }
    getMessages();
    setN(false)
    return () => controller.abort();
  }, [n]);

  return (
    <div className="flex flex-col p-3">
      <div className="flex justify-center w-full">
        <span className="">{data?.group?.title}</span>
      </div>
      <div>
        <ul>
          {!data && (
            <div className="mt-16 flex flex-col items-center">
              <span>Fetching</span>
              <span className="loading loading-ring loading-md"></span>
            </div>
          )}
          {data?.messages.map((message) =>
            message.userId === data.user.id ? (
              <li key={message.id}>
                <div className="chat chat-end">
                  <div className="chat-header">
                    <time className="text-xs opacity-50 pr-1">
                      {message.createdAt}
                    </time>
                    {message.name}
                  </div>
                  <div className="chat-bubble chat-bubble-error">
                    {message.message}
                  </div>
                </div>
              </li>
            ) : (
              <li key={message.id}>
                <div className="chat chat-start">
                  <div className="chat-header">
                    {message.name}
                    <time className="text-xs opacity-50 pl-1">
                      {message.createdAt}
                    </time>
                  </div>
                  <div className="chat-bubble chat-bubble-info">
                    {message.message}
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Message;
