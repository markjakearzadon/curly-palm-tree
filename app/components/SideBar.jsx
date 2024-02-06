import React, { Suspense } from "react";
import GroupList from "./GroupList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const SideBar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className="hidden md:block col-span-2 truncate bg-red-50">
      <Suspense fallback={<span className="loading loading-ring loading-md"></span>}>
        { session && <GroupList />}
      </Suspense>
    </div>
  );
};

export default SideBar;
