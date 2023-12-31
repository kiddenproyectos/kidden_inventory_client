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
const UsersPage = Loadable(lazy(() => import('views/users')));
const HomePage = Loadable(lazy(() => import('views/home')));
const PlaneacionPage = Loadable(lazy(() => import('views/planeacion')));
const InventroyYearPage = Loadable(lazy(() => import('views/inventario')));
const ArticlePage = Loadable(lazy(() => import('views/inventario/EntradasSalidas')));
const ProductsPage = Loadable(lazy(() => import('views/inventario/Products')));
const PrintMaterialListPage = Loadable(lazy(() => import('views/inventario/PrintMaterialList')));
const PrintMaterialListForInventory = Loadable(lazy(() => import('views/inventario/ListaDeInventario')));
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
          element: <HomePage />
        },
        {
          path: '/usuarios',
          element: <UsersPage />
        },
        {
          path: '/planeacion',
          element: <PlaneacionPage />
        },
        {
          path: '/inventario',
          element: <InventroyYearPage />
        },
        // Agrega una ruta dinámica para el inventario por año y mes
        // {
        //   path: '/inventario/:year/:month',
        //   element: <InventroyYearPage />
        // },
        {
          path: '/articulo/:nombre',
          element: <ArticlePage />
        },
        {
          path: '/articulos',
          element: <ProductsPage />
        },
        {
          path: '/imprimir-lista',
          element: <PrintMaterialListPage />
        },
        {
          path: '/imprimir-lista-inventario',
          element: <PrintMaterialListForInventory />
        }
      ]
    }
  ]
};

export default MainRoutes;
