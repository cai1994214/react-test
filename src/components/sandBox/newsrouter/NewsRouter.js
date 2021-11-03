import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../../../views/sandbox/home/Home";
import UserList from "../../../views/sandbox/user-manage/UserList";
import RoleList from "../../../views/sandbox/right-manage/RoleList";
import RightList from "../../../views/sandbox/right-manage/RightList";
import NoPermission from "../../../views/sandbox/nopermission/NoPermission";
import NewsAdd from "../news-manage/NewsAdd";
import NewsDraft from "../news-manage/NewsDraft";
import NewsCategory from "../news-manage/NewsCategory";
import Audit from "../audit-manage/Audit";
import AuditList from "../audit-manage/AuditList";
import Unpublished from "../publish-manage/Unpublished";
import Published from "../publish-manage/Published";
import Sunset from "../publish-manage/Sunset";
import axios from "axios";
import NewsPreview from "../news-manage/NewsPreview";
import NewsUpdate from "../news-manage/NewsUpdate";

const localRouterList = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewsDraft,
  "/news-manage/category": NewsCategory,
  "/news-manage/preview/:id": NewsPreview,
  "/news-manage/update/:id": NewsUpdate,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": Sunset,
};

export default function NewsRouter() {
  const [BackRouteList, setBackRouterList] = useState([]);
  const { role:{ rights } } = JSON.parse(localStorage.getItem('token'));


  useEffect(() => {
    Promise.all([
      axios.get("/rights"),
      axios.get("/children"),
    ]).then((res) => {
      setBackRouterList([...res[0].data, ...res[1].data]);
    });
  }, []);

  const checkRoute = (item) => {// 是否有路由权限 1为打开 0为禁用
    return localRouterList[item.key] && (item.pagepermisson || item.routepermisson);
  };

  const checkoutPermission = (item) => {//当前用户的路有权限
    return rights.includes(item.key)
  };
  return (
    <div>
      <Switch>
        {BackRouteList.map((item) => {
          if (checkRoute(item) && checkoutPermission(item)) {
            //判断是否有权限
            return (
              <Route
                path={item.key}
                component={localRouterList[item.key]}
                key={item.id}
                exact
              ></Route>
            );
          }
          return null
        })}
        {/* Redirect 重定向  exact精确匹配 *404和重定向搭配使用 */}
        <Redirect from="/" to="/home" exact></Redirect>
        {BackRouteList.length > 0 && (
          <Route path="*" component={NoPermission}></Route>
        )}
      </Switch>
    </div>
  );
}
