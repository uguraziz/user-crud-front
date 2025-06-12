import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import API_BASE_URL from "../Utils/api.js";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/logout`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <>
      <header>
        <nav
          className="navbar navbar-expand navbar-dark navbar-primary"
          style={{ marginLeft: 0 }}
        >
          <div className="container">
            <div className="navbar-nav">
              <Link
                to="/"
                className="nav-link text-white d-flex align-items-center"
              >
                <i className="fas fa-home mr-2"></i>
                <span className="font-weight-bold">Home</span>
              </Link>
            </div>

            {user ? (
              <div className="navbar-nav ml-auto">
                <span className="nav-link text-white d-flex align-items-center mr-3">
                  <i className="fas fa-user mr-2"></i>
                  Welcome, {user.first_name}
                </span>
                <Link
                  to="/users"
                  className="nav-link text-white d-flex align-items-center mr-3"
                >
                  <i className="fas fa-users mr-2"></i>
                  <span>Users</span>
                </Link>
                <form onSubmit={handleLogout}>
                  <button
                    type="submit"
                    className="btn btn-outline-light btn-sm"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <Link
                  to="/login"
                  className="nav-link text-white d-flex align-items-center mr-3"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="nav-link text-white d-flex align-items-center"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
