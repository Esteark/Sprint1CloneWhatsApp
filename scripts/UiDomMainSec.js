//elemnts DOM

import {
  hideAnimation,
  HideElement,
  hideModalSummary,
  showAnimation,
  showModalSummary,
} from "./animations.js";
import { notifcationToastify, sweetModal } from "./notifications.js";
import {
  getChats,
  getContacts,
  getContactsbyCel,
  getInfoUser,
  getMessages,
  newConversation,
  newMessageChat,
  viewMessage,
} from "./services.js";
import { rechargeInfoLocal, sesionUser } from "./uiDomLogin.js";
import { validateAddContact } from "./validators.js";

export const SecMain = document.querySelector(".SecMain");
const SecMain_Message = document.querySelector(".SecMain_Message");
const mediaquery = window.matchMedia("(min-width: 992px)");

export const MediaQueryMessage = () => {
  if (window.innerWidth < 992) {
    SecMain_Message.classList.add("hidden");
  }

  const PutQuitClass = () => {
    if (mediaquery.matches) {
      SecMain_Message.classList.remove("hidden");
    } else {
      SecMain_Message.classList.add("hidden");
    }
  };
  mediaquery.addEventListener("change", PutQuitClass);
};

export const OpenSesion = () => {
  showAnimation(SecMain);
};

const ModalContacts = document.querySelector(".ModalContacts");
const btnAddContact = document.getElementById("btnAddContact");
const ModalContacts__AddContact = document.querySelector(
  ".ModalContacts__AddContact"
);
const ModalContacts__CardContact = document.querySelector(
  ".ModalContacts__CardContact"
);
const btnCloseModalContact = document.getElementById("btnCloseModalContact");
const btnShowModalContact = document.getElementById("btnShowModalContact");
const SecConfig = document.getElementById("SecConfig");
const btnOpenConfig = document.getElementById("btnOpenConfig");
const btnCloseConfig = document.getElementById("btnCloseConfig");
const SecMain__InfoUser = document.querySelector(".SecMain__InfoUser");
const SecMain__filter = document.querySelector(".SecMain__filter");
const secMessages = document.getElementById("secMessages");
const btnBackModalContact = document.getElementById("btnBackModalContact");
const btnCloseSesion = document.getElementById("btnCloseSesion");
const SecContacts = document.getElementById("SecContacts");
const inputFilterContact = document.querySelector(".inputFilterContact");
const imgPhotoUser = document.getElementById("imgPhotoUser");
const lblErrorformConfig = document.getElementById("lblErrorformConfig");
const SecMain__SinInfoChat = document.querySelector(".SecMain__SinInfoChat");
const SecMain_InfoChats = document.querySelector(".SecMain_InfoChats");
const SecMain__ChatComplete = document.querySelector(".SecMain__ChatComplete");
const Sec__Mensajes = document.getElementById("Sec__Mensajes");
const txtinputSendMessage = document.getElementById("txtinputSendMessage");
const imgSendMessage = document.getElementById("imgSendMessage");
const btnSendImg = document.getElementById("btnSendImg");
const imgBackSecMessages = document.getElementById("imgBackSecMessages");
const txtfilterChatMessages = document.getElementById("txtfilterChatMessages");
const SecSummary__Chats = document.querySelector(".SecSummary__Chats");
const btnMenuSummary = document.getElementById("btnMenuSummary");
const btnHideModalSummary = document.getElementById("btnHideModalSummary");
const SecSummaryMessages = document.getElementById("SecSummaryMessages");
const txtfilterModalSummary = document.getElementById("txtfilterModalSummary");
const h3ConversationWith = document.getElementById("h3ConversationWith");

export let arraycontacts;
let arraymessages;
let idMensaje;
let nomUserChat;

export const loadPhotoUser = (urlimg) => {
  if (urlimg) {
    imgPhotoUser.src = urlimg;
  } else {
    imgPhotoUser.src = "./sources/img/usuario.png";
  }
};

