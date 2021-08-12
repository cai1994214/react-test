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
        <UseWithMouse.MousePosition></UseWithMouse.MousePosition>
        <UseWithMouse.MouseCat></UseWithMouse.MouseCat>
      </div>
      
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)