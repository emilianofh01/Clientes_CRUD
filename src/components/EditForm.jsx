import { Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createClient, deleteUser, updateClient as update } from "../services/clientServices";
import { useDispatch } from "react-redux";

const EditForm = (props) => {
  const dispatch = useDispatch();
  const [tempData, setTempData] = useState(null);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (props.data) {
      setTempData(props.data.row);
    }
  }, [props.data]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "" };

    if (tempData.name.trim() === "") {
      newErrors.name = "El nombre no puede estar vacío";
      valid = false;
    }
    if (
      tempData.email.trim() === "" ||
      !tempData.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ) {
      newErrors.email = "El correo no puede estar vacío";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
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

  const updateClient = () => {
    if (validateForm()) {
      toast("Actualizando cliente", {
        position: "bottom-right",
      });

      dispatch(update(tempData))
      props.resetRowSelection()
    } else {
      toast.error("Corrige los errores antes de enviar el formulario", {
        position: "bottom-right",
      });
    }
  }
  
  const cleanInput = () => {
    setTempData(null);
  };

  const deleteClient = () => {
    dispatch(deleteUser(tempData.id));
    props.resetRowSelection()

  };

  const postClient = () => {
    if (validateForm()) {
      toast("Agregando cliente", {
        position: "bottom-right",
      });

      dispatch(createClient(tempData));
      props.resetRowSelection()
    } else {
      toast.error("Corrige los errores antes de enviar el formulario", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Container
      maxWidth={false}
      style={{
        background: "#272727",
        paddingBlock: 20,
        borderRadius: 10,
        display: "flex",
        justifyContent: "space-between",
        position: "sticky",
        top: 100,
        zIndex: 99,
      }}
    >
      <Container
        style={{
          display: "flex",
          gap: 20,
        }}
      >
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
      </Container>
      <Container
        style={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        {props.data && (
          <>
            <Button
              fullWidth
              variant="contained"
              size="large"
              style={{ marginLeft: 16, background: "#cc0000", color: "white" }}
              onClick={deleteClient}
            >
              Borrar
            </Button>
            <Button
              fullWidth
              variant="contained"
              size="large"
              style={{ marginLeft: 16, background: "#219de2", color: "white" }}
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
            style={{ marginLeft: 16, background: "#219de2", color: "white" }}
          >
            Crear
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default EditForm;
