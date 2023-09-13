// assets

const Emoji = () => {
  return <div style={{ fontSize: '18px' }}>📦</div>;
};
// constant
const icons = { Emoji };
// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const Inventario = {
  id: 'inventario-menu',
  type: 'group',
  children: [
    {
      id: 'inventario-item',
      title: 'Inventario',
      type: 'item',
      url: '/invnetario',
      icon: icons.Emoji,
      breadcrumbs: false
    }
  ]
};

export default Inventario;
