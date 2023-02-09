import {
  eventFormLogin,
  newAccount,
  eventFormRegister,
  sesionUser,
  logsucces,
  closeSesion,
  rechargeInfoLocal,
} from "./uiDomLogin.js";
import {
  loadPhotoUser,
  MediaQueryMessage,
  ActionsMessages,
  ActionsContacts,
  OpenSesion,
  ChargeMessages,
  messagesprueba,
} from "./UiDomMainSec.js";

//Eventos del formulario de login
eventFormLogin();
newAccount();
eventFormRegister();
rechargeInfoLocal();

messagesprueba();
export const eventsMainSec = async () => {
  logsucces();
  OpenSesion();
  ActionsContacts();
  ActionsMessages();
  loadPhotoUser(sesionUser.url);
};

const verificaSesion = async () => {
  if (Object.entries(sesionUser).length != 0) {
    eventsMainSec();
  } else {
    closeSesion();
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  verificaSesion();
  MediaQueryMessage();
  await eventsMainSec();
  await ChargeMessages();
});
