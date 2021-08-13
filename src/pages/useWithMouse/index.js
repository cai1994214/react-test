import withMouse from "../../components/withMouse.js";
import img from '../img/cat.jpg'

const Position = props => {
    console.log(props)
    return (
        <div>
            高阶组件
            <p>鼠标当前位置 : {props.x} {props.y}</p>
        </div>
    )
}

const Cat = props => {
    return(
        <img src={img}  style={{position: 'absolute',top: props.y-64, left: props.x-64}}/>
    )
}

const MousePosition = withMouse(Position)
const MouseCat = withMouse(Cat)


export default { MousePosition, MouseCat }