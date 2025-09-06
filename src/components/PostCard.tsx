import React from "react";
import { UserIcon } from "../icons";

const PostCard = () => {
  return (
    <div className="bg-post-card p-4 rounded-lg">
      <div className="flex ">
        <img src={UserIcon} alt="User" className="w-8 h-8 rounded-full" />
        <div className="flex flex-col justify-between"></div>
      </div>
    </div>
  );
};
export default PostCard;
