import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/root";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import ErrorPage from "./pages/error-page";

import Username from "./pages/username";
import Protect, { Loader as protectLoader } from "./pages/protect";

import RootLayout, { Loader as rootLayoutLoader } from "./layouts/RootLayout";
import HomeLayout, { Loader as homeLayoutLoader } from "./layouts/HomeLayout";

import AuthProvider from "./contexts/AuthContext";

import Explore from "./components/Explore";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: rootLayoutLoader,
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
        loader: homeLayoutLoader,
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
      {
        path: "/username",
        element: <Username />,
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
