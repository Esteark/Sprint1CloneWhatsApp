import { notifcationToastify } from "./notifications.js";

const URLUsers =
  "https://backsprintclonewhatsapp-production.up.railway.app/users";
const URLContacts =
  "https://backsprintclonewhatsapp-production.up.railway.app/contacts";
const URLMessages =
  "https://backsprintclonewhatsapp-production.up.railway.app/messages";
const URLChats =
  "https://backsprintclonewhatsapp-production.up.railway.app/Chats";

export const getInfoUsers = async () => {
  try {
    const { data } = await axios.get(URLUsers);
    return data;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const getInfoUser = async (cel) => {
  try {
    const { data } = await axios.get(`${URLUsers}?cel=${cel}`);
    return data;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const createNewUser = async (data) => {
  try {
    const { status } = await axios.post(URLUsers, data);
    return status;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const updateInfoUser = async (id, data) => {
  try {
    const urlEditUser = `${URLUsers}/${id}`;
    const { status } = await axios.patch(urlEditUser, data);
    return status;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const UpdateInfoContact = async (id, data) => {
  try {
    const urlEditContact = `${URLContacts}/${id}`;
    const { status } = await axios.patch(urlEditContact, data);
    return status;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const LogSuccesUser = async (id, data) => {
  try {
    const { status } = await axios.patch(`${URLContacts}/${id}`, data);
    return status;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};
//Servicios para obtener y manipular la ifnromación de los contactos

export const getContacts = async (id) => {
  try {
    const { data } = await axios.get(`${URLContacts}?codeUser=${id}`);
    return data;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const getContactsbyCel = async (cel) => {
  try {
    const { data } = await axios.get(`${URLContacts}?cel=${cel}`);
    return data;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const addContact = async (data) => {
  try {
    const { status } = await axios.post(URLContacts, data);
    return status;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

//Servicios para obtener y manipular información de los mensajes

export const getMessages = async () => {
  try {
    const { data } = await axios.get(URLMessages);
    return data;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const getMessagesCel = async (cel) => {
  let messages = [];
  const response = await axios.get(`${URLMessages}?celContact1=${cel}`);
  messages.push(...response.data);
  const response2 = await axios.get(`${URLMessages}?celContact2=${cel}`);
  messages.push(...response2.data);
  return messages;
};

export const getMessage = async (id) => {
  try {
    const { data } = await axios.get(`${URLMessages}?id=${id}`);
    return data;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const viewMessage = async (id, data) => {
  try {
    const { status } = await axios.patch(`${URLChats}/${id}`, data);
    return status;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const newConversation = async (data) => {
  try {
    const {
      data: { id },
      status,
    } = await axios.post(URLMessages, data);
    return [id, status];
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const getChats = async (id) => {
  try {
    const { data } = await axios.get(`${URLChats}?idconversation=${id}`);
    return data;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};

export const newMessageChat = async (data) => {
  try {
    const { status } = await axios.post(URLChats, data);
    return status;
  } catch (error) {
    notifcationToastify("Se ha producido un error: " + error);
  }
};
