const initialState = {
  products: [],
  id_rows_array: []
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.products };
    case 'SET_IDS_ROWS':
      return { ...state, id_rows_array: action.id_rows_array };
    default:
      return state;
  }
};

export default productReducer;
