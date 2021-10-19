import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../../../views/sandbox/home/Home'
import UserList from '../../../views/sandbox/user-manage/UserList'
import RoleList from '../../../views/sandbox/right-manage/RoleList'
import RightList from '../../../views/sandbox/right-manage/RightList'
import NoPermission from '../../../views/sandbox/nopermission/NoPermission'
export default function NewsRouter() {

    const localRouterList = {
        '/home': Home,
        '/user-manage/list': UserList,
        '/right-manage/role/list': RoleList,
        '/right-manage/right/list': RightList,
        '/news-manage/add': NewsAdd,
        '/news-manage/draft': NewsDraft,
        '/news-manage/catgoty': NewsCatefory,
        '/news-manage/autit': Audit,
        '/news-manage/list': AuditList,
        '/publish-manage/unpublished': Unpublished,
        '/publish-manage/published': Published,
        '/news-manage/list': AuditList,
    }
	return (
		<div>
			<Switch>
				<Route path="/home" component={Home}></Route>
				<Route path="/user-manage/list" component={UserList}></Route>
				<Route path="/right-manage/role/list" component={RoleList}></Route>
				<Route path="/right-manage/right/list" component={RightList}></Route>

				{/* Redirect 重定向  exact精确匹配 *404和重定向搭配使用 */}
				<Redirect from="/" to="/home" exact></Redirect>
				<Route path="*" component={NoPermission}></Route>
			</Switch>
		</div>
	);
}
