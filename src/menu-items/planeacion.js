// assets

const Emoji = () => {
  return <div style={{ fontSize: '18px' }}>📅</div>;
};
// constant
const icons = { Emoji };

const planeacion = {
  id: 'planeacion-menu',
  type: 'group',
  children: [
    {
      id: 'planeacion-item',
      title: 'Planeacion',
      type: 'item',
      url: '/planeacion',
      icon: icons.Emoji,
      breadcrumbs: false
    }
  ]
};

export default planeacion;
