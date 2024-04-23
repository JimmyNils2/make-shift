import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm, useAuthStore } from '../../hooks';
import '../../styles/LoginPage.css';

const loginFormFields = {
  loginUsername: '',
  loginPassword: ''
}

const registerFormFields = {
  registerUsername: '',
  registerPassword: '',
  registerPassword2: ''
}

export const LoginPage = () => {

  const {loginUsername, loginPassword, onInputChange:onLoginInputChange } = useForm(loginFormFields);
  const {registerUsername, registerPassword, registerPassword2, onInputChange:onRegisterInputChange} = useForm(registerFormFields);
  const { startLogin, startRegister, errorMessage } = useAuthStore();
  
  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({username: loginUsername, password: loginPassword});
  }

  const registerSubmit = (event) => {
    event.preventDefault();

    if(registerPassword !== registerPassword2){
      Swal.fire('Creation account failed', 'Please make sure your passwords match')
      return;
    }
    startRegister({username: registerUsername, password: registerPassword});
  }

  useEffect(() => {
    if(errorMessage !== undefined){
      Swal.fire('Authentication Error', errorMessage, 'error');
    }
  }, [errorMessage])
  

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="username"
                name='loginUsername'
                value={loginUsername}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name='registerUsername'
                value={registerUsername}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repeat password"
                name='registerPassword2'
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Create account" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
