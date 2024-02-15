import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    selectedVoice: ''
};

const Slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        compare: (state, action) => {
            if (state.messages.length < action.payload.length)
                return {
                    ...state,
                    messages: action.payload
                }
        },
        messageAdded: (state, action) => {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        },
        messageAI: (state, action) => {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        },
        selectVoice: (state, action) => {
            return {
                ...state,
                selectedVoice: action.payload,
            }
        },
        getOut: (state, action) => {
            return {
                ...state,
                messages: [],
            }
        },
    }
});

export const { compare, messageAI, selectVoice, messageAdded, getOut } = Slice.actions;
export default Slice.reducer;