import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Itempage from "./pages/Itempage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Customerpage from "./pages/Customerpage";
import Billpages from './pages/Billpages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute>
              <Itempage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/Customers"
          element={
            <ProtectedRoute>
              <Customerpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bills"
          element={
            <ProtectedRoute>
              <Billpages/>
            </ProtectedRoute>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children; // Render the children components.
  } else {
    return <Navigate to="/Login" />; // Redirect to the Login page.
  }
}
