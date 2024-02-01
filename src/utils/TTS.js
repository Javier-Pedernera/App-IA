import axios from "axios";

export async function textToSpeech  (text, voice) {
      try {
          const response = await axios.post(
              "https://api.openai.com/v1/audio/speech",
              {
                  model: "tts-1",
                  input: text,
                  voice: voice,
              },
              {
                  headers: {
                      Authorization: `Bearer ${ import.meta.env.VITE_OPENAI_API_KEY }`,
                  },
                  responseType: "blob",
              }
          );
          return response
      } catch (error) {
        console.error("Error en textToSpeech:", error);
        throw error;
      }
    }
    //export function formatDate(inputDate)