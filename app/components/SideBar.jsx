import React, { Suspense } from "react";
import GroupList from "./GroupList";

const SideBar = () => {
  return (
    <div className="hidden md:block col-span-2 truncate bg-red-50">
      <Suspense fallback={<span className="loading loading-ring loading-md"></span>}>
        <GroupList />
      </Suspense>
    </div>
  );
};

export default SideBar;
