import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from "../views/login/Login.js";
import NewsSandBox from "../views/sandbox/NewsSandBox.js";
export default function IndexRouter() {
    return (
        <HashRouter>
            {/* 组织路由模糊匹配 */}
            <Switch>
                <Route path="/login" component={Login} />
                {/* <Route path="/" component={ NewsSandBox } /> */}
                <Route path="/" render={() =>
                    localStorage.getItem('token') ?
                        <NewsSandBox></NewsSandBox> : <Redirect to="/login" />
                } />
            </Switch>
        </HashRouter>
    )
}
