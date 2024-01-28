import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages:[],
    selectedVoice:'alloy'
};

const Slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        compare: (state, action) => {
            if(state.messages.length < action.payload.length)
            state.messages= action.payload;   
        },
        messageAdded: (state, action) => {
            state.messages.push(action.payload);   
        },
        messageAI: (state, action) => {
            state.messages.push(action.payload);   
        },
        selectVoice: (state, action) => {
            state.selectedVoice = action.payload;   
        },
        getOut: (state, action) => {
            state.messages = [];  
        },
    }
});

export const { compare, messageAI, selectVoice, messageAdded, getOut } = Slice.actions;
export default Slice.reducer;