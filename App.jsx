import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home           from "./pages/Home";
import Cars           from "./pages/Cars";
import Register       from "./pages/Register";
import Invoice        from "./pages/Invoice";
import Login          from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCar         from "./pages/admin/AddCar";
import UpdateCar      from "./pages/admin/UpdateCar";
import RemoveCar      from "./pages/admin/RemoveCar";
import Orders         from "./pages/admin/Orders";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/cars"          element={<Cars />} />
        <Route path="/register"      element={<Register />} />
        <Route path="/invoice/:id"   element={<Invoice />} />
        <Route path="/login"         element={<Login />} />
        <Route path="/admin"         element={<AdminDashboard />} />
        <Route path="/admin/add"     element={<AddCar />} />
        <Route path="/admin/update"  element={<UpdateCar />} />
        <Route path="/admin/remove"  element={<RemoveCar />} />
        <Route path="/admin/orders"  element={<Orders />} />
        <Route path="*"              element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
