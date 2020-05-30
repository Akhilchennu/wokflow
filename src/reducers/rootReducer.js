const initialState = {
    loginSession: false
}

const rootReducer=(state = initialState, action)=> {
    switch (action.type) { 
        case "AUTHENTICATE":
                return {
                    ...state,
                    loginSession: action.login
                }
        default:
            return state
    }
}

export default rootReducer
