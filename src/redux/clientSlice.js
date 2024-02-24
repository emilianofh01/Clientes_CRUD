import { toast } from "react-toastify";
import {
  createClient,
  deleteUser,
  getAllUsers,
  updateClient,
} from "../services/clientServices";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClient.fulfilled, (state, action) => {
        const { success, errors, data } = action.payload;

        if (success) {
          toast.success("Cliente agregado", {
            position: "bottom-right",
          });
          return [...state, data];
        } else {
          toast.error(errors.message, {
            position: "bottom-right",
          });
          return state;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        const response = action.payload.data;

        if (response.success) {
          toast.success("Cliente eliminado", {
            position: "bottom-right",
          });

          const newState = [...state].filter((e) => e.id !== action.payload.id);
          return newState;
        } else {
          toast.error(response.errors.message, {
            position: "bottom-right",
          });
        }

        return state;
      })

      // Metodos GET
      .addCase(getAllUsers.fulfilled, (state, action) => {
        // Obtener todos los usuarios
        const { data } = action.payload;
        return data;
      })

      // Metodo POST
      .addCase(updateClient.fulfilled, (state, action) => {
        const response = action.payload;

        if (response.success) {
          toast.success("Cliente Actualizado", {
            position: "bottom-right",
          });

          const updatedClient = response.data;

          let newSt = state.map((client) => client.id === updatedClient.id ? updatedClient : client);

          return newSt;
        } else {
          toast.error(response.errors.message, {
            position: "bottom-right",
          });
          return state;
        }
      });
  },
});

export default clientSlice.reducer;
