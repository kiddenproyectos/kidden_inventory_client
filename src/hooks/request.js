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

export const httpUploadCsv = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${PROD}/planeacion/archivo`, {
    method: 'post',
    body: formData
  });

  return await response.json();
};

// get all products in storage

export const httpGetAllProducts = async () => {
  const response = await fetch(`${PROD}/inventario/productos`);
  return await response.json();
};

// create product
export const httpPostNewProduct = async (data) => {
  const response = await fetch(`${PROD}/inventario/nuevo-producto`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const res = await response.json();
  return res;
};
