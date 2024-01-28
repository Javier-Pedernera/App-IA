import { getUser } from "../Actions/UserSlice";
import axios from "axios";


const URL = import.meta.env.VITE_API_URL
 //GET para mostrar los datos del Usuario
const getUserData = (user) => {
	return async (dispatch) => {
		try {
			dispatch(getUser(user));
		} catch (error) {
			console.error(error);
		}
	};
};




export{
    getUserData
}