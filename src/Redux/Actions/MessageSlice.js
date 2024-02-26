import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    selectedVoice: '',
    selectedLanguage: { name: "Spanish", code: "es-AR" }
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
        selectLanguage: (state, action) => {
            console.log(action.payload);
            return {
                ...state,
                selectedLanguage: action.payload,
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

export const { compare, messageAI, selectVoice, messageAdded, getOut, selectLanguage } = Slice.actions;
export default Slice.reducer;