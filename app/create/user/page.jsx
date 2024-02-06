"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateUserPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 201) {
        alert("User created");
        router.push("/api/auth/signin");
      }
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5 py-5">Create User</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          value={username}
          placeholder="Username"
          minLength={3}
          className="outline-none border rounded-md p-3"
        />
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          minLength={8}
          className="outline-none border rounded-md p-3"
        />
        <input type="submit" value="Create" className={ username && password ? "btn" : "btn btn-disabled"} />
      </form>
    </div>
  );
};

export default CreateUserPage;
