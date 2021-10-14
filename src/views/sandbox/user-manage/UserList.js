import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Switch, Form, Input, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { confirm } = Modal;
export default function UserList() {
	const [dataSource, setDataSource] = useState([]);
    const [isAddVisible, setIsAddVisible] = useState(false);
	const columns = [
		{
			title: "区域",
			dataIndex: "region",
			render: (region) => <b>{region === "" ? "全球" : region}</b>, 
		},
		{
			title: "角色名称",
			dataIndex: "role",
			render: (role) => <b>{role?.roleName}</b>,
		},
		{
			title: "用户名",
			dataIndex: "username",
		},
		{
			title: "用户状态",
			dataIndex: "roleState",
			render: (roleState, item) => {
				return <Switch checked={roleState} disabled={item.default}></Switch>;
			},
		},
		{
			title: "操作",
			render: (row) => (
				<div>
					<Button
						danger
						shape="circle"
						icon={<DeleteOutlined />}
						disabled={row.default}
						onClick={() => confirmMethod(row)}
					/>
					<Button
						type="primary"
						shape="circle"
						disabled={row.default}
						icon={<EditOutlined />}
					/>
				</div>
			),
		},
	];

	useEffect(() => {
		axios.get("http://localhost:8000/users?_expand=role").then((res) => {
			console.log(res.data);
			setDataSource([...res.data]);
		});
	}, []);

	return (
		<div>
			<Button type="primary" onClick={()=>setIsAddVisible(true)}>添加用户</Button>
			<Table
				dataSource={dataSource}
				columns={columns}
				rowKey={(row) => row.id}
				pagination={{ pageSize: 5 }}
			></Table>
			<Modal
				visible={isAddVisible}
				title="添加用户"
				okText="确定"
				cancelText="取消"
				onCancel={()=>setIsAddVisible(false)}
				onOk={() => {
					form
						.validateFields()
						.then((values) => {
							form.resetFields();
							onCreate(values);
						})
						.catch((info) => {
							console.log("Validate Failed:", info);
						});
				}}
			>
				<Form
					layout="vertical"
				>
					<Form.Item
						name="username"
						label="用户名"
						rules={[
							{
								required: true,
								message: "请输入用户名!",
							},
						]}
					>
						<Input />
					</Form.Item>
                    <Form.Item
						name="password"
						label="密码"
						rules={[
							{
								required: true,
								message: "请输入密码!",
							},
						]}
					>
						<Input />
					</Form.Item>
                    <Form.Item
						name="region"
						label="区域"
					>
						<Select placeholder="请选择">
                            <Option value="china">China</Option>
                            <Option value="usa">U.S.A</Option>
                        </Select>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
