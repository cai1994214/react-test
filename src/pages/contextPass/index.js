import {createContext, Component} from 'react'
import './index.css'

//跨组件传值
//创建context得当两个组件

const {Provider, Consumer} = createContext();
// Provider 数据提供者（通过value传递） Consumer 消费数据

class App extends Component {
    render() {
        return (
            <Provider value="pink">
                <div className="app">
                    <Child1></Child1>
                </div>
            </Provider>
        )
    }
} 


const Child1 = (props) => {
    return (
        <div className={'child1'}>
            <Child2></Child2>
        </div>
    )
}

const Child2 = (props) => {
    return (
        <div className={'child2'}>
            <Child3></Child3>
        </div>
    )
}

const Child3 = (props) => {
    return (
        <div className={'child3'}>
            <Consumer>
                {data => <span>我是子组件传递的值: {data}</span>   }
            </Consumer>
        </div>
    )
}


export default App