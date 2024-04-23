import { useCalendarStore, useUiStore } from '../../hooks';
import '../../styles/FloatingButton.css';

export const FloatingDeleteButton = () => {

  const {startDeleteEvent, hasEventSelected} = useCalendarStore();
  const {isDateModalOpen} = useUiStore();
  const handleClickButton = () => {
    startDeleteEvent();
  }

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleClickButton}
      style={{display: hasEventSelected && !isDateModalOpen ? '' : 'none'}}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
