import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Modal, Switch, } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import UserForm from '../../../components/user-manage/UserForm.js'
const { confirm } = Modal;
export default function UserList() {
	const [dataSource, setDataSource] = useState([]);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [roleList, setRoleList] = useState([]);
    const [regions, setRegions] = useState([]);
    const addForm = useRef(null);
    const updateForm = useRef(null);
    
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
				return <Switch checked={roleState} disabled={item.default} onChange={()=>handleChange(item)}></Switch>;
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
                        onClick={()=>handleUpdate(row)}
						icon={<EditOutlined />}
					/>
				</div>
			),
		},
	];

    const handleChange = (item) => {
        item.roleState = !item.roleState;
        setDataSource([...dataSource]);
        axios.patch(`http://localhost:8000/users/${item.id}`,{
            roleState: item.roleState
        })
    }

    const handleUpdate = (row) => {
        // setRowObj({...row})
        setIsUpdateVisible(true);
        setTimeout(()=>{
            updateForm.current.setFieldsValue(row)
        },0)
        
    }

    const updateFormOk = () => {
        // updateForm.current.validateFields()
        // .then((values) => {
        //     axios.post('http://localhost:8000/users',{
        //         ...values,
        //         roleState: true,
        //         default: false,
        //     }).then(res=>{
        //         setIsAddVisible(false);
        //         updateForm.current.resetFields();//清空
        //         setDataSource([...dataSource, {
        //             ...res.data,
        //             role: roleList.filter(e=>e.id === values.roleId)[0]
        //         }])
        //     })
        // })
        // .catch((info) => {
        //     console.log("Validate Failed:", info);
        // });
    }

    const addFormOk = () => {
        //通过useRef 父组件传值 子组件forwordRef高阶组件 接收父组件的ref
        addForm.current.validateFields()
        .then((values) => {
            axios.post('http://localhost:8000/users',{
                ...values,
                roleState: true,
                default: false,
            }).then(res=>{
                setIsAddVisible(false);
                addForm.current.resetFields();//清空
                setDataSource([...dataSource, {
                    ...res.data,
                    role: roleList.filter(e=>e.id === values.roleId)[0]
                }])
            })
        })
        .catch((info) => {
            console.log("Validate Failed:", info);
        });
    }
    
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
		axios.delete(`http://localhost:8000/users/${row.id}`);
    };
    
	useEffect(() => {
		axios.get("http://localhost:8000/users?_expand=role").then((res) => {
			console.log(res.data);
			setDataSource([...res.data]);
		});
	}, []);

    useEffect(() => {
		axios.get("http://localhost:8000/regions").then((res) => {
			setRegions([...res.data]);
		});
    }, []);
    
    useEffect(() => {
		axios.get("http://localhost:8000/roles").then((res) => {
			setRoleList([...res.data]);
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
				onOk={() => addFormOk()}
			>
				<UserForm ref={addForm} roleList={roleList} regions={regions}></UserForm>
			</Modal>
            <Modal
				visible={isUpdateVisible}
				title="编辑用户"
				okText="更新"
				cancelText="取消"
				onCancel={()=>setIsUpdateVisible(false)}
				onOk={() => updateFormOk()}
			>
				<UserForm ref={updateForm} roleList={roleList} regions={regions} ></UserForm>
			</Modal>
		</div>
	);
}
