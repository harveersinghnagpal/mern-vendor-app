import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";  // ✅ Import Cart Page
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";  // ✅ Import Cart Context

function App() {
  return (
    <CartProvider>  {/* ✅ Wrap everything inside CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/menu/:vendorId" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />  {/* ✅ Add Cart Route */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
