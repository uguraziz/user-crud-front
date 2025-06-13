import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../Utils/api.js";

export default function Users() {
  const { token } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  // filtre inputları için state
  const [searchFilters, setSearchFilters] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

   useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(currentPage);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage, searchFilters]);

  const fetchUsers = async (page) => {
    let url = `${API_BASE_URL}/users?page=${page}&per_page=20`;
    Object.keys(searchFilters).forEach((key) => {
      const value = searchFilters[key];
      if (value && value.trim() !== "") {
        url += `&filter[${key}]=${encodeURIComponent(value.trim())}`;
      }
    });

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      setUsers(data.data || []);
      setPagination(data.meta || {});
    }
  };

  async function handleDeleteUser(userId, userName) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${userName} ?\n\nThis action cannot be undone.`
    );
    if (!confirmDelete) {
      return;
    }

    const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      fetchUsers(currentPage);
    } else {
      const errorData = await res.json();
      alert(`Error deleting user: ${errorData.message || "Unknown error"}`);
    }
  }

  const handleFilterChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-fluid py-3">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6 col-12 mb-2 mb-md-0">
              <h3 className="card-title mb-0">
                <i className="fas fa-users mr-2"></i>
                Users Management
              </h3>
            </div>
            <div className="col-md-6 col-12">
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-end">
                {/* Add User Button */}
                <Link
                  to="/users/create"
                  className="btn btn-success btn-sm mb-2 mb-md-0 mr-md-3"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add User
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 6 filtre inputu */}
        <div className="card-body border-bottom">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group mb-2">
                <label className="form-label small">First Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="First name"
                  value={searchFilters.first_name}
                  onChange={(e) => handleFilterChange("first_name", e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group mb-2">
                <label className="form-label small">Last Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Last name"
                  value={searchFilters.last_name}
                  onChange={(e) => handleFilterChange("last_name", e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group mb-2">
                <label className="form-label small">Email</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Email"
                  value={searchFilters.email}
                  onChange={(e) => handleFilterChange("email", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive-sm">
            <table className="table table-striped table-hover">
              <thead className="bg-light">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Gender</th>
                  <th style={{ width: "15%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <strong>{user.first_name}</strong>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <strong>{user.last_name}</strong>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-primary">{user.email}</span>
                        {user.email_verified_at && (
                          <i
                            className="fas fa-check-circle text-success ml-1"
                            title="Verified"
                          ></i>
                        )}
                      </td>
                      <td>{user.phone || "N/A"}</td>
                      <td>
                        <i className="fas fa-globe mr-1"></i>
                        {user.country}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            user.gender === "male"
                              ? "badge-info"
                              : user.gender === "female"
                              ? "badge-warning"
                              : "badge-secondary"
                          }`}
                        >
                          {user.gender}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link to={`/users/${user.id}`}>
                            <button
                              className="btn btn-info btn-sm"
                              title="View"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                          </Link>
                          <Link to={`/users/update/${user.id}`}>
                            <button
                              className="btn btn-warning text-white btn-sm"
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            title="Delete"
                            onClick={() =>
                              handleDeleteUser(user.id, user.full_name)
                            }
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      <i className="fas fa-users fa-3x text-muted mb-3"></i>
                      <p className="text-muted">No users found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {pagination.last_page > 1 && (
          <div className="card-footer">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted">
                Showing {pagination.from} to {pagination.to} of{" "}
                {pagination.total} entries
              </div>
              <ul className="pagination pagination-sm m-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    « Previous
                  </button>
                </li>

                {currentPage > 3 && (
                  <>
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </button>
                    </li>
                    {currentPage > 4 && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                  </>
                )}

                {[...Array(5)].map((_, index) => {
                  const page = currentPage - 2 + index;
                  if (page > 0 && page <= pagination.last_page) {
                    return (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </li>
                    );
                  }
                  return null;
                })}

                {currentPage < pagination.last_page - 2 && (
                  <>
                    {currentPage < pagination.last_page - 3 && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pagination.last_page)}
                      >
                        {pagination.last_page}
                      </button>
                    </li>
                  </>
                )}

                <li
                  className={`page-item ${
                    currentPage === pagination.last_page ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.last_page}
                  >
                    Next »
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}