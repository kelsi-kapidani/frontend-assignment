import { createSlice } from "@reduxjs/toolkit"

interface SearchState {
  name: string;
  genres: string[];
}
const initialState: SearchState = {
    name : '',
    genres : []
}

const searchSlice = createSlice({
    name: 'searchValues',
    initialState,
    reducers: {
        cleanupSearch: ()=> initialState,
        setSearch: (state,action) => {state.name=action.payload.name || ''; state.genres=action.payload.genres || [];}
    }
})

export const {cleanupSearch , setSearch} =  searchSlice.actions
export default  searchSlice.reducer