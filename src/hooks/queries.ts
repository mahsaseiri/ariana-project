import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { authService } from "../apis/auth";
import { tweetService } from "../apis/tweet";
import { LoginFormValues } from "../types/auth";
import store from "../store";

// Auth API hooks using React Query

/**
 * Login mutation hook
 * Handles user authentication
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: (body: LoginFormValues) => authService.login(body),
  });
};

/**
 * Register mutation hook
 * Handles user registration
 */
export const useRegister = () => {
  return useMutation({
    mutationFn: (body: FormData) => authService.register(body),
  });
};
export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getUser(),
    retry: false, // Don't retry if unauthorized
  });
};

// Tweet API hooks using React Query

/**
 * Infinite scroll hook for tweets
 * Handles pagination and infinite loading
 */
export const useInfiniteTweets = (search: string = '') => {
  return useInfiniteQuery({
    queryKey: ["tweets", search],
    queryFn: ({ pageParam = 1 }) => 
      tweetService.getTweetList({ 
        search, 
        page: pageParam, 
        count_per_page: 12
      }),
    getNextPageParam: (lastPage, allPages) => {
      // Check if there are more pages based on the API response structure
      // Assuming the API returns pagination info in the response
      const currentPage = allPages.length;
      const totalPages = lastPage?.data?.total_pages || lastPage?.data?.totalPages;
      const hasMore = totalPages ? currentPage < totalPages : lastPage?.data?.results?.length === 10;
      return hasMore ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Add tweet mutation hook
 * Handles creating new tweets
 */
export const useAddTweet = () => {
  return useMutation({
    mutationFn: (text: string) => tweetService.addTweet(text),
    onSuccess: () => {
      // Invalidate tweets query to refetch data
      // This will be handled by react-query's query invalidation
    },
  });
};
export const useDeleteTweet = () => {
  return useMutation({
    mutationFn: (id: string) => tweetService.deleteTweet(id),
  });
};
