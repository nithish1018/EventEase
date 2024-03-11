import HomePage from "./pages/HomePage";
import NewAppointment from "./pages/NewAppointment";
import NavBar from "./components/NavBar";
import EditAppointment from "./pages/EditAppointment";
import DeleteAppointment from "./pages/DeleteAppointment";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext";
import LandingPage from "./pages/LandingPage";
import React from "react";
import "./i18n";

const App = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to={"/landing"} />} />
          <Route path="/landing" element={!user ? <LandingPage /> : <Navigate to={"/"} />} />
          <Route path="/new/:selectedDay" element={user ? <NewAppointment /> : <Navigate to={"/login"} />} />
          <Route path="/edit/:appointmentID" element={user ? <EditAppointment /> : <Navigate to={"/login"} />} />
          <Route path="/delete/:appointmentID" element={user ? <DeleteAppointment /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to={"/"} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;