import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, Tree } from "antd";
import axios from "axios";
import {
	DeleteOutlined,
	UnorderedListOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;
export default function RoleList() {
	const [dataSource, setDataSource] = useState([]);
	const [rightList, setRightList] = useState([]);
	const [currentRights, setCurrentRights] = useState([]);
	const [currentId, setCurrentId] = useState(0);
	const refSource = useRef(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			render: (text) => <b>{text}</b>,
		},
		{
			title: "角色名称",
			dataIndex: "roleName",
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
						type="primary"
						shape="circle"
						icon={<UnorderedListOutlined />}
						onClick={() => {
                            setIsModalVisible(true)
                            setCurrentRights(row.rights)
                            setCurrentId(row.id)
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
				deleteMethod(row);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const deleteMethod = (row) => {
		setDataSource(dataSource.filter((item) => item.id !== row.id));
		axios.delete(`/roles/${row.id}`);
	};

	const handleOk = () => {
        console.log(currentRights);
        setDataSource(dataSource.map(item=>{
            if(item.id === currentId) {
                return {
                    ...item,
                    rights: currentRights
                }
            }
            return item
        }))
        axios.patch(`/roles/${currentId}`,{
            rights: currentRights
        }).then(res=>{
            setIsModalVisible(false);
        })
		
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

    const onCheck = (val) => {
        setCurrentRights(val.checked);
    }
	useEffect(() => {//获取权限列表
		axios.get("/roles").then((res) => {
			refSource.current = [...res.data];
			setDataSource(refSource.current);
		});
	}, []);

	useEffect(() => {//拿到所有权限树结构
		axios.get("/rights?_embed=children").then((res) => {
			// console.log(res.data);
			setRightList([...res.data]);
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
				title="权限树"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Tree
					checkable
					checkedKeys={currentRights}
					onCheck={onCheck}
                    treeData={rightList}
                    checkStrictly={true}
				/>
			</Modal>
		</div>
	);
}
