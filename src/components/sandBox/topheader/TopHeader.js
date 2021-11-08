import React from "react";
import { Layout, Dropdown, Menu, Avatar } from "antd";
import { connect } from 'react-redux'
const { Header } = Layout;
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
function TopHeader(props) {

	const {role:{roleName}, username} = JSON.parse(localStorage.getItem('token'));
	
	function toggle() {
		//改变state的isCollapsed的状态
		props.changCollapsed();//自动父组件dispatch 这个action
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
				{props.isCollapsed ? (
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
//  connect的用法 connect(
	//mapStateToProps
	//mapDispatchToProps
//  )(被包装的组件)

const mapStateToProps = (state) => {//创建一个对象
	return {
		isCollapsed: state.CollApsedReducer.isCollapsed
	}
}

const mapDispatchToProps = {
	changCollapsed() {
		return {
			type: "change_collapsed",
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader))
