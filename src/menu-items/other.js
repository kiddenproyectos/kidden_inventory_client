// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

const Emoji = () => {
  return <div style={{ fontSize: '18px' }}>📅</div>;
};
// constant
const icons = { IconBrandChrome, IconHelp, Emoji };
// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Calendario',
      type: 'item',
      url: '/sample-page',
      icon: icons.Emoji,
      breadcrumbs: false
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
