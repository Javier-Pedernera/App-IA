
// Agregar mensajes al localStorage
export function addMessageToLocalStorage(message) {
    try {
      const storedMessages = JSON.parse(localStorage.getItem('storedMessages')) || [];
      if(message){
        storedMessages.push(message);
      const serializedMessages = JSON.stringify(storedMessages);
      localStorage.setItem('storedMessages', serializedMessages);
      return storedMessages
      }else{
        return storedMessages
      }
      
    } catch (error) {
      console.error('Error al agregar a localStorage:', error);
    }
  }
  
  // Obtener mensajes desde localStorage
  export function getMessagesFromLocalStorage() {
    try {
      const messagesString = localStorage.getItem('storedMessages');
      const allMessages = messagesString ? JSON.parse(messagesString) : [];
      return allMessages
    } catch (error) {
      console.error('Error al obtener desde localStorage:', error);
      return [];
    }
  }
  