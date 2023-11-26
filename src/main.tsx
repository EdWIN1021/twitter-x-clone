import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/root";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import ErrorPage from "./pages/error-page";
import RootLayout, { Loader as layoutLoader } from "./layouts/RootLayout";
import Protect, { Loader as protectLoader } from "./pages/protect";
import AuthProvider from "./contexts/AuthContext";
import HomeLayout from "./layouts/HomeLayout";

import Explore from "./components/Explore";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: layoutLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
  {
    element: <Protect />,
    loader: protectLoader,
    children: [
      {
        element: <HomeLayout />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/explore",
            element: <Explore />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>
);
