import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import API_BASE_URL from "../../utils/api.js";

export default function UserShow() {
  const { token } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [notFound, setNotFound] = useState(false);

  async function getUser() {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setUsers(data.data);
    } else if (res.status === 404) {
      setNotFound(true);
    }
  }

  async function handleDeleteUser(e) {
    e.preventDefault();

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${users.first_name} ${users.last_name}?\n\nThis action cannot be undone.`
    );
    if (!confirmDelete) {
      return;
    }

    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      navigate("/users");
    } else {
      // Hata durumu
      const errorData = await res.json();
      alert(`Error deleting user: ${errorData.message || "Unknown error"}`);
    }
  }

  useEffect(() => {
    getUser();
  }, [id]);

  // User bulunamadı
  if (notFound) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="fas fa-user-times fa-5x text-muted mb-4"></i>
                <h2 className="text-muted">User Not Found</h2>
                <p className="lead text-muted mb-4">
                  The user you are looking for does not exist or has been
                  removed.
                </p>
                <Link to="/users" className="btn btn-primary">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Users
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading kontrolü - User yüklenene kadar
  if (!users) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="fas fa-spinner fa-spin fa-2x text-primary mb-3"></i>
                <p>Loading user details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Link to="/users" className="btn btn-secondary">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Users
            </Link>
            <h2 className="mb-0">
              <i className="fas fa-user mr-2"></i>
              User Details
            </h2>
          </div>

          {/* User Profile Card */}
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">
                <i className="fas fa-user-circle mr-2"></i>
                {users.first_name} {users.last_name}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                {/* Sol Kolon */}
                <div className="col-md-6">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-id-card mr-2 text-primary"></i>
                          User ID:
                        </td>
                        <td>{users.id}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-user mr-2 text-primary"></i>
                          First Name:
                        </td>
                        <td>{users.first_name}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-user mr-2 text-primary"></i>
                          Last Name:
                        </td>
                        <td>{users.last_name}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-envelope mr-2 text-primary"></i>
                          Email:
                        </td>
                        <td>
                          {users.email}
                          {users.email_verified_at && (
                            <i
                              className="fas fa-check-circle text-success ml-2"
                              title="Verified"
                            ></i>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-id-badge mr-2 text-primary"></i>
                          National ID:
                        </td>
                        <td>{users.national_id}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-phone mr-2 text-primary"></i>
                          Phone:
                        </td>
                        <td>{users.phone || "N/A"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Sağ Kolon */}
                <div className="col-md-6">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-venus-mars mr-2 text-primary"></i>
                          Gender:
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              users.gender === "male"
                                ? "badge-info"
                                : users.gender === "female"
                                ? "badge-warning"
                                : "badge-secondary"
                            }`}
                          >
                            {users.gender}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-birthday-cake mr-2 text-primary"></i>
                          Date of Birth:
                        </td>
                        <td>
                          {new Date(users.date_of_birth).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-globe mr-2 text-primary"></i>
                          Country:
                        </td>
                        <td>{users.country}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-city mr-2 text-primary"></i>
                          City:
                        </td>
                        <td>{users.city}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                          District:
                        </td>
                        <td>{users.district}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <i className="fas fa-money-bill mr-2 text-primary"></i>
                          Currency:
                        </td>
                        <td>{users.currency}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Address */}
              <div className="row mt-3">
                <div className="col-12">
                  <h5 className="border-bottom pb-2">
                    <i className="fas fa-home mr-2 text-primary"></i>
                    Address Information
                  </h5>
                  <p className="mb-2">
                    <strong>Address:</strong> {users.address}
                  </p>
                  <p className="mb-0">
                    <strong>Postal Code:</strong> {users.postal_code}
                  </p>
                </div>
              </div>

              {/* Roles */}
              {users.roles && users.roles.length > 0 && (
                <div className="row mt-3">
                  <div className="col-12">
                    <h5 className="border-bottom pb-2">
                      <i className="fas fa-user-tag mr-2 text-primary"></i>
                      Roles
                    </h5>
                    {users.roles.map((role, idx) => (
                      <span key={idx} className="badge badge-success mr-2">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="row mt-4">
                <div className="col-12">
                  <h5 className="border-bottom pb-2">
                    <i className="fas fa-clock mr-2 text-primary"></i>
                    Account Information
                  </h5>
                  <div className="row">
                    <div className="col-md-6">
                      <p className="mb-1">
                        <strong>Created:</strong>{" "}
                        {new Date(users.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1">
                        <strong>Last Updated:</strong>{" "}
                        {new Date(users.updated_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <div className="btn-group">
                <Link to={`/users/update/${users.id}`}>
                  <button className="btn btn-warning mr-3">
                    <i className="fas fa-edit mr-2"></i>
                    Edit User
                  </button>
                </Link>
                <form onSubmit={handleDeleteUser}>
                  <button className="btn btn-danger">
                    <i className="fas fa-trash mr-2"></i>
                    Delete User
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
