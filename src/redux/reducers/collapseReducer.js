export const CollApsedReducer = (prevState = {
    isCollapsed: false
}, action) => {
    let { type } = action;
    switch (type) {
        case "change_collapsed":
            let newState = {...prevState};//copy一下
            newState.isCollapsed = !newState.isCollapsed
            return newState;
        default:
            return prevState;
    }
}