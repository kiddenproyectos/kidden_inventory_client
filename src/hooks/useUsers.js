import { httpPostNewUser, httpSignInUser } from './request';
import Cookies from 'js-cookie';

const useUsers = () => {
  const signUpUser = async ({ email, password, confirm_password }) => {
    return await httpPostNewUser({ email, password, confirm_password });
  };

  const signInUser = async ({ email, password }) => {
    try {
      const response = await httpSignInUser({ email, password });
      // get user Token
      const userToken = response?.data?.token;
      // store Cookie
      Cookies.set('userToken', userToken, { expires: 7 });
      return userToken;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  return [{ signUpUser, signInUser }];
};

export default useUsers;
