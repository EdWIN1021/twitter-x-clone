import ReactDOM from "react-dom/client";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/root";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import ErrorPage from "./pages/error-page";

// import Username from "./pages/username";
import Protect from "./pages/protect";

import RootLayout from "./layouts/RootLayout";
// import HomeLayout from "./layouts/HomeLayout";

import AuthProvider from "./contexts/AuthContext";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
      {
        element: <Protect />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
        ],
      },
    ],
  },
  // {
  //   element: <Protect />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <HomeLayout />,
  //       loader: homeLayoutLoader,
  //       children: [
  //         {
  //           path: "home",
  //           element: <Home />,
  //         },
  //       ],
  //     },
  //     {
  //       path: "username",
  //       element: <Username />,
  //     },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
  // </React.StrictMode>
);
