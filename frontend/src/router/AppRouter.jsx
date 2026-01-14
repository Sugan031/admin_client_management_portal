import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Clients from "../pages/Clients";
import CreateClient from "../pages/CreateClient";
import EditClient from "../pages/EditClient";
import AppLayout from "../layouts/AppLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/clients"
          element={
            <AppLayout>
              <Clients />
            </AppLayout>
          }
        />

        <Route
          path="/clients/create"
          element={
            <AppLayout>
              <CreateClient />
            </AppLayout>
          }
        />

        <Route
          path="/clients/:id/edit"
          element={
            <AppLayout>
              <EditClient />
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
