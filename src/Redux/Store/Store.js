import { configureStore } from '@reduxjs/toolkit';
import user from "../Actions/UserSlice"
import messages from '../Actions/MessageSlice';


const store = configureStore({
    reducer: {
       user: user,
       messages: messages
    },
});

export default store;