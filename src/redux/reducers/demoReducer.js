export function DemoReducer (state = 0, action ) {
    let { type, payload } = action;
    switch (type) {
        case 'addNum':
            return state+=1
        case 'reduceNum':
            return state-=1
        default:
            return state
    }
}