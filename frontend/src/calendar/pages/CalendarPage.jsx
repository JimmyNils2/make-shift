import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar, CalendarEvent, CalendarModal, FloatingAddButton } from '../';
import { UID } from '../../constants';
import { localizer } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';
import { FloatingDeleteButton } from '../components/FloatingDeleteButton';


/**
 * Render a calendar page and manage different events
 * @returns 
 */
export const CalendarPage = () => {

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  /**
   * Set the style of an event
   * @param {Object} event 
   * @returns 
   */
  const eventStyleGetter = (event) => {
    // TODO improve the authSlice to obtain uid 
    const myEvent = (event.createdBy == localStorage.getItem(UID))

    // Set the background color based on user ownership
    const style = {
      backgroundColor: myEvent ? '#347CF7' : '#999',
      borderRadius: '0px',
      opacity: '.8',
      color: 'white'
    }

    return {
      style
    }
  }

  /**
   * Open the modal
   */
  const onDoubleClick = () => {
    openDateModal()
  }

  /**
   * Set the selected event as active event
   * @param {Object} event 
   */
  const onSelect = (event) => {
    setActiveEvent(event);
  }

  /**
   * Store the view mode
   * @param {string} event view name 
   */
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  // Trigger startLoadingEvent when the page is render
  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "90vh", width: "90%", margin: "0px auto" }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      < CalendarModal />
      <FloatingAddButton />
      <FloatingDeleteButton />
    </>
  )
}
