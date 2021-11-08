import React,{ useEffect, useState } from "react";
import { Card, Col, Row, List, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from "axios";
const { Meta } = Card;
export default function Home() {
    const [viewsData, setViewsData] = useState([]);
    const [starsData, setStarsData] = useState([]);
    const { role:{roleName}, region , username } = JSON.parse(localStorage.getItem('token'));//当前登录用户信息
    useEffect(()=>{
        //查询浏览最多的 desc倒序
        axios.get(`news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6`).then(res=>{
            setViewsData([...res.data])
        })
    },[])

    useEffect(() => {
        axios.get(`news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6`).then(res=>{
            setStarsData([...res.data])
        })
    }, [])

	return (
		<div className="site-card-wrapper">
			<Row gutter={16}>
				<Col span={8}>
					<Card title="用户最长浏览" bordered={true}>
						<List
							size="small"
							dataSource={viewsData}
							renderItem={(item) => <List.Item><a href={`#/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="用户点赞最多" bordered={true}>
						<List
							size="small"
							dataSource={starsData}
							renderItem={(item) => <List.Item> <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						cover={
							<img
								alt="example"
								src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
							/>
						}
						actions={[
							<SettingOutlined key="setting" />,
							<EditOutlined key="edit" />,
							<EllipsisOutlined key="ellipsis" />,
						]}
					>
						<Meta
							avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
							title={username}
							description={
                                <div><b>{region?region:'全球'}</b><span style={{marginLeft:'30px'}}>{roleName}</span></div>
                            }
						/>
					</Card>
					,
				</Col>
			</Row>
		</div>
	);
}
