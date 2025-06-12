import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./Context/AppContext";
import { useContext } from "react";

import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Pages/Users/Users";
import UserShow from "./Pages/Users/UserShow";
import UserCreate from "./Pages/Users/UserCreate";
import UserUpdate from "./Pages/Users/UserUpdate";

export default function App() {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-3">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/users" element={user ? <Users /> : <Login />} />
          <Route path="/users/:id" element={user ? <UserShow /> : <Login />} />
          <Route path="/users/create" element={user ? <UserCreate /> : <Login />} />
          <Route path="/users/update/:id" element={user ? <UserUpdate /> : <Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
