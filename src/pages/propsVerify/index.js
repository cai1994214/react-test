import {Component} from 'react'
import PropTypes from 'prop-types'

function PropsVerify(props) {
    console.log(props)
    const arr = props.colors;
    const lis = arr.map((item, index) => <li key={index}>{item}</li> )

    return (
        <ul>{lis}</ul>
    )
}

//添加props验证
PropsVerify.propTypes = {
    colors: PropTypes.array 
}



export default PropsVerify