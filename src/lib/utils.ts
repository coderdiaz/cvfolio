import { DEFAULT_CONFIGURATION } from './constants';
import type { CollectionEntry } from 'astro:content';

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC', // Default to UTC to prevent timezone issues
  });

  // Ensure we're parsing the date correctly
  return formatter.format(new Date(date));
};

export const generateAbsoluteUrl = (path: string) =>
  DEFAULT_CONFIGURATION.baseUrl.concat(path);

export const isDevelopment = () => import.meta.env.MODE === 'development';

export const includeDraft = (draft: boolean) => {
  if (isDevelopment()) return true;
  return draft !== true;
};

export const sortByDateRange = (jobs: CollectionEntry<'jobs'>[]) => {
  // Convert "Now" to current year, otherwise returns the year as is
  const getEndYear = (job: CollectionEntry<'jobs'>) =>
    job.data.to === 'Now' ? new Date().getFullYear() : job.data.to;

  return jobs.sort((current, next) => {
    // Compare end years first, then fall back to start years if end years are equal
    const [currentEnd, nextEnd] = [getEndYear(current), getEndYear(next)];
    return nextEnd - currentEnd || next.data.from - current.data.from;
  });
};

export const sortByYear = (talks: CollectionEntry<'talks'>[]) => {
  return talks.sort((a, b) => b.data.year - a.data.year);
};
