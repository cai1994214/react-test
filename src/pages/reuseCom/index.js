import {Component} from 'react'
import img from '../img/cat.jpg'



//render props模式
class ReuseCom extends Component {
    render() {
        return (
            // <div>
            //     <h1>render props模式</h1>
            //     <Mouse render={(res) => {
            //         return  <p>鼠标位置: {res.x} {res.y}</p>
            //     } }></Mouse>
            //     {/* 摸捉老鼠 */}
            //     <Mouse render={(res) => {
            //         return  <img src={img}  style={{position: 'absolute',top: res.y-64, left: res.x-64}}/>
            //     }}/>
            // </div>
           
            <div>
                 {/* children代替render-props */}
                <h1>render props模式</h1>
                <Mouse >
                    {({x,y}) => {return <p>鼠标位置: {x} {y}</p>}}
                </Mouse>
                {/* 摸捉老鼠 */}
                <Mouse >
                {({x,y}) => {return <img src={img}  style={{position: 'absolute',top: y-64, left: x-64}}/>}}
                </Mouse>
            </div>
        )
    }
}

//添加一个函数的prop, 通过函数参数来获取(需组件内部实现)

//组件渲染内容不一样 通过函数的返回值 不同来实现

class Mouse extends Component {

    state = {
        x: '',
        y: '',
    }

    //监听鼠标移动事件
    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove)
    }

    //销毁解除
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove)
    }

    handleMouseMove = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }
    render() {
        return(
        <div>
            {/* {this.props.render(this.state)} */}
            {this.props.children(this.state)}
        </div>
        )
    }
}

export default ReuseCom