import { toast } from "react-toastify";
import {
  createClient,
  deleteUser,
  getAllUsers,
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
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        const response = action.payload.data;

        console.log(response);
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
      });
  },
});

export default clientSlice.reducer;
