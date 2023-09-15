// auth requests
const PROD = process.env.REACT_APP_PROD_API;

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
