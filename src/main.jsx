import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "../src/App"
import createAppTheme from './themes';
import { AuthProvider } from './context/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css'
import '@mdi/font/css/materialdesignicons.min.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './styles/index.scss'
import { ThemeProviderCustom } from './context/ThemeContext';

const Root = () => {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() =>
    createAppTheme(mode),
    [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === "dark" ? "light" : "dark"))
  }

  // theme bug not undefined
  return (
    <BrowserRouter basename="/plantya">
      <AuthProvider>
        <ThemeProviderCustom>
          {(theme) => (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          )}
        </ThemeProviderCustom>
      </AuthProvider>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);  