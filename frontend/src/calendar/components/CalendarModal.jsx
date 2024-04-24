import { addHours, differenceInSeconds } from 'date-fns';
import { useState, useMemo, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/CalendarModal.css';
import { useCalendarStore, useUiStore } from '../../hooks';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

const initialForm = {
  title: '',
  description: '',
  start: new Date(),
  end: addHours(new Date(), .5)
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(initialForm);
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const {activeEvent, startSavingEvent} = useCalendarStore();

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return (formValues.title.length > 0)
      ? ''
      : 'is-invalid'
  }, [formValues.title, formSubmitted]);


  useEffect(() => {
    if(activeEvent !== null) setFormValues({...activeEvent})
  }, [activeEvent])

  const onCloseModal = () => {
    console.log('Closing modal');
    closeDateModal();
  }

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Invalid dates', 'Check the dates entered.', 'error');
      console.log('Invalid dates');
      return;
    }
    if (formValues.description.length <= 0) {
      Swal.fire('Invalid dates', 'Check the dates entered.', 'error');
      return;
    }
    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-background"
      closeTimeoutMS={200}
    >
      <h1> New Event </h1>
      <form className="container" onSubmit={onSubmit}>
        <hr />
        <div className="form-group mb-2">
          <label>Title</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
            required
          />
          <small id="emailHelp" className="form-text text-muted">Description</small>
        </div>
        <div className={`form-group mb-2`}>
          <textarea
            type="text"
            className="form-control"
            placeholder="Add a description"
            rows="5"
            name="description"
            value={formValues.description}
            onChange={onInputChanged}
            required
          ></textarea>
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group mb-2">
          <label>Start Date</label>
          <div className="customDatePickerWidth">
            <DatePicker
              selected={formValues.start}
              className="form-control"
              onChange={(event) => onDateChanged(event, "start")}
              dateFormat="Pp"
              showTimeSelect
            />
          </div>
        </div>
        <div className="form-group mb-2">
          <label>End Date</label>
          <div className="customDatePickerWidth">
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              className="form-control"
              onChange={(event) => onDateChanged(event, "end")}
              dateFormat="Pp"
              showTimeSelect
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary btn-block mt-2"
        >
          <i className="far fa-save mx-2"></i>
          <span>Save</span>
        </button>
      </form>
    </Modal>
  )
}
