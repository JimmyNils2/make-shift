import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';
import '../../styles/FloatingButton.css';

/**
 * Render a floating button
 * @returns 
 */
export const FloatingAddButton = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  // TODO update this object
  const handleClickButton = () => {
    setActiveEvent({
      title: '',
      description: '',
      user: { name: '', _id: '' },
      start: new Date(),
      end: addHours(new Date(), 2)
    });
    openDateModal();
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={handleClickButton}
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
