import { number } from 'prop-types';
import { Component } from 'react'

class RandomNum extends Component {

    state = {
        number: 0
    }

    handleClick = () => {
        this.setState(() => {
            return {
                number: Math.floor(Math.random()*3)
            }
        })
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     //数据和上一次一样不需要渲染render
    //     return nextState.number !== this.state.number
    // }

    render() {
        // console.log('render');
        const el = (
            <div>
                {/* <h1>随机数: {this.state.number}</h1> */}
                <ShowNumber number={this.state.number}></ShowNumber>
                <button className="userName" onClick={this.handleClick}>获取随机数</button>
            </div>
        ) 
        // console.log('this', this);
        console.log(el);
        return el
    }
}

class ShowNumber extends Component {


    shouldComponentUpdate(nextProps) {
        return nextProps.number !== this.props.number
    }

    render() {
        console.log('子组件render');
        return (
            <div>{this.props.number}</div>
        )
    }
}


export default RandomNum