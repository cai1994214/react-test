import React, { forwardRef, useState, useEffect, useLayoutEffect } from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;
const UserForm = (props, ref) => {
	const [isDisable, setIsDisable] = useState(false);
    const { roleId, region } = JSON.parse(localStorage.getItem('token'));//当前登录用户信息
    const roleObj = {
        '1': 'superadmin',
        '2': 'admin',
        '3': 'editor'
    }
	const changeData = (value) => {
		if (value === 1) {
			ref.current.setFieldsValue({
				region: "",
			});
		}
		setIsDisable(value === 1);
	};

    const checkReginDisabled = (row) => {
        if(props.isUpdate) {//更新状态
            if(roleObj[roleId] === 'superadmin') {
                return false
            }else {
                return true
            }
        }else{//添加状态
            if(roleObj[roleId] === 'superadmin') {
                return false
            }else {
                return row.value !== region
            }
        }
    }

    const checkRoleDisabled = (row) => {
        if(props.isUpdate) {//更新状态
            if(roleObj[roleId] === 'superadmin') {
                return false
            }else {
                return true
            }
        }else{//添加状态
            if(roleObj[roleId] === 'superadmin') {
                return false
            }else {
                return roleObj[row.id] !== 'editor'
            }
        }
    }
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
					<Select placeholder="请选择区域" disabled={isDisable} >
						{props.regions?.map((e) => {
							return (
								<Option key={e.id} value={e.value} disabled={checkReginDisabled(e)}>
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
								<Option key={e.id} value={e.roleType} disabled={checkRoleDisabled(e)}>
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
