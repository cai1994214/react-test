import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import "./SideMenu.css";
const { Sider } = Layout;
const { SubMenu } = Menu;
import { withRouter } from "react-router-dom";
import { UserOutlined ,ClusterOutlined, LineChartOutlined, HighlightOutlined, SafetyOutlined, ReadOutlined, NotificationOutlined } from "@ant-design/icons";
import { connect } from 'react-redux'
import axios from "axios";

function SideMenu(props) {
	const [menu, setMenu] = useState([]);
	const { role: { rights } } = JSON.parse(localStorage.getItem("token")); //当前用户的路有权限
	const selectKeys = [props.location.pathname]; //选中地址
	const openKeys = ["/" + props.location.pathname.split("/")[1]];
	useEffect(() => {
		axios.get("/rights?_embed=children").then((res) => {
			let menuArr = [...res.data];
			setMenu(menuArr);
		});
	}, []);

	const iconList = {
		"/home": <LineChartOutlined />,
		"/user-manage": <UserOutlined />,
		"/right-manage": <HighlightOutlined />,
		"/news-manage": <SafetyOutlined />,
		"/audit-manage": <ReadOutlined />,
		"/publish-manage": <NotificationOutlined />,
		"/user-manage/add": <UserOutlined />,
		"/user-manage/delete": <UserOutlined />,
	};
	const renderMenu = (menuList) => {
		return menuList.map((item) => {
			if (item.children?.length > 0 && checkPagePermission(item)) {
				return (
					<SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
						{renderMenu(item.children)}
					</SubMenu>
				);
			}
			return (
				checkPagePermission(item) && (
					<Menu.Item
						key={item.key}
						icon={iconList[item.key]}
						onClick={() => {
							props.history.push(item.key);
						}}
					>
						{item.title}
					</Menu.Item>
				)
			);
		});
	};

	const checkPagePermission = (item) => {
		return item.pagepermisson === 1 && rights.includes(item.key);//路由是否配置权限并且当前用户存在该路由权限
	};

	return (
		<Sider trigger={null} collapsible collapsed={props.isCollapsed}>
			<div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
				{
					props.isCollapsed ? (
						<div className="logos"><ClusterOutlined /></div>
					) : (
						<div className="logo">全球新闻发布管理系统</div>
					)
				}
				
				<div style={{ flex: 1, overflow: "auto" }}>
					<Menu
						theme="dark"
						mode="inline"
						selectedKeys={selectKeys}
						defaultOpenKeys={openKeys}
					>
						{renderMenu(menu)}
					</Menu>
				</div>
			</div>
		</Sider>
	);
}

const mapStateToProps = ({ CollApsedReducer:{isCollapsed}}) => ({ isCollapsed });//解构出来isCollapsed

export default connect(mapStateToProps)(withRouter(SideMenu));
