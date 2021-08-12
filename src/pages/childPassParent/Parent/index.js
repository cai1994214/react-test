import React , {Component}from 'react'
import Child from '../Child'
class Parent extends Component {

    state = {
        age: 12
    }

    getChildMsg = (msg) => {
        console.log(msg)
        this.setState({
            age: msg
        })
    }

    render(){
        return (
            <>
                父组件
                <Child getMsg={this.getChildMsg}></Child>
                {this.state.age}
            </>
        )
    }
}


export default Parent