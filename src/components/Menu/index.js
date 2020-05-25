import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
import { Link } from 'umi';

function SlideMenu(props) {
  const { menu } = props;

  function getNavMenuItems(menusData) {
    if (!menusData) {
      return [];
    }
    return menusData
      .map(item => {
        return getSubMenuOrItem(item);
      })
      .filter(item => item);
  }

  function getSubMenuOrItem(item) {
    if (item.subs && item.subs.some(child => child.name)) {
      const childrenItems = getNavMenuItems(item.subs);
      // 当无子菜单时就不展示菜单

      if (childrenItems && childrenItems.length > 0) {
        // console.log(getIcon(item.iconFileUrl, item.url),3)
        return (
          <SubMenu
            icon={
              <span className="anticon">
                <img src={item.icon} width="22" />
              </span>
            }
            title={item.name}
            key={item.url || String(item.id)}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return (
        <Menu.Item key={item.url || String(item.id)}>
          {getMenuItemPath(item)}
        </Menu.Item>
      );
    }
  }

  function getMenuItemPath(item) {
    const itemPath = conversionPath(item.url);
    const { target, name } = item;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === props.location.pathname}
      >
        <span>{name}</span>
      </Link>
    );
  }
  // 转化路径
  function conversionPath(path) {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  }
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
      inlineCollapsed={true}
    >
      {getNavMenuItems(menu)}
    </Menu>
  );
}

export default SlideMenu;
