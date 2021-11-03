import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, notification } from "antd";
import axios from "axios";
import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	UploadOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;
export default function NewsDraft(props) {
	const [dataSource, setDataSource] = useState([]);
	const { username } = JSON.parse(localStorage.getItem("token"));
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			render: (text) => <b>{text}</b>,
		},
		{
			title: "新闻标题",
			dataIndex: "title",
			render: (title, item) => {
				return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>;
			},
		},
		{
			title: "作者",
			dataIndex: "author",
		},
		{
			title: "新闻分类",
			dataIndex: "category",
			render: (category) => category.value,
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
					<Button
						shape="circle"
						icon={<EditOutlined />}
						onClick={() => {
							props.history.push(`/news-manage/update/${row.id}`);
						}}
					/>
					<Button
						type="primary"
						shape="circle"
						icon={<UploadOutlined />}
						onClick={() => handleCheck(row.id)}
					/>
				</div>
			),
		},
	];

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
		setDataSource(dataSource.filter((item) => item.id !== row.id));
		axios.delete(`/news/${row.id}`);
	};

	const handleCheck = (id) => {
		axios.patch(`/news/${id}`,{
			auditState: 1
		}).then((res) => {
			props.history.push('/audit-manage/list');
			notification.info({
                message: '通知',
                description: `您可以到审核列表查看您的新闻!`,
                placement:'bottomRight'
            })
		});
	};

	useEffect(() => {
		//拿到所有权限树结构
		axios
			.get(`/news?author=${username}&auditState=0&_expand=category`)
			.then((res) => {
				setDataSource([...res.data]);
			});
	}, []);

	return (
		<div>
			<Table
				dataSource={dataSource}
				columns={columns}
				rowKey={(row) => row.id}
				pagination={{ pageSize: 5 }}
			></Table>
		</div>
	);
}
