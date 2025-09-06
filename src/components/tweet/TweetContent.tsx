import React from "react";
import SearchInput from "../SearchInput";
import PostCard from "../TweetCard";
import AddPost from "../AddTweet";

const TweetContent = () => {
  return (
    <div className="my-6 flex flex-col gap-2 items-center justify-center ">
      <div className="flex flex-col gap-2 w-[664px]">
        <SearchInput
          value=""
          onChange={() => {}}
          placeholder="Search"
          className=""
        />
        <AddPost />
        <div className="flex flex-col gap-2 mb-[100px]">
          {[1, 2, 3, 4, 5].map((item) => (
            <PostCard />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TweetContent;
