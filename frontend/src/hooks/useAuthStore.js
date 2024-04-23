import { useDispatch, useSelector } from 'react-redux';
import { api } from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

  const { status, errorMessage, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ username, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post('/api/token/', { username, password });
      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);
      dispatch(onLogin({ username }));
    } catch (e) {
      dispatch(onLogout('Invalid credentials'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  }

  const startRegister = async ({ username, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post('/api/user/register/', {username, password});
      console.log({data});
      dispatch(onLogin({username}));
    }catch(e){
      dispatch(onLogout(e.response.data?.username[0]));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  }

  return {
    // Props
    errorMessage,
    status,
    user,

    // Methods
    startLogin,
    startRegister
  }
}
