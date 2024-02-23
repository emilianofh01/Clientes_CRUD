import {
  AppBar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

const Header = (props) => {
  return (
    <AppBar position="sticky">
      <Toolbar style={{
        paddingBlock: 10
      }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gestor de clientes
        </Typography>
        <TextField
          InputLabelProps={{style: {}, hidden: true}}
          onChange={(e)=>props.handleFilter(e)}
          variant="outlined"
          hiddenLabel
          label="Buscar..."
          style={{
            paddingBottom:0
          }}
        ></TextField>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
