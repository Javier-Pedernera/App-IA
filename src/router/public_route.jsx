import { Navigate } from "react-router-dom";
import Home from "../components/Home/Home.jsx"
import Landing from "../components/Landing/index.jsx";
import Layout from "../components/Layaout/index.jsx";
// import Login from "../features/Login/Login";
// import Register from "../features/Register/Registro";

export default function publicRoute() {
    return [
        
        // {
        //         path: "/home/:storedThreadId",
        //         element: <Home /> 
        //     },
        //     { 
        //     path: "/landing",
        //     element: <Layout /> 
        // },
        // {
        //     path: "*", 
        //     element: <Navigate to="/landing" replace /> 
        // },
        
        // { 
        //     path: "/login",
        //     element: <Login /> 
        // },
        // { 
        //     path: "/register",
        //     element: <Register /> 
        // },
        // {
        //     path: "*", 
        //     element: <Navigate to="/login" replace /> 
        // },
    ];
}