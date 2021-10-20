import React, { useEffect, useState, useRef } from "react";
import { PageHeader, Steps, Button, message, Form, Input, Select } from "antd";
import style from "./News.module.css";
import axios from "axios";
import NewsEditor from './NewsEditor'
const { Step } = Steps;
const { Option } = Select;
export default function NewsAdd() {
	const [current, setCurrent] = useState(0);
    const [optionList, setOptionList] = useState([]);
    const [formInfo, setFormInfo] = useState({});
    const [content, setContent] = useState("");
	const NewsForm = useRef(null);

	const [steps, setSteps] = useState([
		// 步骤条
		{ title: "基本信息", description: "新闻标题,新闻分类" },
		{ title: "新闻内容", description: "新闻主题内容" },
		{ title: "新闻提交", description: "保存草稿或者提交审核" },
	]);

	const layout = {
		//表单设置
		labelCol: { span: 4 },
		wrapperCol: { span: 20 },
		labelAlign: "left",
		ref: NewsForm,
	};

	const next = () => {
		if (current === 0) {
			NewsForm.current.validateFields().then((res) => {
					//验证通过才能跳转
                    setCurrent(current + 1);
                    setFormInfo(res);//保存form表单内容
				})
				.catch((err) => {
					console.log(err);
				});
		}else{
            console.log(formInfo,content)
            setCurrent(current + 1);
        }
	};
	const prev = () => {
		setCurrent(current - 1);
	};

	useEffect(() => {
		axios.get("/categories").then((res) => {
			setOptionList([...res.data]);
		});
	}, []);
	return (
		<div>
			<PageHeader
				className="site-page-header"
				onBack={() => null}
				title="Title"
			/>
			<Steps current={current}>
				{steps.map((e) => {
					return (
						<Step title={e.title} description={e.description} key={e.title} />
					);
				})}
			</Steps>
            {/* 标题内容 */}
			<div className={style.FormItem}>
				<div className={current === 0 ? "" : style.hidden}>
					<Form name="basic" {...layout}>
						<Form.Item
							label="新闻标题"
							name="title"
							rules={[{ required: true, message: "请输入新闻标题!" }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="新闻分类"
							name="category"
							rules={[{ required: true, message: "请输入新闻分类!" }]}
						>
							<Select placeholder="请输入新闻分类" allowClear>
								{optionList?.map((item) => {
									return (
										<Option value={item.value} key={item.id}>
											{item.title}
										</Option>
									);
								})}
							</Select>
						</Form.Item>
					</Form>
				</div>
                {/* 富文本编辑器 */}
				<div className={current === 1 ? "" : style.hidden}>
                    {/* 保存富文本内容 */}
                   <NewsEditor getContent={(res)=>{setContent(res)}} ></NewsEditor>
                </div>
				<div className={current === 2 ? "" : style.hidden}>3333333</div>
			</div>

			<div className={style.FormItem}>
				{current > 0 && <Button onClick={() => prev()}>上一步</Button>}
				{current === steps.length - 1 && (
					<span>
						<Button
							type="primary"
							onClick={() => message.success("Processing complete!")}
						>
							保存草稿
						</Button>
						<Button danger>提交审核</Button>
					</span>
				)}

				{current < steps.length - 1 && (
					<Button type="primary" onClick={() => next()}>
						下一步
					</Button>
				)}
			</div>
		</div>
	);
}
