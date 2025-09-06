/**
 * Formats a timestamp into a relative time string (e.g., "30 minutes ago", "2 hours ago")
 * @param timestamp - ISO timestamp string (e.g., "2025-05-14T15:27:47.878006+03:30")
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  // If the timestamp is in the future, return "just now"
  if (diffInSeconds < 0) {
    return "just now";
  }

  // Less than 1 minute
  if (diffInSeconds < 60) {
    return "just now";
  }

  // Less than 1 hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }

  // Less than 1 day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  // Less than 1 week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  // Less than 1 month (30 days)
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  }

  // Less than 1 year
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }

  // More than 1 year
  const years = Math.floor(diffInSeconds / 31536000);
  return `${years} year${years === 1 ? '' : 's'} ago`;
};
