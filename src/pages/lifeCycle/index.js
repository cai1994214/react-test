import {Component} from 'react'

class LifeCycle extends Component {
    //组件新能优化 
    // state只存储改变的数据, 其他无变化的数据 存放到this实力中

    state = {
        count: 0
    }

    addCount = ()=> {
        //调用两次 setState
        //setState是异步
        // this.setState({
        //     count: this.state.count+1
        // })
        // console.log(this.state.count);//数据还未变化
        // setTimeout(()=>{
            // this.setState({
            //     count: this.state.count+1
            // })
        // })
        /*-------------推荐语法----------*/
        this.setState((state, props) => {
            //回调函数的state 表示最新状态
            return {
                count: state.count + 1
            }
        })
        // this.setState((state, props) => {
        //     //回调函数的state 表示最新状态
        //     return {
        //         count: state.count + 1
        //     }
        // })
        /*--------------setState第二个参数---------------*/
        //场景: 状态更新(页面完成渲染)立即执行
        //和componentDidUpdate 有点相似

    }

    shouldComponentUpdate(nextProps, nextState) {
        // return false
        console.log(nextProps);
        console.log(nextState);
        return true
    }

    render() {
        console.log('render');//第一种方法用setTimeout render调用两边  第二针方法两次调用setState只调用一遍
        return (
            <>
                <Child count={this.state.count}></Child>
                <button onClick={this.addCount}>+1</button>
            </>
            
        )
    }
}

class Child extends Component {

    componentDidMount() {

    }

    //render之后调用 不能使用setState 如果用需要加if
    componentDidUpdate(preProps) {

        // this.setState({})// 调用报错
        if(preProps.count !== this.props.count){
            this.setState({})//正常调用
        }
        // console.log('上一个props', preProps);
        // console.log('当前', this.props);

    }

    componentWillUnmount() {

    }    

    render() {
        return(
            <div>子组件的值: {this.props.count}</div>
        )
    }
}



export default LifeCycle