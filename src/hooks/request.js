// auth requests
const PROD = process.env.REACT_APP_PROD_API;

export const httpGetAllUsers = async () => {
  const response = await fetch(`${PROD}/administration/users`);
  return await response.json();
};

// create user
export const httpPostNewUser = async (data) => {
  return await fetch(`${PROD}/administration/user`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

//  login user
export const httpSignInUser = async (data) => {
  const response = await fetch(`${PROD}/auth/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const httpGetNewPasswordForUser = async () => {
  const response = await fetch(`${PROD}/administration/user/password`);
  return await response.json();
};
