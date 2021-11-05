
import NewsPublish from "../../publish-manage/NewsPublish";
import usePublish from "../../publish-manage/usePublish";
import { Button } from 'antd'
export default function Published() {
    //2是已发布
    const { dataSource, handleSunset} = usePublish(2);//自定义hook
	return (
		<div>
			<NewsPublish dataSource={dataSource} button={(id) => <Button danger onClick={() => handleSunset(id)}>下线</Button> }></NewsPublish>
		</div>
	);
}
