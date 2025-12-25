import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactSession } from "react-client-session";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App"
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './context/AuthContext';
import '../index.css'
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import globalTheme from './themes/globalTheme';
import '@mdi/font/css/materialdesignicons.min.css';

// ReactSession.setStoreType("localStorage");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={globalTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode >
)
