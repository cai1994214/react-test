import React, {Component, useEffect} from 'react'



class Parent extends Component {

    state = {
        lastName: '王'
    }

    render() {
        return (
           <Child name={this.state.lastName}/>
        )
    }
}

const Child = (props) => {
    const { name } = props
    return (
        <>
            {name}
        </>
    )
}


export default Parent