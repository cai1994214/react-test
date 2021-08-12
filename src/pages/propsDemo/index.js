import React, {Component, useEffect} from 'react'

const Hello = props => {
    const {name, age, colors, fn, tag} = props;
    //props 是只读属性
    console.log(props)

    useEffect(()=>{
        console.log('页面初始化的时候')
        fn()
    },[])

    return (
        <div>
            <h1 style={{color: colors[0]}}>name: {name}</h1>
            <h1 style={{color: colors[1]}}>age: {age}</h1>
            {tag}
        </div>
    )
}

class PropsDemo extends Component {

    render() {
        return (
            <Hello
                name="rose"
                age={19}
                colors={['red','green','blue']}
                fn={()=>{console.log('这是一个函数')}}
                tag={<p>这是一个P标签</p>}
            >

            </Hello>
        )
    }
}



export default PropsDemo