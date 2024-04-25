import PropTypes from 'prop-types';
/**
 * Render a calendar event item
 * @param {Object} An event 
 * @returns 
 */
export const CalendarEvent = ({ event }) => {

  const { title } = event;

  return (
    <>
      <strong>{title}</strong>
      <br />
      <span>{ }</span>
    </>
  )
}

CalendarEvent.propTypes = {
  event: PropTypes.object.isRequired
}
