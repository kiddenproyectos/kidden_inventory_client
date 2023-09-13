// assets

const Emoji = () => {
  return <div style={{ fontSize: '18px' }}>👩‍⚕️</div>;
};
// constant
const icons = { Emoji };
// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const users = {
  id: 'users-menu',
  type: 'group',
  children: [
    {
      id: 'users-item',
      title: 'Usuarios',
      type: 'item',
      url: '/usuarios',
      icon: icons.Emoji,
      breadcrumbs: false
    }
  ]
};

export default users;
