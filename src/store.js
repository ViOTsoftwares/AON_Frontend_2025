import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './slice/UserSlice.js'
import CartSlice from "./slice/CartSlice.js"
import CMS_Slice from "./slice/CMS_Slice.js"

export const store = configureStore({
    reducer:{
        UserState:UserSlice,
        CartState:CartSlice,
        CmsState :CMS_Slice
    }
})