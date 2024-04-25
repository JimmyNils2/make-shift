import { parseISO } from 'date-fns';

/**
 * Convert the date string to Date for each event
 * @param {Array} events Array of events
 * @returns 
 */
export const dateFormatting = (events = []) => {
  return events.map( event => {
    event.start = parseISO(event.start);
    event.end = parseISO(event.end);
    return event
  })
}
