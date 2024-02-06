"use client";

import React, { useState } from "react";
import Message from "../components/Message";
import TextInput from "../components/TextInput";

const GroupMessages = ({ params: { groupId } }) => {
  const [data, setData] = useState(null);
  const [ n, setN ] = useState(false);

  return (
    <div className="col-span-3">
      <Message n={n} setN={setN} setData={setData} data={data} groupId={groupId} />
      <TextInput setN={setN} data={groupId} />
    </div>
  );
};

export default GroupMessages;
