//import { Spinner } from 'react-bootstrap';
import '../../styles/LoadingSpinner.css';
export const LoadingSpinner = () => {
  return (
    // <div className="d-flex justify-content-center align-items-center min-vh-100">
    //   <Spinner animation="border" role="status" style={{ color: '#347CF7' }} />
    // </div>
    <div className="loading-container d-flex justify-content-center align-items-center min-vh-100">
        <div className="loader"></div>
    </div>
  )
}
