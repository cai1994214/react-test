
import React from 'react'
import SideMenu from '../../components/sandBox/sidemenu/SideMenu.js'
import TopHeader from '../../components/sandBox/TopHeader'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NoPermission from './nopermission/NoPermission'
import './NewsSandBox.scss'

import { Layout } from 'antd'
const { Content } = Layout;
export default function NewsSandBox(props) {
    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: 'auto'
                    }}
                >
                    <Switch>
                        <Route path="/home" component={Home} ></Route>
                        <Route path="/user-manage/list" component={UserList}></Route>
                        <Route path="/right-manage/role/list" component={RoleList}></Route>
                        <Route path="/right-manage/right/list" component={RightList}></Route>

                        {/* Redirect 重定向  exact精确匹配 *404和重定向搭配使用 */}
                        <Redirect from="/" to="/home" exact></Redirect>
                        <Route path="*" component={NoPermission}></Route>

                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}
