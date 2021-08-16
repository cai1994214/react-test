import { Component } from 'react'
import { BrowserRouter as Router ,Route, Link} from 'react-router-dom'
//默认情况下 路由匹配是模糊匹配的 / 为默认路由 可以匹配任何路由 所有会出现两个路由
//Router的 exact属性 为精确匹配
class Login extends Component {

    handleClick = () => {
        //使用编程式导航跳转
        this.props.history.push('/')
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <p>登录页面: </p>
                <button onClick={this.handleClick}> 登录</button>
            </div>
        )
    }
}

const Home = (props) => {
    const handleBack = () => {
        props.history.replace('/login')
    }
    return (
        <div>
            <h2>我是后台首页</h2>
            <button onClick={handleBack}>返回登录页</button>
        </div>
    )
}
   


const App = () => (
    <Router >
         <div>
            <h1>编程式导航</h1>
            {/* <Link to="/login">去登陆页面</Link> */}
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
        </div>
    </Router>
   
)

export default App