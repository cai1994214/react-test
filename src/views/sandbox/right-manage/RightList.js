import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Modal, Popover, Switch } from "antd";
import axios from "axios";
import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;
export default function RightList() {
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8000/rights?_embed=children").then((res) => {
			let arr = setChildrenNull(res.data); //将children为空的置为null
			setDataSource(arr);
		});
	}, []);

	const setChildrenNull = (res) => {
		res.forEach((item) => {
			if (item.children) {
				if (item.children.length === 0) {
					item.children = null;
				} else {
					item.children = setChildrenNull(item.children);
				}
			}
		});
		return res;
	};

	const confirmMethod = (row) => {
		confirm({
			title: "你确定要删除么?",
			icon: <ExclamationCircleOutlined />,
			onOk() {
				deleteMethod(row);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const deleteMethod = (row) => {
		if (row.grade === 1) {
			//如果删除的是第一层
			setDataSource(dataSource.filter((item) => item.id !== row.id));
			axios.delete(`http://localhost:8000/rights/${row.id}`);
		} else {
			let data = dataSource.filter((item) => item.id === row.rightId);
			data[0].children = data[0].children.filter(
				(child) => child.id !== row.id
			); //赋值改变dataSource
			setDataSource([...dataSource]);
			axios.delete(`http://localhost:8000/children/${row.id}`);
		}
	};

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			render: (text) => <b>{text}</b>,
		},
		{
			title: "权限名称",
			dataIndex: "title",
		},
		{
			title: "权限路径",
			dataIndex: "key",
			render: (tag) => (
				<>
					<Tag color="orange" key={tag}>
						{tag}
					</Tag>
				</>
			),
		},
		{
			title: "操作",
			render: (row) => (
				<div>
					<Button
						danger
						shape="circle"
						icon={<DeleteOutlined />}
						onClick={() => confirmMethod(row)}
					/>
					<Popover
						content={
							<div style={{ textAlign: "center" }}>
								<Switch></Switch>
							</div>
						}
						title="Title"
						trigger={!row.pagepermisson ? "" : "click"}
					>
						<Button
							type="primary"
							disabled={!row.pagepermisson}
							shape="circle"
							icon={<EditOutlined />}
						/>
					</Popover>
				</div>
			),
		},
	];

	return (
		<div>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 5 }}
			/>
		</div>
	);
}
