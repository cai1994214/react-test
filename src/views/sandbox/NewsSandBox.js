
import React from 'react'
import SideMenu from '../../components/sandBox/sidemenu/SideMenu.js'
import TopHeader from '../../components/sandBox/topheader/TopHeader'
import NewsRouter  from "../../components/sandBox/newsrouter/NewsRouter.js";
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
                    {/* 路由組件 */}
                   <NewsRouter></NewsRouter>
                </Content>
            </Layout>
        </Layout>
    )
}
