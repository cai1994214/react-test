import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, } from "antd";
import axios from "axios";
import {
	DeleteOutlined,
	EditOutlined,
    ExclamationCircleOutlined,
    UploadOutlined
} from "@ant-design/icons";
const { confirm } = Modal;
export default function NewsDraft() {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { username } = JSON.parse(localStorage.getItem('token'));
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			render: (text) => <b>{text}</b>,
		},
		{
			title: "新闻标题",
			dataIndex: "title",
        },
        {
			title: "作者",
			dataIndex: "author",
        },
        {
			title: "新闻分类",
            dataIndex: "category",
            render: (category) => category.value
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
                            setIsModalVisible(true)
                        }}
					/>
                    <Button
						type="primary"
						shape="circle"
						icon={< UploadOutlined/>}
						onClick={() => {
                            setIsModalVisible(true)
                        }}
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
                deleteMethod(row)
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

	const handleOk = () => {
        
		
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {//获取权限列表
	
	}, []);

	useEffect(() => {//拿到所有权限树结构
		axios.get(`/news?author=${username}&auditState=0&_expand=category`).then((res) => {
            console.log(res.data);
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
			<Modal
				title="详情信息"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>

			</Modal>
		</div>
	);
}
