import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import React from 'react'
import { BrowserRouter } from "react-router-dom";
import "@fontsource/roboto";          // Regular 400
import "@fontsource/roboto/500.css";  // Medium
import "@fontsource/roboto/700.css";  // Bold


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
