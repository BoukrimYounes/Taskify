import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Layout from "../pages/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <Error />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <Layout />, // Wrap routes with Layout
    errorElement: <Error />,
    children: [
      {
        path: "home",
        element: <Home />,
        errorElement: <Error />,
      },
    ],
  },
]);
