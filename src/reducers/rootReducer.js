const initialState = {
    loginSession: false,workFlow:{},workFlowId:'',workFlowName:''
}

const rootReducer=(state = initialState, action)=> {
    switch (action.type) { 
        case "AUTHENTICATE":
                return {
                    ...state,
                    loginSession: action.login
                }
        case "UPDATEWORKFLOW":
              return{
                  ...state,
                  workFlow:action.updatedWorkFlow
              }
        case "TASKDATA":
            return{
                 ...state,
                 workFlowId:action.updatedWorkFlowId,
                 workFlowName:action.updatedWorkFlowname
               }
        default:
            return state
    }
}

export default rootReducer
