import {Component} from 'react'

class LifeCycle extends Component {

    state = {
        count: 0
    }

    addCount = ()=> {
        this.setState({
            count: this.state.count+1
        })
    }
    render() {
        return (
            <>
                <Child count={this.state.count}></Child>
                <button onClick={this.addCount}>+1</button>
            </>
            
        )
    }
}

class Child extends Component {

    //render之后调用 不能使用setState 如果用需要加if
    componentDidUpdate(preProps) {

        // this.setState({})// 调用报错
        if(preProps.count !== this.props.count){
            this.setState({})//正常调用
        }
        // console.log('上一个props', preProps);
        // console.log('当前', this.props);

    }

    render() {
        return(
            <div>子组件的值: {this.props.count}</div>
        )
    }
}



export default LifeCycle