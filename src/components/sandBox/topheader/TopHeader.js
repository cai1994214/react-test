import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Menu, Avatar } from "antd";
const { Header } = Layout;
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
function TopHeader(props) {
	const [collapsed, setCollapsed] = useState(false);

	const {role:{roleName}, username} = JSON.parse(localStorage.getItem('token'));
	
	function toggle() {
		setCollapsed(!collapsed);
	}
	
	const menu = (
		<Menu>
			<Menu.Item key={1}>{roleName}</Menu.Item>
			<Menu.Item key={4} danger onClick={()=>{
				localStorage.removeItem('token');
				props.history.replace('/login')
			}}>
				退出
			</Menu.Item>
		</Menu>
	);

	return (
		<div>
			<Header className="site-layout-background">
				{collapsed ? (
					<MenuUnfoldOutlined onClick={toggle} />
				) : (
					<MenuFoldOutlined onClick={toggle}/>
				)}
				<div style={{ float: "right" }}>
					<span>欢迎<span style={{color: '#1890ff'}}>{username}</span>回来</span>
					<Dropdown overlay={menu}>
						<Avatar size="large" icon={<UserOutlined />}></Avatar>
					</Dropdown>
				</div>
			</Header>
		</div>
	);
}

export default withRouter(TopHeader)
