import NewsPublish from "../../publish-manage/NewsPublish";
import usePublish from "../../publish-manage/usePublish";
import { Button } from 'antd'
export default function Unpublished() {
  //1是待发布
  const { dataSource, handlePublish } = usePublish(1)
	return (
		<div>
			<NewsPublish dataSource={dataSource} button={(id) => <Button type="primary" onClick={() => handlePublish(id) }>发布</Button> }></NewsPublish>
		</div>
	);
}
