import {Component} from 'react'

//render props模式
class ReuseCom extends Component {
    render() {
        return (
            <div>
                <h1>render props模式</h1>
                <Mouse render={(res) => {
                    return  <p>鼠标位置: {res.x} {res.y}</p>
                } }></Mouse>
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

    handleMouseMove = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }

    render() {
        return(
        <div>
            {this.props.render(this.state)}
        </div>
        )
    }
}


export default ReuseCom