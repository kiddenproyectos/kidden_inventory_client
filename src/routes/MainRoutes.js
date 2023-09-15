import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// Componente de verificación de autenticación
const AuthGuard = ({ children }) => {
  const token = Cookies.get('userToken');

  // Verifica si el token no existe en las cookies
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si el token existe, permite el acceso a las rutas protegidas
  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <Outlet />
        </AuthGuard>
      ),
      children: [
        {
          path: '/',
          element: <SamplePage />
        },
        {
          path: 'sample-page',
          element: <SamplePage />
        }
      ]
    }
  ]
};

export default MainRoutes;
