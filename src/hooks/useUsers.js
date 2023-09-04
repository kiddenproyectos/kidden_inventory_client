import { httpPostNewUser } from './request';

const useUsers = () => {
  const signUpUser = async ({ email, password, confirm_password }) => {
    return await httpPostNewUser({ email, password, confirm_password });
  };

  return [signUpUser];
};

export default useUsers;
