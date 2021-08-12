import React ,{Component, useState, useEffect, useRef}from 'react';


class Child extends Component {

    state = {

    }
    
    handleClick() {
        this.props.getMsg('子传父的一个值')
    }

    render(){
        return (
            <div >
                <span>子组件</span>
                <button onClick={()=>this.handleClick()}>子传父</button>
            </div>
            
        )
    }
}


export default Child