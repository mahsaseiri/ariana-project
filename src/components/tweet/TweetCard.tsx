import React, { useState, useRef, useEffect } from "react";
import { ellipsisIcon, trashIcon, UserIcon } from "../../icons";
import { formatRelativeTime } from "../../utils/timeUtils";
import Button from "../Button";
import { useDeleteTweet } from "../../hooks/queries";
import { TweetCardProps } from "../../types/tweet";



const TweetCard: React.FC<TweetCardProps> = ({ tweet, onDelete }) => {
  const [deleteFlag, setDeleteFlag] = useState(false);
  const deleteTweetMutation = useDeleteTweet();
  const modalRef = useRef<HTMLDivElement>(null);


  // Default values for when tweet data is not available
  const displayName = tweet?.author 
    ? `${tweet.author.first_name} ${tweet.author.last_name}` 
    : "Unknown";

  const content = tweet?.text || "No content available";
  const avatar = tweet?.author?.avatar || UserIcon;
  const timestamp = tweet?.updated_at 
    ? formatRelativeTime(tweet.updated_at) 
    : tweet?.created_at 
    ? formatRelativeTime(tweet.created_at) 
    : "Unknown time";
  const isOwner = tweet?.has_edit_permission;

  const handleDelete = async () => {
    if (tweet?.id) {
      try {
        await deleteTweetMutation.mutateAsync(tweet.id.toString());
        // Call the onDelete callback to remove tweet from local state
        onDelete?.(tweet.id);
        setDeleteFlag(false);
      } catch (error) {
        console.error("Failed to delete tweet:", error);
      }
    }
  };

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setDeleteFlag(false);
      }
    };

    if (deleteFlag) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [deleteFlag]);
  return (
    <div className="bg-post-card p-4 rounded-lg">
      <div className="flex flex-row justify-between">
      <div className="flex gap-[10px]">
        <img src={avatar} alt="User" className="w-8 h-8 rounded-full" />
        <div className="flex flex-col justify-between">
          <p className="text-black text-xs font-medium">{displayName}</p>
          <p className="text-[11px] text-[#999999]">{timestamp}</p>
        </div>
      </div>
      {
        isOwner && 
        (
          <div className="relative">
        <button onClick={() => setDeleteFlag(!deleteFlag)}>
          <img src={ellipsisIcon} alt="ellipsis" />
        </button>
        {
          deleteFlag && (
            <div ref={modalRef} className="absolute top-[80%] left-0 bg-white rounded-lg  h-10 shadow-lg w-[200px]">
              
              <Button
                leftIcon={<img src={trashIcon} alt="trash" className="w-4 h-4" />}
                name="Delete Post" 
                onClick={handleDelete} 
                className="!h-auto bg-white text-sm font-normal !text-[#FF3B30] border-none " 
              />
              </div>
          )
        }
        </div>
        )
      }
      
      </div>
      <div className="text-black text-xs text-justify mt-[13px] whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
};
export default TweetCard;
