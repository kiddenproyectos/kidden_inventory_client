// assets

const Emoji = () => {
  return <div style={{ fontSize: '18px' }}>📦</div>;
};
const EmojiTodos = () => {
  return <div style={{ fontSize: '18px' }}>📊</div>;
};
// constant
const icons = { Emoji, EmojiTodos };
// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const Inventario = {
  id: 'inventario-menu',
  type: 'group',
  children: [
    {
      id: 'inventario-item',
      title: 'Inventario por mes',
      type: 'item',
      url: '/inventario',
      icon: icons.Emoji,
      breadcrumbs: false
    },
    {
      id: 'inventario-todos-item',
      title: 'Todos los artículos',
      type: 'item',
      url: '/articulos',
      icon: icons.EmojiTodos,
      breadcrumbs: false
    }
  ]
};

export default Inventario;
