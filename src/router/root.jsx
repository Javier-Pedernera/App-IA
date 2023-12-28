import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./public_route";
// import PrivateRoute from "./private_route";

export const router = createBrowserRouter([
    ...PublicRoute(),
  ]);