import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Root from "./pages/root";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import ErrorPage from "./pages/error-page";
import Username from "./pages/username";
import Protect from "./pages/protect";
import RootLayout from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import Main from "./components/Main";
import { PostDetail } from "./components/PostDetail";
import Public from "./pages/public";

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
                children: [
                  {
                    index: true,
                    element: <Main />,
                  },
                  {
                    path: "post/:id",
                    element: <PostDetail />,
                  },
                ],
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
  //<React.StrictMode>
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>,
  //</React.StrictMode>
);
