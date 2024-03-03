import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './assets/CSS/global.css'
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>
  }
])

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;
