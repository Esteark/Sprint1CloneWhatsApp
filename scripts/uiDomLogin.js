import { showAnimation, HideElement, hideAnimation } from "./animations.js";
import { notifcationToastify, sweetModal } from "./notifications.js";
import { getInfoUsers, LogSuccesUser } from "./services.js";
import {
  closeSecChat,
  loadPhotoUser,
  ObtainMessages,
  OpenSesion,
  SecMain,
} from "./UiDomMainSec.js";
import { camposValidate, passValidate } from "./validators.js";

export let sesionUser;

export const rechargeInfoLocal = async () => {
  sesionUser = JSON.parse(localStorage.getItem("SesionUser")) || {};
};

//Pantalla login
const formLogin = document.getElementById("formLogin");
const txtcel = document.getElementById("txtcel");
const txtpass = document.getElementById("txtpass");
const lblErrorFormLogin = document.querySelector(".lblErrorFormLogin");
const SecTutorialLogin = document.getElementById("SecTutorialLogin");
const clickRegister = document.getElementById("clickRegister");
export const SecLogin = document.querySelector(".SecLogin");
//Pantalla registro
const clickBackLogin = document.getElementById("clickBackLogin");
const SecActionBackLogion = document.getElementById("SecActionBackLogion");
const formRegister = document.getElementById("formRegister");
const txtnomregister = document.getElementById("txtnomregister");
const txtcelregister = document.getElementById("txtcelregister");
const txtpassregister = document.getElementById("txtpassregister");
const txtpassconfirm = document.getElementById("txtpassconfirm");
const lblErrorFormRegister = document.querySelector(".lblErrorFormRegister");
//Preloader
export const loader = document.querySelector(".loader");

export const closeSesion = () => {
  sesionUser = {};
  localStorage.clear();
  closeSecChat();
  HideElement(SecMain);
  showAnimation(SecLogin);
  backtoLogin();
};

//luxon

//El usuario necesita regresar
export const backtoLogin = () => {
  showAnimation(formLogin);
  showAnimation(SecTutorialLogin);
  HideElement(formRegister);
  HideElement(SecActionBackLogion);
  formRegister.reset();
};

export const newAccount = () => {
  // el usuario quiere registrar una nueva cuenta
  clickRegister.addEventListener("click", () => {
    HideElement(formLogin);
    HideElement(SecTutorialLogin);
    showAnimation(formRegister);
    showAnimation(SecActionBackLogion);
  });

  clickBackLogin.addEventListener("click", () => {
    backtoLogin();
  });
};
export const logsucces = () => {
  showAnimation(loader);
  HideElement(SecLogin);
  setTimeout(() => {
    hideAnimation(loader);
  }, 3000);
};

export const eventFormLogin = () => {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    let validate = camposValidate(txtcel.value, txtpass.value);
    console.log(validate);
    if (validate) {
      let data = await getInfoUsers();
      let sesion = false;
      let iduser;
      data.forEach((user) => {
        if (txtcel.value == user.cel && txtpass.value == user.pass) {
          let date = luxon.DateTime.now().toLocaleString();
          sesionUser = {
            id: user.id,
            nomUser: user.nomUser,
            cel: user.cel,
            sesion: true,
            url: user.url,
            description: user.description,
            dateConection: date,
          };
          iduser = user.id;
          localStorage.setItem("SesionUser", JSON.stringify(sesionUser));
          sesion = true;
        }
      });
      if (sesion) {
        let login = await LogSuccesUser(iduser, { status: true });
        if (login >= 200 && login <= 299) {
          console.log("entre");
          logsucces();
          OpenSesion();
          loadPhotoUser(sesionUser.url);
          ObtainMessages();
        } else {
          notifcationToastify("Hubo un error al intentar iniciar sesión");
        }
        HideElement(lblErrorFormLogin);
      } else {
        localStorage.clear();
        showAnimation(lblErrorFormLogin);
        lblErrorFormLogin.textContent =
          "Número de celular o contraseña incorrecta";
      }
    } else {
      showAnimation(lblErrorFormLogin);
      lblErrorFormLogin.textContent =
        "Ingresa un número de celular y una contraseña válida por favor";
    }
  });
  //Evento para acortar el numero de caracteres que puede escribir el usuario
  txtcel.addEventListener("input", (e) => {
    e.target.value = e.target.value.slice(0, 10);
  });
};

