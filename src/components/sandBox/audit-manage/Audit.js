
import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button, notification} from "antd";
export default function Audit(props) {
    //审理审核中的列表 
    const [dataSource, setDataSource] = useState([]);
    const { roleId, region , username } = JSON.parse(localStorage.getItem('token'));//当前登录用户信息
   

    useEffect(()=>{
        const roleObj = {
			'1': 'superadmin',
			'2': 'admin',
			'3': 'editor'
		}
        axios.get(`/news?auditState=1&_expand=category`).then(res => {
            const list = res.data;
            let arr = [
				...list.filter(item=>item.author===username),//本身
				...list.filter(item=>item.region===region && roleObj[item.roleId] === 'editor'),//地区加可编辑
            ]
			setDataSource(roleObj[roleId] === 'superadmin' ? list : arr);
        })
    },[roleId, region, username])

    const columns = [
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
			title: "操作",
			render: (row) => {
				return <div>
                    <Button type="primary" onClick={()=>handleAudit(row, 2, 1)}>通过</Button> 
                    <Button danger onClick={()=>handleAudit(row, 3, 0)}>反驳</Button> 
				</div>
            }
		}
	];

    const handleAudit = (row, auditState, publishState) => {
        setDataSource(dataSource.filter(item=>item.id !== row.id));
        axios.patch(`news/${row.id}`,{
            auditState,
            publishState
        }).then(res=>{
            notification.info({
                message: '通知',
                description: `您可以到${auditState == 3 ? '[审核管理/审核列表]' : '[发布管理/待发布]'}查看您的审核状态!`,
                placement:'bottomRight'
            })
        })
    }   

    return (
        <div>
            <Table
				dataSource={dataSource}
				columns={columns}
                rowKey={(row) => row.id}
                pagination={{ pageSize: 5 }}
			></Table>
        </div>
    )
}
