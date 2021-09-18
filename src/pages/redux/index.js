
import { Component } from 'react'

class Counter extends Component {
  
    render () {
        const { value , onIncrement, onDecrement} = this.props
        return (
            <div>
                <h1>{ value }</h1>
                <button onClick={onIncrement}>+</button>
                <br/>
                <button onClick={onDecrement}>-</button>
            </div>
        )
    }
}

export default Counter