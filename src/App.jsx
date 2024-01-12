/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/Order/order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import PageNotFound from "./pages/Admin/PageNotFound/PageNotFound";
import MyState from "./context/data/myState";
import Login from "./pages/Registration/Login";
import Signup from "./pages/Registration/Signup";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import AddProduct from "./pages/Admin/Page/AddProduct";
import UpdateProduct from "./pages/Admin/Page/UpdateProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allproducts from "./pages/allproducts/Allproducts";
import { AuthProvider } from "./context/Auth/AuthContext";

export default function App() {
  return (
    <MyState>
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer />
      </Router>
      </AuthProvider>
    </MyState>
  );
}

//user

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

//admin
export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  if (admin.user.email === "krishna@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
