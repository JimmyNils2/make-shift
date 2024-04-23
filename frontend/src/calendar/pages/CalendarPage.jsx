import { useEffect, useState } from 'react';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { Navbar, CalendarEvent, CalendarModal, FloatingAddButton } from '../';
import { localizer } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';
import { FloatingDeleteButton } from '../components/FloatingDeleteButton';



export const CalendarPage = () => {
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();
  const {openDateModal} = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

  const eventStyleGetter = () => {

    // TODO change color for current user events 
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: '.8',
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    console.log({doubleClick: event});
    openDateModal()
  }

  const onSelect = (event) => {
    console.log({click: event});
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <Navbar/>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView = {lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "90vh", width:"90%", margin: "0px auto"}}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      < CalendarModal/>
      <FloatingAddButton/>
      <FloatingDeleteButton/>
    </>
  )
}
