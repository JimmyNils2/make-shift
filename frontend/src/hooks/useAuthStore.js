import { useDispatch, useSelector } from 'react-redux';
import { api } from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_NAME, UID } from '../constants';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = () => {

  const { status, errorMessage, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ username, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post('/api/token/', { username, password });
      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);
      localStorage.setItem(USER_NAME, username);
      dispatch(onLogin({ username }));
      startGettingDetails();
    } catch (e) {
      dispatch(onLogout('Invalid credentials'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  }

  const startGettingDetails = async () => {
    try {
      const {data} = await api.get('/api/my-details/');
      localStorage.setItem(UID, data.id);
    } catch (e) {
      console.log(e);
    }
  }

  const startRegister = async ({ username, password }) => {
    dispatch(onChecking());
    try {
      await api.post('/api/user/register/', { username, password });
      const { data } = await api.post('/api/token/', { username, password });
      localStorage.setItem(USER_NAME, username);
      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);
      dispatch(onLogin({ username }));
      startGettingDetails();
    } catch (e) {
      dispatch(onLogout(e.response.data?.username[0]));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  }

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const { data, status } = await api.post("/api/token/refresh/", {
        refresh: refreshToken
      });

      if (status === 200) {
        localStorage.setItem(ACCESS_TOKEN, data.access);
        dispatch(onLogin({ username: localStorage.getItem(USER_NAME) }));
      } else {
        dispatch(onLogout({}));
      }
    } catch (e) {
      dispatch(onLogout({}));
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) return dispatch(onLogout());

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) await refreshToken();
    else dispatch(onLogin({ username: localStorage.getItem(USER_NAME) }));
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  }

  return {
    // Props
    errorMessage,
    status,
    user,

    // Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  }
}
