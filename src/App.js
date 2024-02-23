import { ThemeProvider } from "@emotion/react";
import Header from "./components/Header";
import { Container, createTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditForm from "./components/EditForm";
import { useEffect, useState } from "react";
import { getAllUsers } from "./services/clientServices";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BASE_URL = "localhost:8000/api";

function App() {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.user);
  const [filterValue, setFilterValue] = useState("");
  const [rowSelection, setRowSelection] = useState(null);
  const columns = [
    { field: "id", headerName: "UUID", flex: 1 },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      dispatch(getAllUsers());
    } catch (err) {
      console.log(err);
    }
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const onSelectRow = (e) => {
    setRowSelection(e);
  };

  const filterData = () => {
    console.log(clients);
    const data =
      clients.filter(
        (user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.email.toLowerCase().includes(filterValue.toLowerCase())
      ) || clients;
    console.log(data);
    return data;
  };

  const handleFilter = (e) => setFilterValue(e.target.value ?? "");

  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{
          paddingInline: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
        maxWidth={false}
      >
        <Header handleFilter={handleFilter}></Header>
        <Container
          style={{
            flex: 1,
            background: "#1b1b1b",
            paddingBlock: 20,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
          maxWidth={false}
        >
          <EditForm data={rowSelection}></EditForm>
          <DataGrid
            rows={filterData()}
            columns={columns}
            hideFooterPagination={true}
            pageSizeOptions={[5, 10]}
            onRowClick={onSelectRow}
          />
        </Container>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
