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

const verificaSesion = async () => {
  //Object.entries(sesionUser).length != 0
  if (Object.entries(sesionUser).length != 0) {
    logsucces();
    OpenSesion();
    MediaQueryMessage();
    ActionsContacts();
    ActionsMessages();
    loadPhotoUser(sesionUser.url);
    await ObtainMessages();
  } else {
    closeSesion();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  verificaSesion();
});
