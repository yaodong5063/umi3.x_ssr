import React, { PureComponent } from 'react';
import { Layout, Breadcrumb, Card } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { includeUrls } from '@/utils/singlePageList';
import { connect } from 'umi';
import SlideMenu from '@/components/Menu';

import styles from './index.less';

const { Header, Footer, Sider, Content } = Layout;

@connect(({ Test, loading }) => ({
  Test,
  loading,
}))
class BasicLayout extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false,
    menu: undefined,
  };

  componentDidMount() {
    this.info();
  }

  componentDidUpdate(prevProps, prevState) {
    const { menu } = this.state;
    const { location } = this.props;
    if (
      prevProps.location.pathname !== location.pathname &&
      menu === undefined
    ) {
      this.autoMenu();
    }
  }

  info = () => {
    this.autoMenu();
  };

  autoMenu = () => {
    const { dispatch, location } = this.props;
    if (includeUrls.includes(location.pathname)) return;
    dispatch({
      type: 'Test/menu',
    }).then(res => {
      const { code, data } = res;
      if (!code) {
        this.setState({
          menu: data,
        });
      }
    });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, location } = this.props;
    const { collapsed, menu } = this.state;
    if (includeUrls.includes(location.pathname)) {
      //单页面，无左边
      return <>{children}</>;
    }

    return (
      <Layout>
        <Layout>
          <Sider
            width={200}
            className="site-layout-background"
            collapsed={collapsed}
          >
            <div className={styles.menuHeader}>这里是头部LOGO</div>
            <SlideMenu menu={menu} location={location} />
          </Sider>
          <Layout>
            <Header className={styles.layoutHead + ' flexBox'}>
              <div className={styles.layoutHeadLeft}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: styles.trigger,
                    onClick: this.toggle,
                  },
                )}
              </div>
              <div className={styles.layoutHeadRig}></div>
            </Header>
            <Card>
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
            </Card>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Card bordered={false}>{children}</Card>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default BasicLayout;
