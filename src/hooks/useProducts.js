import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { httpGetAllProducts, httpPostNewProduct } from './request';

const useProducts = () => {
  const reduxProducts = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const populateReduxProducts = (data) => {
    return (dispatch) => {
      dispatch({ type: 'SET_PRODUCTS', products: data }); // update user
    };
  };

  const getProducts = useCallback(async () => {
    try {
      const data = await httpGetAllProducts();
      dispatch(populateReduxProducts(data)); // Actualiza el estado de Redux
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }, [dispatch]);

  const addProduct = useCallback(
    async (newProductData) => {
      try {
        // Realizar la solicitud POST para agregar el nuevo producto
        const response = await httpPostNewProduct(newProductData);
        if (response.productoNuevo) {
          // Actualizar el estado de Redux con los nuevos productos
          dispatch(populateReduxProducts([...reduxProducts.products, response.productoNuevo]));
        } else {
          console.error('Error al agregar el producto:', response);
        }
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    },
    [dispatch, reduxProducts]
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return { productos: reduxProducts, addProduct };
};

export default useProducts;
