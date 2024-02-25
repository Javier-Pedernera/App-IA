import { addMessageToLocalStorage, getMessagesFromLocalStorage } from "../../utils/localStorage";
import { messageAI, getOut, selectVoice, messageAdded, compare, selectLanguage } from "./MessageSlice";
import axios from "axios";

// const responseUser = (data) => {
//     const URL = import.meta.env.VITE_API_URL;
//     const MAX_RETRY = 3; // Número máximo de intentos
//     let retryCount = 0;
// 	console.log(retryCount);
//     const postRequest = async () => {
//         try {
//             const response = await axios.post(`${URL}/preguntas`, data);
//             const msj = { type: 'NP_AI', content: response.data.message, timestamp: new Date().toString(), thread_id: response.data.thread_id };
//             await addMessageToLocalStorage(msj);
//             return msj;
//         } catch (error) {
//             console.error('Error en responseUser:', error);
//             throw error; // Lanzar el error para manejarlo fuera de la función
//         }
//     };

    // const retryPostRequest = async () => {
    //     try {
    //         const response = await postRequest();
    //         return response;
    //     } catch (error) {
    //         retryCount++;
    //         if (retryCount < MAX_RETRY) {
    //             console.log(`Intento de reenvío número ${retryCount}.`);
    //             return await retryPostRequest(); // Intentar nuevamente
    //         } else {
    //             console.error('Se excedió el número máximo de intentos.');
    //             throw error; // Lanzar el error para manejarlo fuera de la función
    //         }
    //     }
    // };

//     return async (dispatch) => {
//         try {
//             const response = await retryPostRequest();
//             return dispatch(messageAI(response));
//         } catch (error) {
//             console.error('Error en responseUser:', error);
//         }
//     };
// };

//GET para mostrar los mensajes
const responseUser = (data) => {
	const URL = import.meta.env.VITE_API_URL
	// console.log("data en response user", data);
	//comentar al activar ruta 

	return async (dispatch) => {
		try {

			//usando simulacion
			// const response = responseApi.data[currentIndex];
			// Incrementa el índice para la próxima llamada comentar cuanactive ruta
			// currentIndex = (currentIndex + 1) % responseApi.data.length;
			// const msj = { type: 'NP_AI', content: response.message, timestamp: new Date().toString(), thread_id: response.thread_id }

			// usando api OpenAI
			const response = await axios.post(`${URL}/preguntas`, data, { timeout: 30000 });
			console.log(response);
			const msj = { type: 'NP_AI', content: response.data.message, timestamp: new Date().toString(), thread_id: response.data.thread_id }
			console.log(msj);
			await addMessageToLocalStorage(msj)
			return dispatch(messageAI(msj));



		} catch (error) {
			
			console.error('error en responseUser', error);
		}
	};
};

//comparar local storage con estado global
const compareMessages = () => {
	return async (dispatch) => {
		try {
			const messages = await getMessagesFromLocalStorage()
			return dispatch(compare(messages));
		} catch (error) {
			alert({ error: error.message });
		}
	};
};

// agregar mensajes 
const addMessage = (msj) => {
	return async (dispatch) => {
		try {
			await addMessageToLocalStorage(msj)
			return dispatch(messageAdded(msj));
		} catch (error) {
			alert({ error: error.message });
		}
	};
};


//Eleccion de voces
const voiceSelected = (voice) => {
	return async (dispatch) => {
		try {
			return dispatch(selectVoice(voice));
		} catch (error) {
			alert({ error: error.message });
		}
	};
};

//Eleccion de voces
const languageSelected = (language) => {
	return async (dispatch) => {
		try {
			return dispatch(selectLanguage(language));
		} catch (error) {
			alert({ error: error.message });
		}
	};
};
//salir
const Out = () => {
	return async (dispatch) => {
		try {
			return dispatch(getOut());
		} catch (error) {
			alert({ error: error.message });
		}
	};
};

export {
	compareMessages, responseUser, voiceSelected, languageSelected, addMessage, Out
}

// JSON A ENVIAR
// {
//   "token": "<string>",
//   "respuesta": "<string>"
// }

