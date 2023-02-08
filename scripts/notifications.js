import {
  addContact,
  createNewUser,
  getInfoUser,
  UpdateInfoContact,
  updateInfoUser,
} from "./services.js";
import { backtoLogin, closeSesion, sesionUser } from "./uiDomLogin.js";
import {
  contactAgregadoSuccess,
  lastChangesSesionUser,
  showSecMessages,
} from "./UiDomMainSec.js";

export const notifcationToastify = (mensaje) => {
  Toastify({
    text: `${mensaje}`,
    duration: 3000,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

export const sweetModal = (
  mensaje,
  opciontrue,
  opcionfalse,
  op,
  data = {},
  id = "",
  contacts = []
) => {
  Swal.fire({
    title: "Te encuentras completamente seguro?",
    text: `${mensaje}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#00a884",
    cancelButtonColor: "#ff7070f7",
    confirmButtonText: "SÍ",
    cancelButtonText: "NO, atras!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      switch (op) {
        case 1:
          let response = await createNewUser(data);
          console.log(response);
          if (response >= 200 && response <= 299) {
            Swal.fire("Creado", `${opciontrue}`, "success");
            backtoLogin();
          } else {
            notifcationToastify(
              "Ocurrió un error al intentar procesar la solicitud"
            );
          }
          break;

        case 2:
          let result = await addContact(data);

          if (result >= 200 && result <= 299) {
            Swal.fire("Creado", `${opciontrue}`, "success");
            contactAgregadoSuccess();
          } else {
            notifcationToastify(
              "Ocurrió un error al intentar procesar la solicitud"
            );
          }
          break;

        case 3:
          Swal.fire("Sesión cerrada", `${opciontrue}`, "success");
          let dateConection = luxon.DateTime.now().toLocaleString();
          console.log(dateConection);
          let closeResponse = await updateInfoUser(sesionUser.id, {
            status: false,
            dateConection,
          });
          if (closeResponse >= 200 && closeResponse <= 299) {
            closeSesion();
          } else {
            notifcationToastify(
              "Ha ocurrido un error al intentar cerrar su sesión"
            );
          }
          break;

        case 4:
          let respuesta = await updateInfoUser(id, data);
          if (respuesta >= 200 && respuesta <= 299) {
            Swal.fire("Actualizado", `${opciontrue}`, "success");
            let infouser = await getInfoUser(sesionUser.cel);
            lastChangesSesionUser(infouser[0]);
            showSecMessages();
            contacts.forEach(async (contact, index) => {
              const newinfo = {
                imgContact: sesionUser.url,
              };
              console.log(newinfo);
              console.log(contact.id);
              await UpdateInfoContact(contact.id, newinfo);
              if (index === contacts.length - 1) {
                notifcationToastify(
                  "Su información tambien se acaba de actualizar para sus contactos"
                );
              }
            });
          } else {
            notifcationToastify(
              "Ocurrió un error al intentar procesar la solicitud"
            );
          }
          break;
      }
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire("Cancelada", `${opcionfalse}`, "error");
    }
  });
};
