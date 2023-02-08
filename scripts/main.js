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
  ObtainMessages,
  ActionsMessages,
  ActionsContacts,
  OpenSesion,
} from "./UiDomMainSec.js";

//Eventos del formulario de login
eventFormLogin();
newAccount();
eventFormRegister();
rechargeInfoLocal();
export const eventsMainSec = async () => {
  logsucces();
  OpenSesion();
  ActionsContacts();
  ActionsMessages();
  loadPhotoUser(sesionUser.url);
  await ObtainMessages();
};

const verificaSesion = async () => {
  if (Object.entries(sesionUser).length != 0) {
    eventsMainSec();
  } else {
    closeSesion();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  verificaSesion();
  MediaQueryMessage();
});
