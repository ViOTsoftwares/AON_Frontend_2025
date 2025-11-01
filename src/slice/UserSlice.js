import {createSlice} from '@reduxjs/toolkit'
import Cookie from 'js-cookie'
import {jwtDecode} from 'jwt-decode'


const token = Cookie.get("authToken");
let user = null;

// console.log(token)
if (token) {
  try {
    user = jwtDecode(token);
  } catch (err) {
    console.error("Invalid token:", err);
  }
}

const initialState = {
  User: user || "",
  isUser: !!user,
  error: null,
};
const UserSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        UserLogin:(state , action)=>{
            state.User = action.payload
            state.isUser = true
        },
        UpdateProfile:(state , action)=>{
            state.User.picture = action.payload
            state.isUser = true
        },
        UserLogout :(state , action)=>{
            state.User="",
            state.isUser=false
             Cookie.remove("authToken");
        },
        UserError :(state , action)=>{
            state.User= null
            state.error=action.payload
            state.isUser=false
        }

    }

})
const {actions , reducer} = UserSlice
export const {UserLogin,UserLogout,UserError,UpdateProfile} = actions
export default reducer