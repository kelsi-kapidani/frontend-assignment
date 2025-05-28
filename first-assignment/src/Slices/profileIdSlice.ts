import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: -1
}

const profileIdSlice = createSlice({
    name: 'profileId',
    initialState,
    reducers: {
        set: (state, action)=> {state.value=action.payload},
        reset: (state) => {state.value=-1}
    }
})

export const {set,reset} = profileIdSlice.actions
export default profileIdSlice.reducer