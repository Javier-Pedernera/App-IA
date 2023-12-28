import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from "./router/root";
import App from './App.jsx'
import './index.css'
import Landing from './components/Landing/index.jsx'
import 'regenerator-runtime/runtime'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
      {/* <Provider store={store}> */}
        <RouterProvider router={router}>
          <Landing />
        </RouterProvider>
      {/* </Provider> */}
    {/* </ThemeProvider> */}
  </React.StrictMode>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
)
