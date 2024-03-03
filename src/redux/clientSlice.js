import {
  createClient,
  deleteUser,
  getAllUsers,
  updateClient,
} from "../services/clientServices";
import { createSlice } from "@reduxjs/toolkit";
import { hideLoadingToast, showToast } from "../services/toastService";

const initialState = [];

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: async (builder) => {
    // Crear cliente
    builder
      .addCase(createClient.pending, (state, action) => {
        hideLoadingToast();

        showToast({
          message: "Agregando cliente...",
          options: { position: "bottom-right", type: "loading" },
        });
      })
      .addCase(createClient.rejected, (state, action) => {
        showToast({
          options: {
            position: "bottom-right",
            type: "error",
            isLoading: false,
            render: action.payload.message,
          },
        });
      })
      .addCase(createClient.fulfilled, (state, action) => {
        const { data } = action.payload;
        showToast({
          options: {
            position: "bottom-right",
            type: "success",
            render: "¡Cliente agregado!",
          },
        });
        return [...state, data];
      })

      // Borrar cliente
      .addCase(deleteUser.pending, (state, action) => {
        hideLoadingToast();

        showToast({
          message: "Borrando cliente...",
          options: { position: "bottom-right", type: "loading" },
        });
      })
      .addCase(deleteUser.rejected, (state, action) => {
        showToast({
          options: {
            position: "bottom-right",
            type: "error",
            isLoading: false,
            render: action.payload.message,
          },
        });
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        showToast({
          message: "Cliente eliminado",
          options: {
            position: "bottom-right",
            type: "success",
            render: "¡Cliente eliminado!",
          },
        });

        const newState = [...state].filter((e) => e.id !== action.payload.id);
        return newState;
      })

      // Obtener cliente
      .addCase(getAllUsers.pending, (state, action) => {
      })
      .addCase(getAllUsers.rejected, (state, action) => {
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        // Obtener todos los usuarios
        const { data } = action.payload;
        return data;
      })

      // Actualizar cliente
      .addCase(updateClient.pending, (state, action) => {
        hideLoadingToast();
        showToast({
          message: "Actualizando datos del cliente",
          options: { position: "bottom-right", type: "loading" },
        });
      })
      
      .addCase(updateClient.rejected, (state, action) => {
        showToast({
          options: {
            position: "bottom-right",
            type: "error",
            isLoading: false,
            render: action.payload.message,
          },
        });
      })

      .addCase(updateClient.fulfilled, (state, action) => {
        const response = action.payload;

        const updatedClient = response.data;
        let newSt = state.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        );

        showToast({
          options: {
            position: "bottom-right",
            type: "success",
            render: "Cliente actualizado",
          },
        });
        return newSt;
      });
  },
});

export default clientSlice.reducer;
