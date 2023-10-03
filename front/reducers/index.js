const initialState={
    user:{
        isLoggedIn:false,
        user:null,
        signUpdata:{},
        loginData:{}
    },
    post:{
        mainPosts:[]
    }
}

// const changeNickname={
//     type:'CHANGE_NICKNAME',
//     data:'boogi'
// }

// action creator
// why?
// we can't prepare all actions which user want to change.
// So, we must create a function returning action type.
const changeNickname=(data)=>{
    return {
        type:'CHANGE_NICKNAME',
        data,
    }
}

const login=(data)  =>{
    return{
        type:'LOG_IN',
        data
    }
}




// (preState, action) => nextState
const rootReducer=(state=initialState,action)=>{
    switch (action.type){
        case 'CHANGE_NICKNAME':
            return{
                ...state,
                name:action.data,
            }
        case 'LOG_IN':
            return{
                ...state,
                user:{
                    ...state.user,
                    isLoggedIn: true,
                    user:action.data
                }
            }
    }
}

export default rootReducer;