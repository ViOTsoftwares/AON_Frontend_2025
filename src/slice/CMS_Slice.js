import { createSlice } from "@reduxjs/toolkit";

const CMS_Slice = createSlice({
  name: "cms",
  initialState: { cmsDate: {}, isCMS: false },
  reducers: {
    GetCMS: (state, action) => {
      return { cmsDate: action.payload, isCMS: true };
    },
  },
});
const { actions, reducer } = CMS_Slice;
export const { GetCMS } = actions;
export default reducer;
