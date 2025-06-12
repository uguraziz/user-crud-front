import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    const res = await fetch("api/register", {
      method: "post",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      setSuccessMessage(data.message);
      setTimeout(() => {
          navigate("/login");
        }, 2000);
    }
  }

  return (
    <div className="hold-transition register-page">
      <div className="register-box">
        <div className="register-logo">
          <Link to="/">
            <b>USER</b>CRUD
          </Link>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>
            {successMessage && (
              <div className="alert alert-success alert-dismissible">
                <i className="fas fa-check mr-2"></i>
                {successMessage}
                <br />
                <small>Redirecting to login page...</small>
              </div>
            )}
            <form onSubmit={handleRegister}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
                {errors.first_name && (
                  <span
                    id="exampleInputEmail1-error"
                    class="error invalid-feedback d-block"
                  >
                    {errors.first_name[0]}
                  </span>
                )}
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
                {errors.last_name && (
                  <span
                    id="exampleInputEmail1-error"
                    className="error invalid-feedback d-block"
                  >
                    {errors.last_name[0]}
                  </span>
                )}
              </div>
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
                  <span
                    id="exampleInputEmail1-error"
                    className="error invalid-feedback d-block"
                  >
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
                  <span
                    id="exampleInputEmail1-error"
                    className="error invalid-feedback d-block"
                  >
                    {errors.password[0]}
                  </span>
                )}
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype password"
                  value={formData.password_confirmation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password_confirmation: e.target.value,
                    })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
              </div>
            </form>

            <Link to="/login" className="text-center d-block mt-3">
              I already have a membership
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
