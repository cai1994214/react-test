import { Component } from 'react'

/*
    创建一个高阶组件
*/
function withMouse(WrappendComponent){
    class Mouse extends Component {
        state = {
            x: 0,
            y: 0
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
            return (
                <WrappendComponent {...this.state} {...this.props}/>
            )
        }
    }

    return Mouse
}

export default withMouse