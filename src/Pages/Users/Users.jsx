import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../Utils/api.js";

export default function Users() {
  const { user: currentUser, token } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [inputFilters, setInputFilters] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    gender: ""
  });
  const [searchFilters, setSearchFilters] = useState(inputFilters);

  const [totalUsers, setTotalUsers] = useState(null);
  const perPage = 20;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchFilters(inputFilters);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputFilters]);

  useEffect(() => {
    fetchUsers(currentPage, searchFilters);
  }, [currentPage, searchFilters]);

  useEffect(() => {
    fetchCount();
  }, [token]);

  const fetchUsers = async (page, filters = searchFilters) => {
    let url = `${API_BASE_URL}/users?page=${page}&per_page=${perPage}`;
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
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
    }
  };

  const fetchCount = async () => {
    const res = await fetch(`${API_BASE_URL}/users/count`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const count = await res.json();
    setTotalUsers(Number(count));
  };

  const handleFilterChange = (field, value) => {
    setInputFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  async function handleDeleteUser(userId, userName) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${userName} ?\n\nThis action cannot be undone.`
    );
    if (!confirmDelete) return;

    const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      fetchUsers(currentPage, searchFilters);
      fetchCount(); // sadece silme işleminden sonra!
    } else {
      const errorData = await res.json();
      alert(`Error deleting user: ${errorData.message || "Unknown error"}`);
    }
  }

  const totalPages = totalUsers ? Math.ceil(totalUsers / perPage) : 1;
  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalUsers || 0);

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

        <div className="card-body border-bottom">
          <div className="row">
            <div className="col-md-2">
              <div className="form-group mb-2">
                <label className="form-label small">First Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="First name"
                  value={inputFilters.first_name}
                  onChange={(e) => handleFilterChange("first_name", e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group mb-2">
                <label className="form-label small">Last Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Last name"
                  value={inputFilters.last_name}
                  onChange={(e) => handleFilterChange("last_name", e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group mb-2">
                <label className="form-label small">Email</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Email"
                  value={inputFilters.email}
                  onChange={(e) => handleFilterChange("email", e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group mb-2">
                <label className="form-label small">Phone</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Phone"
                  value={inputFilters.phone}
                  onChange={(e) => handleFilterChange("phone", e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group mb-2">
                <label className="form-label small">Country</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Country"
                  value={inputFilters.country}
                  onChange={(e) => handleFilterChange("country", e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group mb-2">
                <label className="form-label small">Gender</label>
                <select
                  className="form-control form-control-sm"
                  value={inputFilters.gender}
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive-sm">
            <table className="table table-striped table-hover">
              <thead className="bg-light">
                <tr>
                  <th style={{ width: "5%" }}>#</th>
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
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{from + index}</td>
                      <td>
                        <strong>{user.first_name}</strong>
                      </td>
                      <td>
                        <strong>{user.last_name}</strong>
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
                          {currentUser.roles && currentUser.roles.includes("admin") && (
                            <button
                              className="btn btn-danger btn-sm"
                              title="Delete"
                              onClick={() => handleDeleteUser(user.id, user.full_name)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          )}
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

        {totalUsers !== null && totalUsers > perPage && (
          <div className="card-footer">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted">
                Showing {from} to {to} of {totalUsers} entries
              </div>
              <ul className="pagination pagination-sm m-0">
                <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &laquo;
                  </button>
                </li>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page = i + 1;
                  if (currentPage > 3 && totalPages > 5) {
                    if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                  }
                  if (page < 1 || page > totalPages) return null;
                  return (
                    <li
                      key={page}
                      className={`page-item${currentPage === page ? " active" : ""}`}
                    >
                      <button className="page-link" onClick={() => handlePageChange(page)}>
                        {page}
                      </button>
                    </li>
                  );
                })}
                <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    &raquo;
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