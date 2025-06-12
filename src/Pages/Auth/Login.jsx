import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [show2FA, setShow2FA] = useState(false);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErrors({});

    const res = await fetch("api/login", {
      method: "post",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else if (data.requires_2fa) {
      setShow2FA(true);
      setMessage(data.message);
    } else {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    }
  }

  async function handle2FA(e) {
    e.preventDefault();
    setErrors({});

    const res = await fetch("/api/verify-2fa", {
      method: "post",
      body: JSON.stringify({
        code: code,
      }),
    });

    const data = await res.json();

    if (data.token) {
    setToken(data.token);
    localStorage.setItem("token", data.token);
    navigate("/");
  } else {
    if (data.errors) {
      setErrors(data.errors);
    } else if (data.message) {
      setErrors({ code: [data.message] });
    }
  }
  }

  if (show2FA) {
    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <Link to="/">
              <b>USER</b>CRUD
            </Link>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Enter 6-digit verification code</p>
              
              {message && (
                <div className="alert alert-info">
                  <i className="fas fa-info-circle mr-2"></i>
                  {message}
                </div>
              )}

              <form onSubmit={handle2FA}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength="6"
                    style={{ fontSize: "1.2rem", letterSpacing: "0.5rem" }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-key" />
                    </div>
                  </div>
                  {errors.code && (
                    <span className="error invalid-feedback d-block">
                      {errors.code[0]}
                    </span>
                  )}
                </div>
                
                <div className="row">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block">
                      <i className="fas fa-check mr-2"></i>
                      Verify Code
                    </button>
                  </div>
                </div>
              </form>

              <div className="text-center mt-3">
                <button 
                  className="btn btn-link text-muted"
                  onClick={() => {
                    setShow2FA(false);
                    setCode("");
                    setMessage("");
                    setErrors({});
                  }}
                >
                  <i className="fas fa-arrow-left mr-1"></i>
                  Back to login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal Login Form
  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to="/">
            <b>USER</b>CRUD
          </Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            
            <form onSubmit={handleLogin}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
                {errors.email && (
                  <span className="error invalid-feedback d-block">
                    {errors.email[0]}
                  </span>
                )}
              </div>
              
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
                {errors.password && (
                  <span className="error invalid-feedback d-block">
                    {errors.password[0]}
                  </span>
                )}
              </div>
              
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <Link to="/register" className="text-center d-block mt-3">
              Register a new membership
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
