import { useState } from 'react';
import { httpPostNewUser, httpSignInUser } from './request';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useUsers = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();

  const createUser = async ({ nombre, password }) => {
    try {
      const response = await httpPostNewUser({ nombre, password });
      // Puedes agregar manejo de errores aquí si es necesario
      return response;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  };

  const signInUser = async ({ nombre, password }) => {
    const response = await httpSignInUser({ nombre, password });

    if (response?.token) {
      // get user Token
      const userToken = response?.token;
      // store Cookie
      Cookies.set('userToken', userToken, { expires: 30 });
      const decodedToken = jwtDecode(response.token);
      dispatch({ type: 'LOGIN', user: decodedToken });
      navigate('/');
    } else {
      setLoginError(response.error);
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  return [{ createUser, signInUser, loginError }];
};

export default useUsers;
