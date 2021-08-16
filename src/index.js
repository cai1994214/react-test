import React, {Component} from 'react'
import  ReactDOM from 'react-dom'
import FormDemo from './pages/fromDemo'
import PropsDemo from './pages/propsDemo'
import ComPassValue from './pages/comPassValue'
import ChildPassValue from './pages/childPassParent/Parent/index'
import BrotherPass from './pages/brotherPass/index'
import ContextPass from './pages/contextPass/index'
import LifeCycle from './pages/lifeCycle'
import PropsVenify from './pages/propsVerify'
import ReuseCom from './pages/reuseCom'
import UseWithMouse from './pages/useWithMouse'
import RandomNum from './pages/randomNum'
import Login from './pages/Login'

//Router 包裹整个应用 引入一次
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
// import { HashRouter as Router, Route, Link} from 'react-router-dom';//带#号

import './index.css'

class App extends Component {

  render() {
    return (
      <div>
        {/*表单demo*/}
        {/* <FormDemo ></FormDemo> */}

        {/*props传值*/}
        {/* <PropsDemo></PropsDemo>  */}

        {/*父传子*/}
        {/* <ComPassValue></ComPassValue> */}
        
        {/*子传父*/}
        {/* <ChildPassValue></ChildPassValue>  */}

        {/*兄弟传值*/}
        {/* <BrotherPass /> */}

        {/* 跨组件传值 */}
        {/* <ContextPass></ContextPass> */}

        {/* 生命周期 */}
        {/* <LifeCycle></LifeCycle> */}

        {/* props验证 */}
        {/* <PropsVenify colors={['red', 'blue', 'green']}></PropsVenify> */}

        {/* 组件复用--render props */}
        {/* <ReuseCom></ReuseCom> */}

        {/* 高阶组件的使用 */}
        {/* <UseWithMouse.MousePosition a={1}></UseWithMouse.MousePosition>
        <UseWithMouse.MouseCat></UseWithMouse.MouseCat> */}

        {/* 优化渲染 shouldComponentUpdate 案例 随机数 */}
        {/* <RandomNum></RandomNum> */}

        {/* 路由  */}
        {/* <Router>
          <div>
            <h1>React路由</h1>

            <div>
            <Link to="/first" >页面一</Link>
            <br/>
            <Link to="/home" >页面一</Link>
            </div>
            
            <Route path="/first" component={First}></Route>
            <Route path="/home" component={Hemo}></Route>
          </div>
        </Router> */}

        {/* 编程式导航 */}
        <Login></Login>
      </div>
      
    )
  }
}

// const First = () => <p>页面一的内容</p>
// const Hemo = () => <p>Home</p>

ReactDOM.render(
  <App />,
  document.getElementById('root')
)