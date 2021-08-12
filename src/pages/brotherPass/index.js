import { Component }from 'react'

class Parent extends Component {


    state = {
        num: 0
    }

    setNum = () => {
        let newNum = this.state.num+1;
        this.setState({
            num: newNum
        })
    } 

    render() {
        return (
            <div>
                <Child1 num={this.state.num}></Child1>
                <Child2 setNumFn={this.setNum}></Child2>
            </div>
           
        )
    }

}

const Child1 = (props) => {
    const { num } = props;
    return ( <div>计数器: {num}</div> )
}

const Child2 = (props) => {
    function handleClick() {
        props.setNumFn();
    }

    return ( <button onClick={handleClick}>+1</button> )
}


export default Parent