import { addMessageToLocalStorage, getMessagesFromLocalStorage } from "../../utils/localStorage";
import { messageAI, getOut, selectVoice, messageAdded, compare } from "./MessageSlice";
import axios from "axios";

//comparar local storage con estado global
const compareMessages= () => {
	return async (dispatch) => {
			try {	
				const messages = await getMessagesFromLocalStorage()
				console.log("mensajes traidos de local storage",messages);
				return dispatch(compare(messages));
			} catch (error) {
				alert({error: error.message});
			}
};
};

// agregar mensajes 
const addMessage= (msj) => {
	return async (dispatch) => {
			try {	
				await addMessageToLocalStorage(msj)
				return dispatch(messageAdded(msj));
			} catch (error) {
				alert({error: error.message});
			}
};
};

//GET para mostrar todos los mensajes
const responseUser= (data) => {
	const URL = import.meta.env.VITE_API_URL
	console.log("data en response user",data);
	return async (dispatch) => {
		try {
			const response = await axios.post(`${URL}/preguntas`,data);
			// console.log("response en response user",response);
	  		const msj = { type: 'NP AI', content: response.data.message, timestamp: new Date().toString(), thread_id: response.data.thread_id }
			 await addMessageToLocalStorage(msj)
			return dispatch(messageAI(msj));
		} catch (error) {
			console.error('error en responseUser', error);
		}
	};
};

//Eleccion de voces
const voiceSelected= (voice) => {
	return async (dispatch) => {
		try {	
			return dispatch(selectVoice(voice));
		} catch (error) {
			alert({error: error.message});
		}
	};
};

//salir
const Out= () => {
	return async (dispatch) => {
		try {	
			return dispatch(getOut());
		} catch (error) {
			alert({error: error.message});
		}
	};
};
 
export{
	compareMessages, responseUser, voiceSelected, addMessage, Out
}

// JSON A ENVIAR
// {
//   "token": "<string>",
//   "respuesta": "<string>"
// }