const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case "Incremented":
            return state + 1 + action.payload
        case "Decremented":
            return state - 1
        default:
            return state
    }
}
export default counterReducer