import React from "react";

const layout = ({ children }) => {
  return <div className="col-span-5 md:col-span-3">{children}</div>;
};

export default layout;
