import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Admin from "./pages/admin/Admin.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import { path } from "motion/react-client";
import AdminRegister from "./pages/admin/AdminRegister.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "admin",
    element: <Admin />, // Only for /admin
  },
  {
    path: "admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "admin/register",
    element: <AdminRegister />,
  },
  {
    path: "admin/login",
    element: <AdminLogin />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </Provider>
);
