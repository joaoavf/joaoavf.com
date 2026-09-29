/**
 * Formats an ISO date string (e.g. "2025-01-14") for display. UTC is used so
 * that the date doesn't shift by a day in timezones west of UTC.
 */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
