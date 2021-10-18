import React, { forwardRef, useState, useEffect, useLayoutEffect } from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;
const UserForm = (props, ref) => {
	const [isDisable, setIsDisable] = useState(false);

	const changeData = (value) => {
		if (value === 1) {
			ref.current.setFieldsValue({
				region: "",
			});
		}
		setIsDisable(value === 1);
	};

	useEffect(() => {
			setIsDisable(props.disabled);
    }, [props.disabled]);
    
	return (
		<div>
			<Form ref={ref} layout="vertical">
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
					rules={
						isDisable
							? []
							: [
									{
										required: true,
										message: "请选择角色!",
									},
							  ]
					}
				>
					<Select placeholder="请选择区域" disabled={isDisable}>
						{props.regions?.map((e) => {
							return (
								<Option key={e.id} value={e.value}>
									{e.title}
								</Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item
					name="roleId"
					label="角色"
					rules={[
						{
							required: true,
							message: "请选择角色!",
						},
					]}
				>
					<Select
						placeholder="请选择角色"
						onChange={(value) => {
							changeData(value);
						}}
					>
						{props.roleList?.map((e) => {
							return (
								<Option key={e.id} value={e.roleType}>
									{e.roleName}
								</Option>
							);
						})}
					</Select>
				</Form.Item>
			</Form>
		</div>
	);
};

export default forwardRef(UserForm);
