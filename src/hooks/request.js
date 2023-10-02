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

export const httpGetAllProducts = async (month) => {
  const response = await fetch(`${PROD}/inventario/productos/${month}`);
  return await response.json();
};

// create product
export const httpPostNewProduct = async (data) => {
  const formData = new FormData();

  // se tiene que usar formdata por que la iamgen es un archivo
  // Agrega los datos al FormData
  formData.append('nombre', data.nombre);
  formData.append('presentacion', data.presentacion);
  formData.append('marca', data.marca);
  formData.append('modelo', data.modelo);
  formData.append('estado', data.estado);
  formData.append('stock', data.stock);
  formData.append('lugar', data.lugar);

  // Agrega la imagen al FormData
  formData.append('imagen', data.imagen);

  const response = await fetch(`${PROD}/inventario/nuevo-producto`, {
    method: 'post',
    body: formData
  });

  const res = await response.json();
  return res;
};
// delete products
export const httpDeelteProducts = async (data) => {
  const response = await fetch(`${PROD}/inventario/eliminar-productos`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids: data })
  });
  const res = await response.json();
  return res;
};
