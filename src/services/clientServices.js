import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:8000/api";

const fetchData = async (endpoint, options) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
  const data = await response.json();
  return data;
};

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const data = await fetchData("/users", {});
  return data;
});

export const deleteUser = createAsyncThunk("deleteUser", async (userData) => {
  const data = await fetchData(`/users/${userData}`, {
    method: "DELETE",
  });
  return {
    data,
    id: userData,
  };
});

export const createClient = createAsyncThunk(
  "createClient",
  async (userData, {rejectWithValue}) => {
    let data = await fetchData(`/users`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!data.success) {
      return rejectWithValue(data.errors);
    }

    return data;
  }
);

export const updateClient = createAsyncThunk(
  "updateClient",
  async (userData) => {
    console.log(userData);
    const data = await fetchData(`/users/${userData.id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  }
);
