// Router.jsx
import { createBrowserRouter } from "react-router"; // ✅ fixed
import App from "../App";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Admin from "../pages/admin/Admin";

import AdminRegister from "../pages/admin/AdminRegister";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminInitial from "../pages/admin/AdminInitial";
import Products from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";
import Dashboard from "../pages/admin/dashboard";
import AddNewItem from "../pages/admin/AddNewItem";
import ProductsCollection from "../pages/ProductsCollection";
import ProductPage from "../pages/ProductPage";
import CheckoutPage from "../pages/CheckoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "collection", element: <ProductsCollection /> },
      { path: "productPage/:productId", element: <ProductPage /> },
      { path: "checkoutPage", element: <CheckoutPage /> },
    ],
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      { path: ":uid/dashboard", element: <Dashboard /> },
      { path: ":uid/products", element: <Products /> },
      { path: ":uid/orders", element: <Orders /> },
      { path: ":uid/addNewProduct", element: <AddNewItem /> },
    ],
  },
  {
    path: "adminPanel",
    element: <AdminInitial />,
  },
  { path: "adminPanel/register", element: <AdminRegister /> },
  { path: "adminPanel/login", element: <AdminLogin /> },
]);

export default router;