export const eventFormRegister = () => {
  formRegister.addEventListener("submit", async (e) => {
    HideElement(lblErrorFormRegister);
    e.preventDefault();
    let op = 1;
    let validate = camposValidate(
      txtcelregister.value,
      txtpassregister.value,
      txtpassconfirm.value,
      txtnomregister.value,
      op
    );
    if (validate) {
      const newuser = {
        nomUser: txtnomregister.value,
        cel: txtcelregister.value,
        pass: txtpassconfirm.value,
        url: "",
        status: false,
        description: "Hey there I'm using WhatsApp",
        dateConection: "",
      };

      let users = await getInfoUsers();
      let bandera = false;

      users.forEach((user) => {
        if (user.cel == txtcelregister.value) {
          bandera = true;
        }
      });
      if (!bandera) {
        sweetModal(
          "De querer crear esta nueva cuenta",
          "Usuario creado satisfactóriamente",
          "Operación cancelada",
          1,
          newuser
        );
      } else {
        notifcationToastify(
          "El número ya se encuentra en la base de datos, intente iniciar sesión por favor"
        );
      }
    } else {
      showAnimation(lblErrorFormRegister);
      lblErrorFormRegister.textContent =
        "Ingresa toda la información solicitada por favor";
    }
  });
  txtnomregister.addEventListener("input", (e) => {
    let valida = camposValidate(
      txtcelregister.value,
      txtpassregister.value,
      txtpassconfirm.value,
      txtnomregister.value
    );
    if (!valida) {
      showAnimation(lblErrorFormRegister);
      lblErrorFormRegister.textContent =
        "Alguno de los campos estan vacíos o hay datos incorrectos";
    } else {
      HideElement(lblErrorFormRegister);
    }
  });
  txtcelregister.addEventListener("input", (e) => {
    txtcelregister.value = e.target.value.slice(0, 10);
    let valida = camposValidate(
      txtcelregister.value,
      txtpassregister.value,
      txtpassconfirm.value,
      txtnomregister.value
    );
    if (!valida) {
      showAnimation(lblErrorFormRegister);
      lblErrorFormRegister.textContent =
        "Alguno de los campos estan vacíos o hay datos incorrectos";
    } else {
      HideElement(lblErrorFormRegister);
    }
  });

  txtpassregister.addEventListener("input", (e) => {
    let valida = passValidate(txtpassconfirm.value, e.target.value);
    if (!valida) {
      showAnimation(lblErrorFormRegister);
      lblErrorFormRegister.textContent = "Las contraseñas no coinciden";
    } else {
      let validame = camposValidate(
        txtcelregister.value,
        txtpassregister.value,
        txtpassconfirm.value,
        txtnomregister.value
      );
      if (!validame) {
        showAnimation(lblErrorFormRegister);
        lblErrorFormRegister.textContent =
          "Alguno de los campos estan vacíos o hay datos incorrectos";
      } else {
        HideElement(lblErrorFormRegister);
      }
    }
  });

  txtpassconfirm.addEventListener("input", (e) => {
    let valida = passValidate(txtpassregister.value, e.target.value);
    if (!valida) {
      showAnimation(lblErrorFormRegister);
      lblErrorFormRegister.textContent = "Las contraseñas no coinciden";
    } else {
      let validame = camposValidate(
        txtcelregister.value,
        txtpassregister.value,
        txtpassconfirm.value,
        txtnomregister.value
      );
      if (!validame) {
        showAnimation(lblErrorFormRegister);
        lblErrorFormRegister.textContent =
          "Alguno de los campos estan vacíos o hay datos incorrectos";
      } else {
        HideElement(lblErrorFormRegister);
      }
    }
  });
};
