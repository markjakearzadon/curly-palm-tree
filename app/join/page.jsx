import React from "react";
import Join from "../components/Join";

const JoinPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <h1 className="text-2xl pl-5 py-5">Join</h1>
      <Join />
    </div>
  );
};

export default JoinPage;
