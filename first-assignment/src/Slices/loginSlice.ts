import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: false
}

const logInSlice = createSlice({
    name: 'logIn',
    initialState,
    reducers: {
        login: (state)=> {state.value=true},
        logout: (state) => {state.value=false}
    }
})

export const {login,logout} = logInSlice.actions
export default logInSlice.reducer