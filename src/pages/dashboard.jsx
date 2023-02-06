import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import { menuItems } from '../routes/menuItems';
const { Header, Sider, Content, Footer } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //console.log(JSON.parse(localStorage.getItem('token')))

  return (
    <Layout style={{ height:'100vh'}} >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ background: colorBgContainer }} className="header">
          <div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })}
          </div>
          <div>
            <p>profile</p>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            //minHeight: 280,
            height:'100vh',
            background: colorBgContainer,
          }}
        >
            <Outlet/>
        </Content>
        <Footer
        style={{
          textAlign: 'center',
          background: colorBgContainer,
        }}
      >
        Gigidy ©2023 Created by MTP
      </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;