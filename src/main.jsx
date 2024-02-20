import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from "./router/root";
import './index.css'
import 'regenerator-runtime/runtime'
import Layout from './components/Layout/index.jsx';
import { Provider } from 'react-redux';
import store from "./Redux/Store/Store";
import Loader from './components/Loader/Loader.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Suspense fallback={<Loader/>}> 
          <Layout />
        </Suspense>
      </RouterProvider>
    </Provider>
  </React.StrictMode>
)
