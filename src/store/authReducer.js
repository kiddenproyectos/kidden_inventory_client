// Define el estado inicial para la autenticación
const initialAuthState = {
  isAuthenticated: false // Puedes ajustar este valor según tus necesidades iniciales
};

// Define el reducer para la autenticación
const authReducer = (state = initialAuthState, action) => {
  // Puedes manejar las acciones relacionadas con la autenticación aquí
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        // user data
        user: action.user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
