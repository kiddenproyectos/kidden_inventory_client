// auth requests
const PROD = process.env.REACT_APP_PROD_API;

// sign up
export const httpPostNewUser = async (data) => {
  return await fetch(`${PROD}/auth:signUp`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

// sign In
export const httpSignInUser = async (data) => {
  const response = await fetch(`${PROD}/auth:signIn`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};
