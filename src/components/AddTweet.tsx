import React from "react";
import { UserIcon } from "../icons";
import Button from "./Button";
import Textarea from "./Textarea";

const AddTweet = () => {
  const [postContent, setPostContent] = React.useState("");

  return (
    <div className="border border-light-gray rounded-lg p-4">
      <div className="flex flex-row gap-3">
        <img
          src={UserIcon}
          alt="User"
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
        <div className="flex flex-col gap-3 flex-1">
          <Textarea
            placeholder="What's Happening ?"
            value={postContent}
            onChange={setPostContent}
            className="w-full"
            rows={3}
          />
          <div className="flex flex-row justify-end">
            <Button name="Post" className="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddTweet;
