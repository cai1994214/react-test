import React,{ useState } from 'react'
import { Layout , Dropdown, Menu, Avatar} from 'antd';
const { Header} = Layout;
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
  } from '@ant-design/icons';
export default function TopHeader() {
    const [collapsed , setCollapsed ] = useState(false)
    
    function toggle () {
        setCollapsed(!collapsed)
    }
    const menu = (
        <Menu>
          <Menu.Item key={1}>
              超级管理员
          </Menu.Item>
          <Menu.Item key={4} danger>退出</Menu.Item>
        </Menu>
      )

    return (
        <div>
             <Header className="site-layout-background"  style={{ padding: 0 }}>
                {collapsed ? <MenuUnfoldOutlined onClick={toggle} /> : <MenuFoldOutlined onClick={toggle} />}
                <div style={{float: 'right'}}>
                    <span>欢迎admin回来</span>
                    <Dropdown overlay={menu}>
                        <Avatar size="large" icon={<UserOutlined/>}></Avatar>
                    </Dropdown>,
                </div>
            </Header>
        </div>
    )
}
