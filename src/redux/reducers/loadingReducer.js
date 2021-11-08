export const LoadingReducer = (prevState = {
    loadingState: false
}, action) => {
    let { type, payload } = action;
    switch (type) {
        case "change_loading":
            let newState = {...prevState};//copy一下
            newState.loadingState = payload;
            return newState;
        default:
            return prevState;
    }
}