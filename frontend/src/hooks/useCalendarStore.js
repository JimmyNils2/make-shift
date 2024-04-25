import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { api } from '../api';
import { UID } from '../constants';
import { dateFormatting } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from '../store';

/**
 * Custom hook to dispatch calendarSlide methods
 * @returns Properties and methods
 */
export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const {events, activeEvent} = useSelector(state => state.calendar);

  /**
   *  Set the active event in the state
   * @param {Object} calendarEvent the selected event
   */
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  /**
   * Dispatch the save o update method
   * @param {object} calendarEvent the event in the form
   * @returns 
   */
  const startSavingEvent = async (calendarEvent) => {
    try {
      // Check if the event has an id to update it
      if(calendarEvent.id) {
        const {data} = await api.put(`/api/events/${activeEvent.id}/`, calendarEvent);
        dispatch(onUpdateEvent({...calendarEvent, id: data.id, createdBy: localStorage.getItem(UID)}));
        return;
      }
      // Remove the user prop
      const {user, ...rest} = calendarEvent;  

      // Create a new event and format the start and end dates
      const {data} = await api.post('/api/my-events/', {
        ...rest,
        start: rest.start.toISOString().replace(/\+\d+\:\d+/g, 'Z'),
        end: rest.end.toISOString().replace(/\+\d+\:\d+/g, 'Z')
      });
      
      // Dispatch the onAddNewEvent method with the properties of the new event
      dispatch(onAddNewEvent({...calendarEvent, id: data.id, createdBy: localStorage.getItem(UID)}));
    } catch (e) {
      console.log(e);
      // TODO improve the error message
      Swal.fire('Saving Error', e.message, 'error');
    }
  }

  /**
   * Dispatch the load method
   */
  const startLoadingEvents = async () => {
    try {
      // Retrieve all events and format them
      const {data} = await api.get('/api/events/');
      const events = dateFormatting(data);
      dispatch(onLoadEvents(events));
    }catch(e){
      // TODO improve the error message
      console.log('Error trying to retrieve the events');
      console.log(e)
    }
  }

  /**
   * Dispatch the delete method
   */
  const startDeleteEvent = async () => {
    try{
      // Delete the active event
      await api.delete(`/api/event/delete/${activeEvent.id}/`);
      dispatch(onDeleteEvent());
    } catch(e){
      // TODO improve the error message
      console.log(e);
      Swal.fire('Error Deleting Event', e.message, 'error');
    }

  }

  return {
    /* Props */
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    /* Methods */
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents
  }
}
