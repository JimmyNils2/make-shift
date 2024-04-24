import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { api } from '../api';
import { UID } from '../constants';
import { dateFormatting } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from '../store';


export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const {events, activeEvent} = useSelector(state => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if(calendarEvent.id) {
        const {data} = await api.put(`/api/events/${activeEvent.id}/`, calendarEvent);
        dispatch(onUpdateEvent({...calendarEvent, id: data.id, createdBy: localStorage.getItem(UID)}));
        return;
      }
      const {user, ...rest} = calendarEvent;
        
      const {data} = await api.post('/api/my-events/', {
        ...rest,
        start: rest.start.toISOString().replace(/\+\d+\:\d+/g, 'Z'),
        end: rest.end.toISOString().replace(/\+\d+\:\d+/g, 'Z')
      });
  
      dispatch(onAddNewEvent({...calendarEvent, id: data.id, createdBy: localStorage.getItem(UID)}));
    } catch (e) {
      console.log(e);
      Swal.fire('Saving Error', e.message, 'error');
    }
  }

  const startLoadingEvents = async () => {
    try {
      const {data} = await api.get('/api/events/');
      const events = dateFormatting(data);
      dispatch(onLoadEvents(events));
    }catch(e){
      console.log('Error trying to retrieve the events');
      console.log(e)
    }
  }

  const startDeleteEvent = async () => {
    console.log(activeEvent);
    try{
      await api.delete(`/api/event/delete/${activeEvent.id}/`);
      dispatch(onDeleteEvent());
    } catch(e){
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
