import React, { useEffect, useState, useRef } from "react";
import { PageHeader, Steps, Button, message, Form, Input, Select, notification } from "antd";
import style from "./News.module.css";
import axios from "axios";
import NewsEditor from './NewsEditor';
import { withRouter } from "react-router-dom";
const { Step } = Steps;
const { Option } = Select;
function NewsAdd(props) {
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

	const next = () => {//下一页
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
            if(content === "" || content.trim()=== "<p></p>"){//富文本内容
                message.error('输入的内容不能为空')
            }else{
                setCurrent(current + 1);
            }
            
        }
    };
    
    const handleSave = (auditState) => {
        axios.patch(`/news/${props.match.params.id}`,{//新增新闻数据
            ...formInfo,
            content: content,
            auditState: auditState,//是否是保存0 提交时1
        }).then(res=>{
            //如果是提交成功就在审核列表 保存就去草稿箱
            props.history.push(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list');
            notification.info({
                message: '通知',
                description: `您可以到${auditState === 0 ? '草稿箱': '审核列表'}查看您的新闻!`,
                placement:'bottomRight'
            })
        })
    };

	const prev = () => {
		setCurrent(current - 1);
	};

	useEffect(() => {
		axios.get("/categories").then((res) => {
			setOptionList([...res.data]);
		});
    }, []);
    
    useEffect(() => {
		axios
			.get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
			.then((res) => {
                console.log(res.data);
                let { title, categoryId, content } = res.data;
                NewsForm.current.setFieldsValue({
                    title,
                    categoryId
                })
                setContent(content);
               
			});
    }, [props.match.params.id]);
	return (
		<div>
			<PageHeader
				className="site-page-header"
				onBack={()=>props.history.goBack()}
				title="更新新闻"
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
							name="categoryId"
							rules={[{ required: true, message: "请输入新闻分类!" }]}
						>
							<Select placeholder="请输入新闻分类" allowClear>
								{optionList?.map((item) => {
									return (
										<Option value={item.id} key={item.id}>
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
                   <NewsEditor getContent={(res)=>{setContent(res)}} content={content} ></NewsEditor>
                </div>
				<div className={current === 2 ? "" : style.hidden}></div>
			</div>

			<div className={style.FormItem}>
				{current > 0 && <Button onClick={() => prev()}>上一步</Button>}
				{current === steps.length - 1 && (
					<span>
						<Button
							type="primary"
							onClick={()=>handleSave(0)}
						>
							保存草稿
						</Button>
						<Button danger onClick={()=>handleSave(1)}>提交审核</Button>
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

export default withRouter(NewsAdd)