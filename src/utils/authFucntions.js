import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export const checkAuth = () => {
  return (dispatch) => {
    const token = Cookies.get('userToken'); // Lee el token de la cookie
    if (token) {
      const decodedToken = jwtDecode(token);
      dispatch({ type: 'LOGIN', user: decodedToken }); // update user
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    // Eliminar el token de las cookies
    Cookies.remove('token');

    // Despachar la acción de LOGOUT para actualizar el estado
    dispatch({ type: 'LOGOUT' });
  };
};
