import React from "react";
import SearchInput from "../SearchInput";

const TweetContent = () => {
  return (
    <div className="mt-6flex flex-col gap-2 items-center justify-center bg-orange-500">
      <SearchInput
        value=""
        onChange={() => {}}
        placeholder="Search"
        className="w-[664px]"
      />
    </div>
  );
};
export default TweetContent;
