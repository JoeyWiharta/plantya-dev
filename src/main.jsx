import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "../src/App"
import { AuthProvider } from './context/AuthContext';
import { ThemeProviderCustom } from './context/ThemeContext';
import "./index.css"

const basename = import.meta.env.DEV ? "/chlora" : "/chlora"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <ThemeProviderCustom>   {/* ✅ WAJIB */}
          <App />
        </ThemeProviderCustom>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);