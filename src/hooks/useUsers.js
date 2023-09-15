import { useState, useEffect, useCallback } from 'react';
import { httpPostNewUser, httpSignInUser, httpGetAllUsers, httpGetNewPasswordForUser } from './request';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useUsers = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const data = await httpGetAllUsers();
    setUsers(data);
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const addUser = useCallback(
    async (newUserData) => {
      try {
        // Realizar la solicitud POST para agregar el nuevo usuario
        const response = await httpPostNewUser(newUserData);
        if (response.ok) {
          // Si la solicitud fue exitosa, actualizar la lista de usuarios
          getUsers();
        } else {
          console.error('Error al agregar el usuario:', response);
        }
      } catch (error) {
        console.error('Error al agregar el usuario:', error);
      }
    },
    [getUsers]
  );
  const getPassword = useCallback(async () => {
    return httpGetNewPasswordForUser();
  }, []);

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

  return [{ users, getPassword, addUser, signInUser, loginError }];
};

export default useUsers;
