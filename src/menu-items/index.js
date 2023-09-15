// import dashboard from './dashboard';
// import pages from './pages';
// import utilities from './utilities';
// import other from './other';
import users from './users';
import Inventario from './Inventario';
import planeacion from './planeacion';
//redux imports

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  adminItems: [users, Inventario, planeacion],
  userItems: [Inventario, planeacion]
};

export default menuItems;
