import Home from "../components/Home/Home.jsx"
import Landing from "../components/Landing/index.jsx";
import Layout from "../components/Layout/index.jsx";
import FAQPage from "../components/FAQPage/index.jsx";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children:[
        {
            path: "/landing",
            element: <Landing />
        },
        {
            path: "/home/:storedThreadId",
            element: <Home />
        },
        {
            path: '/faq',
            element: <FAQPage />
        },
        {
            path: "*",
            element: <Navigate to="/landing" replace />
        }
    ]
}
  // ...PublicRoute(),
]);