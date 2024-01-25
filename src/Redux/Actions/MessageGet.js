import { getMessages } from "./MessageSlice";
import axios from "axios";

//GET para mostrar todos los mensajes
const getAllMessages= () => {
	return async (dispatch) => {
		try {
			const dbData = (await axios.post(`https://desolate-cliffs-71612-40d6bcd1294f.herokuapp.com/preguntas`)).data;	
      console.log(dbData);		
			return dispatch(getMessages(dbData));
		} catch (error) {
			alert({error: error.message});
		}
	};
};

 
export{
  getAllMessages
}

// JSON A ENVIAR
// {
//   "token": "<string>",
//   "respuesta": "<string>"
// }