import { httpPostNewUser, httpSignInUser } from './request';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const useUsers = () => {
  const navigate = useNavigate();

  const signUpUser = async ({ email, password, confirm_password }) => {
    try {
      const response = await httpPostNewUser({ email, password, confirm_password });
      console.log(response);
      // Verifica el éxito de la creación de usuario según la respuesta (ajusta esto según tu API)
      if (response?.ok) {
        // Redirige al usuario a la ruta deseada después del registro exitoso
        navigate('/login');
      }
      // Puedes agregar manejo de errores aquí si es necesario
      return response;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  };

  const signInUser = async ({ email, password }) => {
    try {
      const response = await httpSignInUser({ email, password });
      // get user Token
      const userToken = response?.data?.token;
      // store Cookie
      Cookies.set('userToken', userToken, { expires: 7 });
      // redirigir al usuario
      navigate('/');

      return userToken;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  return [{ signUpUser, signInUser }];
};

export default useUsers;
