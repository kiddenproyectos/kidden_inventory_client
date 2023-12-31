// assets

const Emoji = () => {
  return <div style={{ fontSize: '18px' }}>📦</div>;
};
const EmojiTodos = () => {
  return <div style={{ fontSize: '18px' }}>📊</div>;
};
const EmojiListas = () => {
  return <div style={{ fontSize: '18px' }}>🖨</div>;
};
const EmojiListasInv = () => {
  return <div style={{ fontSize: '18px' }}>📌</div>;
};
// constant
const icons = { Emoji, EmojiTodos, EmojiListas, EmojiListasInv };
// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const Inventario = {
  id: 'inventario-menu',
  type: 'group',
  children: [
    {
      id: 'inventario-item',
      title: 'Inventario',
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
    },
    {
      id: 'material-list-item',
      title: 'Imprimir lista de material por comprar',
      type: 'item',
      url: '/imprimir-lista',
      icon: icons.EmojiListas,
      breadcrumbs: false
    },
    {
      id: 'material-list-item-inventario',
      title: 'Imprimir lista de inventario',
      type: 'item',
      url: '/imprimir-lista-inventario',
      icon: icons.EmojiListasInv,
      breadcrumbs: false
    }
  ]
};

export default Inventario;
