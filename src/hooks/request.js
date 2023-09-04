// auth requests
const PROD = process.env.REACT_APP_PROD_API;

export const httpPostNewUser = async (data) => {
  return await fetch(`${PROD}/auth:signUp`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};
