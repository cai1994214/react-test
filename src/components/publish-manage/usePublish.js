import axios from "axios";
import { useState, useEffect } from "react";
import { notification,} from "antd";
function userPublish (res) {
    const { username } = JSON.parse(localStorage.getItem("token"));

    const [dataSource, setDataSource] = useState([]);
	useEffect(() => {
		axios
			.get(`/news?author=${username}&publishState=${res}&_expand=category`)
			.then((res) => {
				console.log(res.data);
				setDataSource(res.data);
			});
    }, [username]);
    
    const handlePublish = (id) => {//发布
        setDataSource(dataSource.filter(item=>item.id !== id));
		axios.patch(`/news/${id}`, {
                publishState: 2,
                publishTime: new Date().getTime()
			})
			.then((res) => {
				notification.info({
					message: "通知",
					description: `您可以到[发布管理/已经发布]中查看您的新闻!`,
					placement: "bottomRight",
				});
            });
        
	};

    const handleSunset = (id) => {//下线
        setDataSource(dataSource.filter(item=>item.id !== id));
        axios.patch(`/news/${id}`, {
            publishState: 3,
        })
        .then((res) => {
            notification.info({
                message: "通知",
                description: `您可以到[发布管理/已下线]中查看您的新闻!`,
                placement: "bottomRight",
            });
        });
    }

    const handleDelete = (id) => {//删除
        setDataSource(dataSource.filter(item=>item.id !== id));
        axios.delete(`/news/${id}`)
        .then((res) => {
            notification.info({
                message: "通知",
                description: `你已经删除了这条新闻!`,
                placement: "bottomRight",
            });
        });
    }

    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete
    }
}

export default userPublish