export let lastChangesSesionUser = (infouser) => {
  let sesion = infouser;
  localStorage.setItem("SesionUser", JSON.stringify(sesion));
  rechargeInfoLocal();
  loadPhotoUser(sesionUser.url);
};

export const contactAgregadoSuccess = async () => {
  arraycontacts = await getContacts(sesionUser.id);
  renderContacts(arraycontacts);
  HideElement(ModalContacts__AddContact);
  showAnimation(ModalContacts__CardContact);
};

export const ChargeMessages = async () => {
  let messages = await ObtainMessages();
  renderMessages(messages);
};

export const ObtainMessages = async () => {
  let mensajesUser = await getMessages();
  let arraymessages = mensajesUser.filter(
    (user) =>
      user.celContact1 === parseInt(sesionUser.cel) ||
      user.celContact2 === parseInt(sesionUser.cel)
  );
  console.log(arraymessages);
  return arraymessages;
};

const fillArrayChats = async (id) => {
  let arrayChats = [];
  let chat = await getChats(id);
  arrayChats.push(...chat);
  return arrayChats;
};

const ObtenerHora = () => {
  let tempus = luxon.DateTime.now();
  let send = tempus.c.hour + ":" + tempus.c.minute;
  return send;
};

const showSecChat = () => {
  if (window.innerWidth < 992) {
    HideElement(SecMain_InfoChats);
    showAnimation(SecMain_Message);
  }
  HideElement(SecMain__SinInfoChat);
  showAnimation(SecMain__ChatComplete);
};
export const closeSecChat = () => {
  HideElement(SecMain__ChatComplete);
  showAnimation(SecMain__SinInfoChat);
};

const OpenModalContact = async () => {
  showAnimation(ModalContacts);
  showAnimation(ModalContacts);
  arraycontacts = await getContacts(sesionUser.id);
  renderContacts(arraycontacts);
};

