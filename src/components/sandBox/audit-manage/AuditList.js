import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, Tag, notification } from "antd";
import axios from "axios";
const { confirm } = Modal;
export default function AuditList(props) {
    const [dataSource, setDataSource] = useState([]);
    const { username } = JSON.parse(localStorage.getItem('token'));
    const auditStateList = ['草稿箱','审核中','已通过','未通过'];
    const colorList = ['black', 'orange', 'green', 'red'];
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			render: (text) => <b>{text}</b>,
		},
		{
			title: "新闻标题",
			dataIndex: "title",
			render:(title, item)=>{
				return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
			}
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
			title: "审核状态",
            dataIndex: "auditState",
            render: (auditState) => <Tag color={colorList[auditState]}>{auditStateList[auditState]}</Tag>
		},
		{
			title: "操作",
			render: (row) => (
				<div>
                    { row.auditState === 1 && <Button onClick={()=>handleRevert(row)}>撤销</Button> }
                    { row.auditState === 2 && <Button danger onClick={() => handlePublish(row)}>发布</Button> }
                    { row.auditState === 3 && <Button onClick={()=>handleUpdate(row)} type="primary">更新</Button> }
					
				</div>
			),
		},
	];

	const handlePublish = (row) => {
        setDataSource(dataSource.filter(item => item.id !== row.id));
        axios.patch(`/news/${row.id}`,{
            publishState: 2,
            publishTime: new Date().getTime()
        }).then(res=>{
            //如果是提交成功就在审核列表 保存就去草稿箱
            props.history.push(`/publish-manage/published`)
            notification.info({
                message: '通知',
                description: `您可以到[发布管理/已发布]中查看您的新闻!`,
                placement:'bottomRight'
            })
        })
    }

    const handleRevert = (row) => {//撤销
        setDataSource(dataSource.filter(item => item.id !== row.id));
        axios.patch(`/news/${row.id}`,{
            auditState: 0
        }).then(res=>{
            notification.info({
                message: '通知',
                description: `您可以到草稿箱中查看您的新闻!`,
                placement:'bottomRight'
            })
        })
    }

    const handleUpdate = (row) => {//更新
        props.history.push(`/news-manage/update/${row.id}`)
    }

	useEffect(() => {//拿到所有权限树结构 审核状态不等于0 _ne=0 只要不是草稿箱的 发布状态<=1 是_lte=1
		axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then((res) => {
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
