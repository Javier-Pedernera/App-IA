import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages:[],
};

const Slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        getMessages: (state, action) => {
            state.messages = action.payload;   
        }
    }
});

export const { getMessages } = Slice.actions;
export default Slice.reducer;