export const ActionsContacts = async () => {
  btnShowModalContact.addEventListener("click", async () => {
    await OpenModalContact();
  });
  btnAddContact.addEventListener("click", () => {
    HideElement(ModalContacts__CardContact);
    showAnimation(ModalContacts__AddContact);
    showAnimation(ModalContacts__AddContact);
  });
  btnCloseModalContact.addEventListener("click", () => {
    hideAnimation(ModalContacts);
  });
  btnBackModalContact.addEventListener("click", () => {
    HideElement(ModalContacts__AddContact);
    showAnimation(ModalContacts__CardContact);
    showAnimation(ModalContacts__CardContact);
    formAddUser.reset();
  });

  SecContacts.addEventListener("click", async (e) => {
    let contact = e.target.getAttribute("data-cel");
    nomUserChat = e.target.getAttribute("data-name");

    if (contact) {
      let userHaveWhat = await renderInfoUserChat(contact, nomUserChat);

      if (userHaveWhat != true) {
        notifcationToastify(
          "El usuario con el que te quieres comunicar actualmente no tiene una cuenta de whatsApp activa"
        );
        closeSecChat();
      } else {
        let arraymessages = await ObtainMessages();
        let consersationfind = false;
        let celular = parseInt(contact);
        arraymessages.forEach((item) => {
          if (
            item.celContact1 === celular &&
            item.celContact2 === parseInt(sesionUser.cel)
          ) {
            idMensaje = item.id;
            consersationfind = true;
          } else if (
            item.celContact2 === celular &&
            item.celContact1 === parseInt(sesionUser.cel)
          ) {
            idMensaje = item.id;
            consersationfind = true;
          }
        });
        console.log(consersationfind);

        if (consersationfind) {
          let chats = await fillArrayChats(idMensaje);
          renderburblesChats(chats);
        } else {
          const newcon = {
            celContact1: parseInt(sesionUser.cel),
            nomContact1: sesionUser.nomUser,
            celContact2: celular,
            nomContact2: nomUserChat,
          };
          let arrayresponse = await newConversation(newcon);
          const [id, estado] = arrayresponse;
          if (estado >= 200 && estado <= 299) {
            idMensaje = id;
            notifcationToastify("Nueva conversación creada");
            const nuevo = {
              idconversation: idMensaje,
              sendBy: parseInt(sesionUser.cel),
              dateSend: luxon.DateTime.now().toLocaleString(),
              hourSend: ObtenerHora(),
              mensajeBody: "Hola",
              visto: false,
            };
            let response = await newMessageChat(nuevo);
            if (!(response >= 200 && response <= 299)) {
              notifcationToastify("El mensaje no pudo ser enviado");
            } else {
              let arrayfilter = await fillArrayChats(idMensaje);

              renderburblesChats(arrayfilter);
            }
          } else {
            notifcationToastify(
              "Ocurrió un error al intentar enviar el mensaje"
            );
          }
        }

        showSecChat();
      }
    }

    hideAnimation(ModalContacts);
  });
  inputFilterContact.addEventListener("input", (e) => {
    let filter = arraycontacts.filter((contact) =>
      contact.nomContact.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    renderContacts(filter);
  });

  const formAddUser = document.getElementById("formAddcontact");
  const txtContactCel = document.getElementById("txtContactCel");
  const txtCel = document.getElementById("txtCel");
  const lblErrorForm = document.getElementById("lblErrorForm");
  txtContactCel.addEventListener("input", (e) => {
    let valida = validateAddContact(e.target.value, txtCel.value);
    if (!valida) {
      showAnimation(lblErrorForm);
      lblErrorForm.textContent = "No dejes este campo vacío por favor";
    } else {
      HideElement(lblErrorForm);
    }
  });
  txtCel.addEventListener("input", (e) => {
    e.target.value = e.target.value.slice(0, 10);
    let valida = validateAddContact(txtContactCel.value, e.target.value);
    if (!valida) {
      showAnimation(lblErrorForm);
      lblErrorForm.textContent = "Ingrese un número de celular válido";
    } else {
      HideElement(lblErrorForm);
    }
  });

  formAddUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valida = validateAddContact(txtContactCel.value, txtCel.value);

    if (valida) {
      HideElement(lblErrorForm);
      let cel = parseInt(txtCel.value);
      let filter = arraycontacts.filter(
        (contact) =>
          contact.cel === cel || contact.nomContact === txtContactCel.value
      );
      if (filter.length != 0) {
        notifcationToastify(
          "El nombre de usuario o el número de celular ya se encuentra registrado, intentalo con otros datos por favor"
        );
      } else {
        let img = "";
        let haveImage = await getInfoUser(txtCel.value);
        if (haveImage.length != 0) {
          img = haveImage[0].url;
        }
        console.log(img);
        const newContact = {
          codeUser: sesionUser.id,
          nomContact: txtContactCel.value,
          imgContact: img,
          cel: txtCel.value,
        };

        sweetModal(
          `De querer agregar al usuario ${txtContactCel.value} a su lista de contactos`,
          "Contacto agregado correctamente",
          "Ha ocurrido un error al procesar la solicitud",
          2,
          newContact
        );
      }
    } else {
      showAnimation(lblErrorForm);
      lblErrorForm.textContent =
        "No dejes ningún campo vacío e ingresa un celular válido";
    }
  });
};

export const showSecMessages = () => {
  HideElement(SecConfig);
  showAnimation(SecMain__InfoUser);
  showAnimation(SecMain__filter);
  showAnimation(secMessages);
  showAnimation(SecMain__InfoUser);
  showAnimation(SecMain__filter);
  showAnimation(secMessages);
};

