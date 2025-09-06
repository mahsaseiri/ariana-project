export interface TweetCardProps {
    tweet?: {
      id: string | number;
      text: string;
      author?: {
        first_name: string;
        last_name: string;
        username: string;
        avatar?: string|null;
      };
      created_at?: string;
      updated_at?: string;
      has_edit_permission?: boolean;
    };
    onDelete?: (tweetId: string | number) => void;
  }
  
  export interface TweetFormValues {
    text: string;
  }