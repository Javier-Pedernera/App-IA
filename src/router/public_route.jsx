import { Navigate } from "react-router-dom";
import Home from "../components/Home/Home.jsx"
import Landing from "../components/Landing/index.jsx";
// import Login from "../features/Login/Login";
// import Register from "../features/Register/Registro";

export default function publicRoute() {
    return [
        
        { 
                path: "/home",
                element: <Home /> 
            },
            { 
            path: "/landing",
            element: <Landing /> 
        },
        {
            path: "*", 
            element: <Navigate to="/landing" replace /> 
        },
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