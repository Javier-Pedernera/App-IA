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
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import translationEN from './traslate/en-US.json';
import translationES from './traslate/es-ES.json';
import translationSE from './traslate/sv-SE.json';
import translationBR from './traslate/pt-BR.json';
i18n
.use(initReactI18next)
.init({
  interpolation: { escapeValue: false },
  lng: 'es', // Idioma predeterminado
  resources: {
    en: {
      translation: translationEN,
    },
    es: {
      translation: translationES,
    },
    sv: {
      translation: translationSE,
    },
    pt: { // Cambiado a 'pt-br' para que coincida con el código del idioma
      translation: translationBR,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Suspense fallback={<Loader />}>
          <Layout />
        </Suspense>
      </RouterProvider>
    </Provider>
  </React.StrictMode>
)
