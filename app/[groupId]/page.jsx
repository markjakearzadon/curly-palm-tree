import React from "react";
import Message from "../components/Message";

const GroupMessages = ({ params: { groupId } }) => {
  return (
    <div className="col-span-3">
      <Message groupId={groupId} />
    </div>
  );
};

export default GroupMessages;
