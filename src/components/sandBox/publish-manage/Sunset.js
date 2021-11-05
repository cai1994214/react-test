import NewsPublish from "../../publish-manage/NewsPublish";
import usePublish from "../../publish-manage/usePublish";
import { Button } from 'antd'
export default function Sunset() {
  //3是已下线
  const { dataSource, handleDelete } = usePublish(3)
	return (
		<div>
			<NewsPublish dataSource={dataSource} button={(id) => <Button onClick={ () => handleDelete(id) }>删除</Button> }></NewsPublish>
		</div>
	);
}
