import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AppContext);

  return (
    <div className="container-fluid">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-12 col-md-10 col-lg-8">
          {/* Ana Başlık Card */}
          <div className="card card-outline card-primary shadow-lg border-0">
            <div className="card-body text-center py-5">
              <div className="mb-4">
                <i
                  className="fas fa-users text-primary"
                  style={{ fontSize: "4rem" }}
                ></i>
              </div>
              <h1 className="display-4 font-weight-bold text-primary mb-3">
                USER CRUD PROJECT
              </h1>

              {user ? (
                <div className="text-center">
                  <div
                    className="alert alert-success"
                    style={{ fontSize: "1.2rem" }}
                  >
                    <i className="fas fa-check-circle mr-2"></i>
                    Welcome back, <strong>{user.full_name}</strong>!
                  </div>
                  <p className="lead text-muted mb-4">
                    You are successfully logged in to the system.
                  </p>

                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <Link to="/users" className="text-decoration-none">
                        <div className="info-box bg-info hover-shadow">
                          <span className="info-box-icon">
                            <i className="fas fa-users"></i>
                          </span>
                          <div className="info-box-content">
                            <span className="info-box-text text-white font-weight-bold">
                              Manage Users
                            </span>
                            <span className="info-box-number text-white">
                              View & Edit
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="lead text-muted mb-4">
                    Kullanıcı yönetim sistemi ile kullanıcıları kolayca yönetin
                  </p>
                  <div className="row justify-content-center">
                    <div className="col-md-5 mb-3">
                      <Link to="/login" className="text-decoration-none">
                        <div className="info-box bg-primary hover-shadow">
                          <span className="info-box-icon">
                            <i className="fas fa-sign-in-alt"></i>
                          </span>
                          <div className="info-box-content">
                            <span className="info-box-text text-white font-weight-bold">
                              Giriş Yap
                            </span>
                            <span className="info-box-number text-white">
                              Login
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-5 mb-3">
                      <Link to="/register" className="text-decoration-none">
                        <div className="info-box bg-success hover-shadow">
                          <span className="info-box-icon">
                            <i className="fas fa-user-plus"></i>
                          </span>
                          <div className="info-box-content">
                            <span className="info-box-text text-white font-weight-bold">
                              Kayıt Ol
                            </span>
                            <span className="info-box-number text-white">
                              Register
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
