import cookie from 'react-cookies'
const initState={
    "taikhoan":cookie.load('user'),
}

const userReducer=(state=initState,action)=>{
    switch(action.type){
        case "USER_LOGIN":
            return{
                ...state,
                "taikhoan":action.payload 
            }
        case "USER_LOGUT":
            return{
                ...state,
                "taikhoan":null
            }
        default:
            return state
    }
}

export default userReducer