import { LoginFormValues } from "../types/auth";
import { _http } from "./_http";

export const tweetService = {
    addTweet: async (text: string) => {
        const response = await _http.post(`tweet/`, {text});
        return response;
    },
    deleteTweet: async (id: string) => {
        const response = await _http.delete(`tweet/${id}/`);
        return response;
    },
  
  getTweetList: async ({search = '', page = 1, count_per_page = 10}: {search?: string, page?: number, count_per_page?: number} = {}) => {
    const params = new URLSearchParams();
    
    if (search && search.trim()) {
      params.append('search', search.trim());
    }
    
    params.append('page', page.toString());
    params.append('count_per_page', count_per_page.toString());
    
    // const queryString = params.toString();
    // const url = `tweet/`;
    
    const response = await _http.get("tweet/", {
      params: {
        search,
        page,
        count_per_page,
      },
    });
    return response;
  },
 
};
