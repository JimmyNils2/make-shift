import { useDispatch, useSelector } from 'react-redux';
import { onOpenDateModal, onCloseDateModal } from '../store';

/**
 * Custom hook to dispatch methods of uiSlice  
 * @returns A property and  two methods
 */
export const useUiStore = () => {

  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector(state => state.ui);

  // Dispatch openDateModal
  const openDateModal = () => {
    dispatch(onOpenDateModal())
  }
  // Dispatch closeModal
  const closeDateModal = () => {
    dispatch(onCloseDateModal())
  }
  
  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal
  }
}