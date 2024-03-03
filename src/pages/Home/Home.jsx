import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import EditForm from "../../components/EditForm";
import styles from './main.module.css'

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../services/clientServices";

const Home = () => {
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

  const resetRowSelection = () => {
    setRowSelection(null);
  };

  const onSelectRow = (e) => {
    setRowSelection(e);
  };

  const filterData = () => {
    const data =
      clients.filter(
        (user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.email.toLowerCase().includes(filterValue.toLowerCase())
      ) || clients;
    return data;
  };

  const handleFilter = (e) => setFilterValue(e.target.value ?? "");

  return (
    <div className={styles.container}>
      <Header handleFilter={handleFilter}></Header>
      <Container className={[styles.wrapper]} maxWidth={false}>
        <EditForm
          resetRowSelection={resetRowSelection}
          data={rowSelection}
        ></EditForm>
        <DataGrid
          rows={filterData()}
          columns={columns}
          hideFooterPagination={true}
          pageSizeOptions={[5, 10]}
          onRowClick={onSelectRow}
        />
      </Container>
    </div>
  );
};

export default Home;
