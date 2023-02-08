//Validación para el form de registro

export const camposValidate = (
  cel = "",
  pass1 = "",
  pass2 = "",
  nom = "",
  op = 0
) => {
  let valida = false;
  console.log(op);
  if (op == 0) {
    if (cel) {
      if (cel.length == 10) {
        if (pass2) {
          pass2 == pass1 ? (valida = true) : (valida = false);
          console.log(valida);
        } else {
          pass1 ? (valida = true) : (valida = false);
          console.log(valida);
        }
      } else {
        valida = false;
      }
    }
  } else {
    if (nom) {
      if (cel) {
        if (cel.length == 10) {
          if (pass2) {
            pass2 == pass1 ? (valida = true) : (valida = false);
          } else {
            pass1 ? (valida = true) : (valida = false);
          }
        } else {
          valida = false;
        }
      }
    }
  }

  return valida;
};

export const passValidate = (pass1 = "", pass2 = "") => {
  let valida = false;
  if (pass1.length != 0 || pass2.length != 0) {
    pass1 == pass2 ? (valida = true) : (valida = false);
  }
  return valida;
};

//Validación para el formulario de AddContacto

export const validateAddContact = (nom = "", cel = "") => {
  let valida = false;
  if (nom) {
    if (cel) {
      if (cel.length == 10) {
        valida = true;
      } else {
        valida = false;
      }
    } else {
      valida = false;
    }
  }
  return valida;
};