//para simulacion
// const responseApi = {data: [
// 	{
// 	  "message": "¡Hola! Para comenzar a elaborar tu plan nutricional, necesitaré hacerte algunas preguntas. Empecemos:\n\n¿Cuál es tu nombre?",
// 	  "thread_id": "thread_Q4MOLg8Ho8JYeiFQZTcfz6Bs",
// 	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiMTIzIiwidGhyZWFkX2lkIjoidGhyZWFkX1E0TU9MZzhIbzhKWWVpRlFaVGNmejZCcyIsImV4cCI6MTcwNjAxMDY2NX0.KXRZjKU1vvL9Bfo9TdcxqnNGgNanzkyOCkWFUtswB3Y"
// 	},
// 	{
// 	  "message": "Perfecto, Javier. Ahora necesito que me proporciones tu cuenta de correo electrónico, por favor.",
// 	  "thread_id": "thread_Q4MOLg8Ho8JYeiFQZTcfz6Bs",
// 	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiMTIzIiwidGhyZWFkX2lkIjoidGhyZWFkX1E0TU9MZzhIbzhKWWVpRlFaVGNmejZBcyIsImV4cCI6MTcwNjAxMDY2NX0.KXRZjKU1vvL9Bfo9TdcxqnNGgNanzkyOCkWFUtswB3Y"
// 	},
// 	{
// 	  "message": "¡Excelente! Ahora necesito saber cuántos años tienes y cuál es tu género.",
// 	  "thread_id": "thread_Q4MOLg8Ho8JYeiFQZTcfz6Bs",
// 	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiMTIzIiwidGhyZWFkX2lkIjoidGhyZWFkX1E0TU9MZzhIbzhKWWVpRlFaVGNmejZCcyIsImV4cCI6MTcwNjAxMDY2NX0.KXRZjKU1vvL9Bfo9TdcxqnNGgNanzkyOCkWFUtswB3Y"
// 	},
// 	{
// 	  "message": "Gracias por proporcionar esa información, Javier. Ahora, cuéntame, ¿cuál es tu objetivo principal con el plan nutricional? ¿Quieres perder peso, ganar músculo o mantener tu peso actual?",
// 	  "thread_id": "thread_Q4MOLg8Ho8JYeiFQZTcfz6Bs",
// 	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiMTIzIiwidGhyZWFkX2lkIjoidGhyZWFkX1E0TU9MZzhIbzhKWWVpRlFaVGNmejZCcyIsImV4cCI6MTcwNjAxMDY2NX0.KXRZjKU1vvL9Bfo9TdcxqnNGgNanzkyOCkWFUtswB3Y"
// 	},
// 	{
// 	  "message": "Entendido, Javier. Ahora necesito que me cuentes sobre tus hábitos alimenticios diarios. ¿Cómo es un día típico de comidas para ti?",
// 	  "thread_id": "thread_Q4MOLg8Ho8JYeiFQZTcfz6Bs",
// 	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiMTIzIiwidGhyZWFkX2lkIjoidGhyZWFkX1E0TU9MZzhIbzhKWWVpRlFaVGNmejZCcyIsImV"
// 	},
// 	{
// 	  "message": "Genial, Javier. Ahora necesito detalles sobre tus preferencias dietéticas. ¿Sigues algún tipo de dieta en particular o tienes alguna restricción alimentaria?",
// 	  "thread_id": "thread_Q4MOLg8Ho8JYeiFQZTcfz6Bs",
// 	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiMTIzIiwidGhyZWFkX2lkIjoidGhyZWFkX1E0TU9MZzhIbzhKWWVpRlFaVGNmejZCcyIsImV4cCI6MTcwNjAxMDY2NX0.KXRZjKU1vvL9Bfo9TdcxqnNGgNanzkyOCkWFUtswB3Y"
// 	},
// 	{
// 	  "message": "Perfecto, Javier. Sigamos con el plan nutricional. ¿Tienes alguna preferencia en cuanto a la cantidad de comidas que prefieres realizar al día?",
// 	  "thread_id": "thread_Q4MOLg8Ho8JYeiFQZTcfz6Bs",
// 	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiMTIzIiwidGhyZWFkX2lkIjoidGhyZWFkX1E0TU9MZzhIbzhKWWVpRlFaVGNmejZCcyIsImV4cCI6MTcwNjAxMDY2NX0.KXRZjKU1vvL9Bfo9TdcxqnNGgNanzkyOCkWFUtswB3Y"
// 	},
// 	{
// 	  "message": "Muy bien, Javier. Ahora necesito saber si tienes alguna preferencia en cuanto a la distribución de macronutrientes, como proteínas, carbohidratos y grasas. ¿Tienes alguna preferencia o pauta específica?",
// 	  "thread_id": "thread_Q4MOLg8Ho8JYeiFQZTcfz6Bs",
// 	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiMTIzIiwidGhyZWFkX2lkIjoidGhyZWFkX1E0TU9MZzhIbzhKWWVpRlFaVGNmejZCcyIsImV4cCI6MTcwNjAxMDY2NX0.KXRZjKU1vvL9Bfo9TdcxqnNGgNanzkyOCkWFUtswB3Y"
// 	},
// 	{"message": "Gracias por contestar las preguntas. Su plan nutricicional le llegará por e-mail",
// 	"thread_id": "thread_Q4MOLg8Ho8JYeiFQZTcfz6Bs",
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiMTIzIiwidGhyZWFkX2lkIjoidGhyZWFkX1E0TU9MZzhIbzhKWWVpRlFaVGNmejZCcyIsImV4cCI6MTcwNjAxMDY2NX0.KXRZjKU1vvL9Bfo9TdcxqnNGgNanzkyOCkWFUtswB3Y"}
// ]}
// let currentIndex = 0;