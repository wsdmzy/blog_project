import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './index.css'
import { Route } from 'react-router-dom'
import AddArticle from '../addArticle/index'
import articleList from '../articleList/index'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



function Index(props) {
  
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const handleClickArticle = e => {
    // console.log(e)
    if (e.key === 'addArticle') {
      props.history.push('/index/add')
    } else {
      props.history.push('/index/list')
    }
  }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <SubMenu key="sub1" 
            icon={<UserOutlined />} 
            title="文章管理"
            onClick={handleClickArticle}
            >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="6" icon={<FileOutlined />} > 留言管理</Menu.Item>
        </Menu>
      </Sider>
      <Layout >
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div  style={{  background: '#fff',padding: 24, minHeight: 360 }}>
            <Route path="/index"  exact component={AddArticle} />
            <Route path="/index/add" exact  component={AddArticle} />
            <Route path="/index/add/:id"   component={AddArticle} />
            <Route path="/index/list"   component={articleList} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ziogie@</Footer>
      </Layout>
    </Layout>
  );
}


export default Index