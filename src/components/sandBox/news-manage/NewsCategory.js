import React, { useState, useEffect, useRef, useContext } from "react";
import { Table, Input, Button, Popconfirm, Form, message } from "antd";
import axios from "axios";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
const EditableContext = React.createContext(null);
export default function NewsCategory() {
	const [dataSource, setDataSource] = useState([]);
	useEffect(() => {
		axios.get("/categories").then((res) => {
			setDataSource(res.data);
		});
	}, []);

	const EditableRow = ({ index, ...props }) => {
		const [form] = Form.useForm();
		return (
			<Form form={form} component={false}>
				<EditableContext.Provider value={form}>
					<tr {...props} />
				</EditableContext.Provider>
			</Form>
		);
	};

	const EditableCell = ({
		title,
		editable,
		children,
		dataIndex,
		record,
		handleSave,
		...restProps
	}) => {
		const [editing, setEditing] = useState(false);
		const inputRef = useRef(null);
		const form = useContext(EditableContext);
		useEffect(() => {
			if (editing) {
				inputRef.current.focus();
			}
        }, [editing]);
        
		const toggleEdit = () => {
			setEditing(!editing);
			form.setFieldsValue({
				[dataIndex]: record[dataIndex],
			});
		};

		const save = async () => {
			try {
				const values = await form.validateFields();
				toggleEdit();
				handleSave({ ...record, ...values });
			} catch (errInfo) {
				console.log("Save failed:", errInfo);
			}
		};

		let childNode = children;

		if (editable) {
			childNode = editing ? (
				<Form.Item
					style={{
						margin: 0,
					}}
					name={dataIndex}
					rules={[
						{
							required: true,
							message: `${title} is required.`,
						},
					]}
				>
					<Input ref={inputRef} onPressEnter={save} onBlur={save} />
				</Form.Item>
			) : (
				<div
					className="editable-cell-value-wrap"
					style={{
						paddingRight: 24,
					}}
					onClick={toggleEdit}
				>
					{children}
				</div>
			);
		}

		return <td {...restProps}>{childNode}</td>;
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
		setDataSource(dataSource.filter((item) => item.id !== row.id));
		axios.delete(`/categories/${row.id}`);
	};

	let columns = [
		{
			title: "ID",
			dataIndex: "id",
			render: (text) => <b>{text}</b>,
		},
		{
			title: "栏目名称",
			dataIndex: "title",
			editable: true,
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
				</div>
			),
		},
	];

    const handleSave = (res) => {//修改新闻类型 失去焦点保存
        setDataSource(dataSource.map(item => {
            if(item.id === res.id){
                return {
                    ...res
                }
            }
            return item
        }))

        axios.patch(`/categories/${res.id}`,{
            title: res.title,
            value: res.value
        }).then(reslut => {
            message.success('修改成功');
        })
    }

    const newColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
  
        return {
          ...col,
          onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: handleSave,
          }),
        };
      });
	return (
		<div>
			<Table
				components={{
					body: {
						row: EditableRow,
						cell: EditableCell,
					},
				}}
				dataSource={dataSource}
				columns={newColumns}
				rowKey={(row) => row.id}
				pagination={{ pageSize: 5 }}
			/>
		</div>
	);
}
