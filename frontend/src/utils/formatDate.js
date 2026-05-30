import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return '—';
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    return '—';
  }
};
export const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy \'at\' h:mm a');
  } catch (error) {
    return '—';
  }
};
export const isOverdue = (dueDateString) => {
  if (!dueDateString) return false;
  try {
    const dueDate = parseISO(dueDateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare with the start of today
    return dueDate < today;
  } catch (error) {
    return false;
  }
};
export const getDaysLeft = (dueDateString) => {
  if (!dueDateString) return null;
  try {
    const dueDate = parseISO(dueDateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (error) {
    return null;
  }
};
export const timeAgo = (dateString) => {
  if (!dateString) return '—';
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return '—';
  }
};
