import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const {events, activeEvent} = useSelector(state => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent = async (calendarEvent) => {
    // Sent http request to API Rest

    if(calendarEvent._id) {
      dispatch(onUpdateEvent({...calendarEvent}))
    }
    else { // Create
      dispatch(onAddNewEvent({
        ...calendarEvent, 
        _id: new Date().getTime()
      }))
    }
  }

  const startDeleteEvent = () => {
    dispatch(onDeleteEvent());
  }

  return {
    /* Props */
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    /* Methods */
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent
  }
}
