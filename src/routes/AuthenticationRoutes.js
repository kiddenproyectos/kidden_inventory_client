import PropTypes from 'prop-types';
import { lazy } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

// Componente de verificación de autenticación
const AuthGuard = ({ children }) => {
  const token = Cookies.get('userToken');

  // Verifica si el token existe  y solo te deja acceder a la ruta raiz para evitar hacer doble login etc (caso poco comun)
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: (
        <AuthGuard>
          <AuthLogin3 />
        </AuthGuard>
      )
    },
    {
      path: '/register',
      element: (
        <AuthGuard>
          <AuthRegister3 />
        </AuthGuard>
      )
    }
  ]
};

export default AuthenticationRoutes;
