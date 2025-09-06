import React from "react";
import { UserIcon } from "../icons";

const TweetCard = () => {
  return (
    <div className="bg-post-card p-4 rounded-lg">
      <div className="flex ">
        <img src={UserIcon} alt="User" className="w-8 h-8 rounded-full" />
        <div className="flex flex-col justify-between">
          <p className="text-black text-xs font-medium">John Doe</p>
          <p className="text-[11px] text-[#999999]">12:00 PM</p>
        </div>
      </div>
      <p className="text-black text-xs text-justify">
        Fusce auctor, magna non lacinia volutpat, velit est sagittis metus, ac
        semper tortor justo at lacus. Interdum et malesuada fames ac ante ipsum
        primis in faucibus.
      </p>
    </div>
  );
};
export default TweetCard;
