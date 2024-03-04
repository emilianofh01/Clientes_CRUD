import styles from "../assets/CSS/EditForm.module.css";
import {
  Button,
  Container,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createClient,
  deleteUser,
  updateClient as update,
} from "../services/clientServices";
import { useDispatch } from "react-redux";
import AngleDown from "../assets/IMG/Icons/angle-down";

const EditForm = (props) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const [tempData, setTempData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (props.data) {
      setTempData(props.data.row);
      setIsVisible(true);
    }
  }, [props.data]);

  const validateForm = (func) => {
    // Desestructuración de tempData
    const { name, email } = tempData;

    // Validar si el nombre y el correo cumplen con el formato.
    const nameIsValid = name.trim();
    const emailIsValid = email.match(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    );

    // Asignar errores
    const newErrors = { name: "", email: "" };
    newErrors.name = nameIsValid ? "" : "El nombre no puede estar vacío";
    newErrors.email = emailIsValid ? "" : "El correo electrónico no es válido";
    setErrors(newErrors);

    // Mostrar mensaje de error y retornar si hay errores
    if (!nameIsValid || !emailIsValid) {
      toast.error("Corrige los errores antes de enviar el formulario", {
        position: "bottom-right",
      });
      return;
    }

    // Ejecutar la función proporcionada
    func();
  };

  const changeName = (e) => {
    setTempData({
      ...tempData,
      name: e.target.value,
    });

    setErrors({ ...errors, name: "" });
  };

  const changeEmail = (e) => {
    setTempData({
      ...tempData,
      email: e.target.value,
    });

    setErrors({ ...errors, email: "" });
  };

  const cleanInput = () => {
    setTempData(null);
    props.resetRowSelection();
  };

  const toggleVisibility = () => {
    cleanInput();
    setIsVisible(!isVisible);
  };

  const updateClient = () => {
    validateForm(() => {
      dispatch(update(tempData));
      cleanInput();
    });
  };

  const deleteClient = () => {
    dispatch(deleteUser(tempData.id));
    cleanInput();
  };

  const postClient = () => {
    validateForm(() => {
      dispatch(createClient(tempData));
      cleanInput();
    });
  };

  return (
    <div
      className={`${styles.container} ${
        (props.data || isVisible) && styles.isVisible
      }`}
    >
      <div className={[styles.form_wrapper]}>
        <div className={[styles.form]}>
          <div className={[styles.textfield_container]}>
            <TextField
              fullWidth={true}
              value={tempData?.name ?? ""}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              onChange={changeName}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              fullWidth={true}
              value={tempData?.email ?? ""}
              id="outlined-basic"
              label="Correo"
              variant="outlined"
              onChange={changeEmail}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </div>
          <div className={[styles.btns_container]}>
            {props.data && (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  id={styles.deleteBtn}
                  // className={[styles.btns]}
                  className={styles.btns}
                  onClick={deleteClient}
                >
                  Borrar
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  id={styles.updateBtn}
                  className={styles.btns}
                  onClick={updateClient}
                >
                  Actualizar
                </Button>
              </>
            )}

            {!props.data && (
              <Button
                onClick={postClient}
                fullWidth
                variant="contained"
                size="large"
                className={styles.btns}
                id={styles.createBtn}
              >
                Crear
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className={[styles.toggle_container]}>
        <Tooltip
          title={
            props.data || isVisible ? "Cerrar formulario" : "Abrir formulario"
          }
        >
          <div onClick={toggleVisibility}>
            <AngleDown style={styles.toggle} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default EditForm;
