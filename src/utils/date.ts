/**
 * Format a timestamp string to a readable date format
 */
export function formatDate(timestamp: string): string {
  if (!timestamp) return 'N/A';

  try {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return timestamp;
  }
}

/**
 * Get relative time from timestamp (e.g., "2 hours ago")
 */
export function getRelativeTime(timestamp: string): string {
  if (!timestamp) return 'N/A';

  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return formatDate(timestamp);
  } catch {
    return timestamp;
  }
}

/**
 * Check if timestamp is today
 */
export function isToday(timestamp: string): boolean {
  if (!timestamp) return false;

  try {
    const date = new Date(timestamp);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  } catch {
    return false;
  }
}
