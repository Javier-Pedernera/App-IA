import { getAuth } from "../../utils/checkAuth";
import { getUser } from "../Actions/UserSlice";
import axios from "axios";

 //GET para mostrar los datos del Usuario
const getUserData = () => {
	return async (dispatch) => {
		try {
      const body= {
			usuario_id: "Javier1981",
        }
			const dbData = await axios.post(`https://desolate-cliffs-71612-40d6bcd1294f.herokuapp.com/plan`, body);
			console.log(dbData);
			dispatch(getUser(dbData.data));
		} catch (error) {
			console.error(error);
		}
	};
};




export{
    getUserData
}