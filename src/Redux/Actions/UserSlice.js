import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData:{}, 
};
const Slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.userData = action.payload;
        }
    }
});


export const { getUser } = Slice.actions;
export default Slice.reducer;

// userData debe devolver: 
// "message": "¡Hola! Estoy aquí para ayudarte a crear un plan nutricional personalizado. Comencemos con algunas preguntas básicas:\n\n¿Cuál es tu nombre?",
// "thread_id": "thread_EfsZdN5bBrjO4yNhnzJueyIU",
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiMTIzIiwidGhyZWFkX2lkIjoidGhyZWFkX0Vmc1pkTjViQnJqTzR5Tmhuekp1ZXlJVSIsImV4cCI6MTcwNTk0MzEyNn0.5mkID4hoxpz4SVuCG72kx05saIon8yjvWnq6HOHZTow"