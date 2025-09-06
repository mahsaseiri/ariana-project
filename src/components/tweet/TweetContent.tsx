import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import SearchInput from "../SearchInput";
import PostCard from "./TweetCard";
import AddPost from "./AddTweet";
import { useInfiniteTweets } from "../../hooks/queries";
import { emptyPostIcon } from "../../icons";

const TweetContent = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [newTweets, setNewTweets] = useState<any[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  const token = useSelector((state: any) => state.auth.token);



  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isSuccess,
  } = useInfiniteTweets(debouncedSearch);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // WebSocket connection
  const connectWebSocket = useCallback(() => {
    if (!token) return;

    // Close existing connection if any
    if (socket) {
      socket.close();
      setSocket(null);
    }

    try {
      const ws = new WebSocket(`wss://mock.arianalabs.io/ws/tweet/feed/?token=${token}`);
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        
      };

      ws.onmessage = (event) => {
        try {
          const newTweet = JSON.parse(event.data);
          console.log("new tweet", newTweet);
          setNewTweets(prev => {
            // Check if tweet already exists to prevent duplicates
            const exists = prev.some(tweet => tweet.id === newTweet.id);
            if (exists) {
              console.log('Tweet already exists, skipping duplicate');
              return prev;
            }
            return [newTweet, ...prev];
          });
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('WebSocket closed', event.code);
        setSocket(null);
       
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      setSocket(ws);
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
    }
  }, [token]); // Remove socket from dependencies

  useEffect(() => {
    if (token) {
      connectWebSocket();
    }
    
    return () => {
      // if (reconnectTimeoutRef.current) {
      //   clearTimeout(reconnectTimeoutRef.current);
      // }
      if (socket) {
        socket.close(1000, 'Component unmounting');
        setSocket(null);
      }
    };
  }, [token, connectWebSocket]);

  // Track deleted tweet IDs
  const [deletedTweetIds, setDeletedTweetIds] = useState<Set<string | number>>(new Set());

  // Handle tweet deletion
  const handleDeleteTweet = useCallback((tweetId: string | number) => {
    // Remove from newTweets if it exists there
    setNewTweets(prev => prev.filter(tweet => tweet.id !== tweetId));
    // Add to deleted set to filter out from API tweets
    setDeletedTweetIds(prev => new Set(Array.from(prev).concat(tweetId)));
  }, []);

  // Get API tweets and combine with new tweets
  const apiTweets = data?.pages.flatMap(page => page?.data?.results || []) || [];
  
  // Remove duplicates between newTweets and apiTweets, and filter out deleted tweets
  const filteredApiTweets = apiTweets.filter(apiTweet => 
    !newTweets.some(newTweet => newTweet.id === apiTweet.id) &&
    !deletedTweetIds.has(apiTweet.id)
  );
  
  const allTweets = [...newTweets, ...filteredApiTweets];
  return (
    <div className="my-6 flex flex-col gap-2 items-center justify-center ">
      <div className="flex flex-col  gap-[22px] w-[664px]">
      
        
        
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search ..."
          className=""
        />
        {
          !search && isSuccess && (
          <AddPost />
          )
          }
        
        
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-8 text-red-500">
            Error loading tweets. Please try again.
          </div>
        ) : (
          <div className="flex flex-col gap-[13px] mb-[100px]">
            {allTweets.length > 0 ? (
              allTweets.map((tweet: any, index: number) => (
                <PostCard key={tweet.id || index} tweet={tweet} onDelete={handleDeleteTweet} />
              ))
            ) : (
              <div className="flex flex-col justify-center items-center py-8 text-gray-500 ">
              <img src={emptyPostIcon} alt="empty" className="w-[280px] h-[280px]" />
              <p className="text-gray-500 text-sm">No results found for “{search}”. Try checking your spelling or using different keywords.</p>
              </div>
            )}
            
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default TweetContent;