export const ActionsMessages = () => {
  imgBackSecMessages.addEventListener("click", () => {
    closeSecChat();
    HideElement(SecMain_Message);
    showAnimation(SecMain_InfoChats);
  });

  txtfilterChatMessages.addEventListener("input", (e) => {
    let array = arraymessages.filter(
      (item) =>
        item.nomContact1
          .toLowerCase()
          .startsWith(e.target.value.toLowerCase()) ||
        item.nomContact2.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setTimeout(() => {}, 200);
    renderMessages(array);
  });

  const renderInfouserConfig = () => {
    let url;
    if (sesionUser.url) {
      url = sesionUser.url;
    } else {
      url = "./sources/img/usuario.png";
    }
    SecConfig.querySelector(".imgConfig").src = url;
    SecConfig.querySelector("#txtConfigNomUser").value = sesionUser.nomUser;
    SecConfig.querySelector("#txtimgConfig").value = sesionUser.url;
    SecConfig.querySelector("#txtdesConfig").value = sesionUser.description;
  };
  btnOpenConfig.addEventListener("click", () => {
    HideElement(SecMain__InfoUser);
    HideElement(SecMain__filter);
    HideElement(secMessages);
    showAnimation(SecConfig);
    showAnimation(SecConfig);
    renderInfouserConfig();
  });
  btnCloseConfig.addEventListener("click", () => {
    showSecMessages();
  });
  btnCloseSesion.addEventListener("click", async () => {
    await sweetModal(
      "Estas a punto de cerrár sesión ¿Deseas continuar?",
      "Hasta pronto",
      "Operación cancelada",
      3
    );
    showSecMessages();
  });
  const formConfig = document.getElementById("formConfig");
  formConfig.addEventListener("submit", async (e) => {
    e.preventDefault();
    let id = sesionUser.id;
    let nomUser = SecConfig.querySelector("#txtConfigNomUser").value;
    let urlImg = SecConfig.querySelector("#txtimgConfig").value;
    let description = SecConfig.querySelector("#txtdesConfig").value;

    if (nomUser) {
      let contactos = await getContactsbyCel(sesionUser.cel);
      console.log(contactos);
      HideElement(lblErrorformConfig);
      const updateUser = {
        nomUser: nomUser,
        url: urlImg,
        description: description,
      };
      sweetModal(
        "De querer actualizar tu información",
        "Información guardada correctamente",
        "Operación cancelada",
        4,
        updateUser,
        id,
        contactos
      );
    } else {
      showAnimation(lblErrorformConfig);
      lblErrorformConfig.textContent = "No puedes dejar el campo nombre vacío";
    }
  });

  //Funcion para el click en los mensajes
  secMessages.addEventListener("click", async (e) => {
    idMensaje = e.target.getAttribute("data-idChat");
    let idChat = e.target.getAttribute("data-idMessage");
    nomUserChat = e.target.getAttribute("data-nameUser");

    if (idMensaje && idChat) {
      showSecChat();
      idMensaje = parseInt(idMensaje);
      idChat = parseInt(idChat);

      let message = await fillArrayChats(idMensaje);
      console.log(message);
      let view = false;
      message.forEach((item) => {
        if (item.id === idChat && item.sendBy != sesionUser.cel) {
          item.visto = true;
          view = true;
        }
      });
      if (view) {
        const viewmessage = {
          visto: true,
        };
        let changeview = await viewMessage(idChat, viewmessage);
        if (!(changeview >= 200 && changeview <= 299)) {
          notifcationToastify(
            "ocurrio un error al intentar procesar la solicitud"
          );
        }
      }

      setTimeout(async () => {
        await ChargeMessages();
      }, 1000);

      renderburblesChats(message);

      let arrayMensajes = await ObtainMessages();

      let infoUserchat = arrayMensajes.filter((item) => item.id === idMensaje);

      let celInfouser =
        infoUserchat[0].celContact1 != sesionUser.cel
          ? infoUserchat[0].celContact1
          : infoUserchat[0].celContact2 != sesionUser.cel
          ? infoUserchat[0].celContact2
          : sesionUser.cel;
      await renderInfoUserChat(celInfouser, nomUserChat);
    }
  });
  const VerificaInputSendMessage = (input) => {
    if (input) {
      imgSendMessage.src = "./sources/img/sendMessage.png";
    } else {
      imgSendMessage.src = "./sources/img/mic.svg";
    }
  };

  const SendMessage = async () => {
    const newMessage = {
      idconversation: idMensaje,
      sendBy: parseInt(sesionUser.cel),
      dateSend: luxon.DateTime.now().toLocaleString(),
      hourSend: ObtenerHora(),
      mensajeBody: txtinputSendMessage.value,
      visto: false,
    };
    let response = await newMessageChat(newMessage);
    if (!(response >= 200 && response <= 299)) {
      notifcationToastify("El mensaje no pudo ser enviado");
    } else {
      txtinputSendMessage.value = "";
      VerificaInputSendMessage(txtinputSendMessage.value);
      await ChargeMessages();
      let arraymensajes = await fillArrayChats(idMensaje);
      renderburblesChats(arraymensajes);
    }
  };

  txtinputSendMessage.addEventListener("input", (e) => {
    VerificaInputSendMessage(e.target.value);
  });

  //Envio de mensajes
  txtinputSendMessage.addEventListener("keyup", async (e) => {
    if (e.code === "Enter") {
      await SendMessage();
    }
  });
  //Envio de mensajes con el botón (imagen)
  btnSendImg.addEventListener("click", async () => {
    if (txtinputSendMessage.value) {
      await SendMessage();
      txtinputSendMessage.value = "";
    }
  });

  //funcion para abrir el modal de el resumen de los chats
  btnMenuSummary.addEventListener("click", async () => {
    showModalSummary(SecSummary__Chats);
    let array = await fillArrayChats(idMensaje);
    h3ConversationWith.textContent = "Mensajes con " + nomUserChat;
    renderSummaryChats(array);
  });
  btnHideModalSummary.addEventListener("click", () => {
    hideModalSummary(SecSummary__Chats);
  });

  txtfilterModalSummary.addEventListener("input", async (e) => {
    console.log(e.target.value);
    let chats = await fillArrayChats(idMensaje);
    let arrayfilter = chats.filter((mensaje) =>
      mensaje.mensajeBody.toLowerCase().includes(e.target.value.toLowerCase())
    );
    renderSummaryChats(arrayfilter);
  });
};

export const renderContacts = (array) => {
  SecContacts.innerHTML = "";
  if (array.length != 0) {
    array.forEach((contact) => {
      SecContacts.innerHTML += `
      <article class="ModalContacts__contactInfo" data-name="${
        contact.nomContact
      }">
            <figure data-name="${contact.nomContact}" data-cel="${contact.cel}">
              <img data-name="${contact.nomContact}" data-cel="${contact.cel}"
                src="${
                  contact.imgContact != ""
                    ? contact.imgContact
                    : "./sources/img/usuario.png"
                }"
                alt=""
              />
            </figure>
            <div data-name="${contact.nomContact}" data-cel="${contact.cel}">
              <h3 data-name="${contact.nomContact}" data-cel="${contact.cel}">${
        contact.nomContact
      }</h3>
              <p data-name="${contact.nomContact}" data-cel="${contact.cel}">${
        contact.cel
      }</p>
            </div>
          </article>
    `;
    });
  } else {
    SecContacts.innerHTML += ` <article class="ModalContacts__contactInfo"">
            <figure >
              <img 
                src="./sources/img/usuario.png"
                }"
                alt=""
              />
            </figure>
            <div ">
              <h3 ">Sin contactos</h3>
              <p ">¡Ingresalo! y conéctate</p>
            </div>
          </article>`;
  }
};

const ObtainNameUserChat = (
  celContact1,
  celContact2,
  nomContact1,
  nomContact2
) => {
  let nomUser =
    celContact1 != sesionUser.cel
      ? nomContact1
      : celContact2 != sesionUser.cel
      ? nomContact2
      : sesionUser.nomUser;
  return nomUser;
};

export const renderMessages = (array) => {
  secMessages.innerHTML = "";

  if (array.length != 0) {
    array.forEach(async (mensaje) => {
      let celInfo =
        mensaje.celContact1 != sesionUser.cel
          ? mensaje.celContact1
          : mensaje.celContact2 != sesionUser.cel
          ? mensaje.celContact2
          : sesionUser.cel;

      let UserInfo = await obtainInfoUserchat(celInfo);

      let chats = await fillArrayChats(mensaje.id);

      let Message = obtainInfoMessage(chats);
      secMessages.innerHTML += `
    <article class="CardMessage" data-idChat="${
      Message.IDMessage
    }" data-idMessage="${Message.id}" data-nameUser="${ObtainNameUserChat(
        mensaje.celContact1,
        mensaje.celContact2,
        mensaje.nomContact1,
        mensaje.nomContact2
      )}">
              <figure data-idChat="${Message.IDMessage}" data-idMessage="${
        Message.id
      }" data-nameUser="${ObtainNameUserChat(
        mensaje.celContact1,
        mensaje.celContact2,
        mensaje.nomContact1,
        mensaje.nomContact2
      )}">
                <img
                  src="${UserInfo.url}"
                  alt=""
                  data-idChat="${Message.IDMessage}" data-idMessage="${
        Message.id
      }" data-nameUser="${ObtainNameUserChat(
        mensaje.celContact1,
        mensaje.celContact2,
        mensaje.nomContact1,
        mensaje.nomContact2
      )}"
                />
              </figure>
              <div class="SecMain_Chat" data-idChat="${
                Message.IDMessage
              }" data-idMessage="${
        Message.id
      }" data-nameUser="${ObtainNameUserChat(
        mensaje.celContact1,
        mensaje.celContact2,
        mensaje.nomContact1,
        mensaje.nomContact2
      )}">
                <div class="infoDateChat" data-idChat="${
                  Message.IDMessage
                }" data-idMessage="${
        Message.id
      }" data-nameUser="${ObtainNameUserChat(
        mensaje.celContact1,
        mensaje.celContact2,
        mensaje.nomContact1,
        mensaje.nomContact2
      )}">
                  <h3 data-idChat="${Message.IDMessage}" data-idMessage="${
        Message.id
      }" data-nameUser="${ObtainNameUserChat(
        mensaje.celContact1,
        mensaje.celContact2,
        mensaje.nomContact1,
        mensaje.nomContact2
      )}">${ObtainNameUserChat(
        mensaje.celContact1,
        mensaje.celContact2,
        mensaje.nomContact1,
        mensaje.nomContact2
      )}</h3>
                  <h4 data-idChat="${Message.IDMessage}" data-idMessage="${
        Message.id
      }" data-nameUser="${ObtainNameUserChat(
        mensaje.celContact1,
        mensaje.celContact2,
        mensaje.nomContact1,
        mensaje.nomContact2
      )}">${Message.date}</h4>
                </div>
                <div data-idChat="${
                  Message.IDMessage
                }" class="infoCheckMessage" data-idMessage="${
        Message.id
      }" data-nameUser="${ObtainNameUserChat(
        mensaje.celContact1,
        mensaje.celContact2,
        mensaje.nomContact1,
        mensaje.nomContact2
      )}">
                  <img src="${
                    Message.visto
                      ? "./sources/img/doubleCheck.png"
                      : "./sources/img/check.svg"
                  }" alt="" data-idChat="${
        Message.IDMessage
      }" data-idMessage="${Message.id}" data-nameUser="${ObtainNameUserChat(
        mensaje.celContact1,
        mensaje.celContact2,
        mensaje.nomContact1,
        mensaje.nomContact2
      )}" class="checkMessage" />
                  <p data-idChat="${Message.IDMessage}" data-idMessage="${
        Message.id
      }" data-nameUser="${ObtainNameUserChat(
        mensaje.celContact1,
        mensaje.celContact2,
        mensaje.nomContact1,
        mensaje.nomContact2
      )}">${Message.mensaje}</p>
                </div>
              </div>
            </article>
    `;
    });
  } else {
    secMessages.innerHTML += `<article class="CardMessage">
              <figure>
                <img
                  src="./sources/img/usuario.png"
                  alt=""
                  
                />
              </figure>
              <div class="SecMain_Chat">
                <div class="infoDateChat">
                  <h3>Sin mensajes</h3>
                </div>
                <div>
                  <p>Inicia una nueva conversación</p>
                </div>
              </div>
            </article>`;
  }
};
const renderburblesChats = (array) => {
  Sec__Mensajes.innerHTML = "";
  array.forEach((chat) => {
    Sec__Mensajes.innerHTML += `<div class="burbujaMensaje ${
      chat.sendBy != sesionUser.cel ? "chatLeft" : "chatRight"
    }">
                <p>
                 ${chat.mensajeBody}
                </p>
              </div>`;
  });
};

const renderInfoUserChat = async (cel, nomUserChat) => {
  let infouser = await getInfoUser(cel);

  if (infouser.length != 0) {
    infouser.forEach((item) => {
      const imagenUserChat = document.getElementById("imagenUserChat");
      const InfoChat__texts = document.querySelector(".InfoChat__texts");
      imagenUserChat.src = item.url ? item.url : "./sources/img/usuario.png";
      InfoChat__texts.querySelector("h3").textContent = nomUserChat;
      InfoChat__texts.querySelector("p").textContent = item.status
        ? "En linea"
        : "última vez el " + item.dateConection;
    });
    return true;
  } else {
    return false;
  }
};

const renderSummaryChats = (array) => {
  SecSummaryMessages.innerHTML = "";
  if (array.length != 0) {
    array.forEach((mensaje) => {
      SecSummaryMessages.innerHTML += `<article class="CardSumaryMessage ${
        mensaje.sendBy != parseInt(sesionUser.cel)
          ? "chatSummaryLeft"
          : "chatSummaryRight"
      }">
            <h4>${mensaje.dateSend}</h4>
            <div>
              <figure>
                <img src="${
                  mensaje.visto
                    ? "./sources/img/doubleCheck.png"
                    : "./sources/img/check.svg"
                }" alt="" />
              </figure>
              <p>
                ${mensaje.mensajeBody}
              </p>
            </div>
          </article>`;
    });
  } else {
    SecSummaryMessages.innerHTML += `<article class="CardSumaryMessage">
            <h4>Sin fecha</h4>
            <div>
              <figure>
                <img src="./sources/img/doubleCheck.png" alt="" />
              </figure>
              <p>
                Sin mensajes
              </p>
            </div>
          </article>`;
  }
};

const obtainInfoUserchat = async (cel) => {
  let nomUser;
  let url = "./sources/img/usuario.png";
  let infouser = await getInfoUser(cel);
  let infoMessage = await getMessages(sesionUser.cel);

  let id = infoMessage[0].id;

  infouser.forEach((item) => {
    if (item.url) {
      url = item.url;
    }
    nomUser = item.nomUser;
  });
  return { nomUser, url, id };
};

const obtainInfoMessage = (array) => {
  if (array.length != 0) {
    let lastmessage = array[array.length - 1];
    let mensaje = cutMessage(lastmessage.mensajeBody);
    let date = lastmessage.dateSend;
    let id = lastmessage.id;
    let IDMessage = lastmessage.idconversation;
    let visto = lastmessage.visto;

    return { mensaje, date, id, IDMessage, visto };
  }
};

const cutMessage = (mensaje) => {
  let mensajecortado;
  if (mensaje) {
    if (window.innerWidth < 992) {
      mensajecortado = mensaje.slice(0, 30) + "...";
    } else {
      mensajecortado = mensaje.slice(0, 40) + "...";
    }
  } else {
    mensajecortado = "Historial de conversación guardada";
  }

  return mensajecortado;
};
