import React from "react";
import { Table, Button,} from "antd";
import { withRouter } from "react-router-dom";
function NewsPublish(props) {
	const columns = [
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
                    {/* button以函数的形式传递组件接收参数 */}
					{ props.button(row.id) }
				</div>
			),
		},
	];


	return (
		<div>
			<Table
				dataSource={props.dataSource}
				columns={columns}
				rowKey={(row) => row.id}
				pagination={{ pageSize: 5 }}
			/>
		</div>
	);
}
export default withRouter(NewsPublish)