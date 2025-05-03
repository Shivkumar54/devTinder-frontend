import React from "react";
import { useSelector } from "react-redux";

import EditProfile from "../Common/EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="container mx-auto w-full max-h-fit flex items-center justify-center scroll-auto">
      {user && <EditProfile user={user} />}
    </div>
  );
};

export default Profile;
