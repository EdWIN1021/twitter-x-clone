import ReactDOM from "react-dom/client";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/root";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import ErrorPage from "./pages/error-page";

import Username from "./pages/username";
import Protect from "./pages/protect";
import Public from "./pages/public";

import RootLayout from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";

import AuthProvider from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Public />,
        children: [
          {
            index: true,
            element: <Root />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
          {
            path: "signin",
            element: <SignIn />,
          },
        ],
      },
      {
        element: <Protect />,
        children: [
          {
            element: <HomeLayout />,
            children: [
              {
                path: "home",
                element: <Home />,
              },
            ],
          },
          {
            path: "username",
            element: <Username />,
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
  </AuthProvider>,
  // </React.StrictMode>
);
