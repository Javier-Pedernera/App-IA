import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from "./router/root";
import App from './App.jsx'
import './index.css'
import Landing from './components/Landing/index.jsx'
import 'regenerator-runtime/runtime'
import Layout from './components/Layout/index.jsx';
import { Provider } from 'react-redux';
import store from "./Redux/Store/Store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}>
        {/* <Layout/> */}
          {/* <Landing /> */}
        </RouterProvider>
      </Provider>
  </React.StrictMode>
)
