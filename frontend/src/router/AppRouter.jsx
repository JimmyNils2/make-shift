import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage, LoadingSpinner } from '../calendar';
import { useAuthStore } from '../hooks';

/**
 * Handle the public and private routes
 * @returns A page
 */
export const AppRouter = () => {

  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  }, []);
  // Show the loading spinner
  if (status === 'checking') {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      { // Navigate to the login page
        (status === 'not-authenticated')
          ? (
            <>
              <Route path='/auth/*' element={<LoginPage />} />
              <Route path='/*' element={<Navigate to='/auth/login' />} />
            </>
          )
          : ( // Navigate to the Calendar page
            <>
              <Route path='/' element={<CalendarPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </>
          )
      }
    </Routes>
  )
}
