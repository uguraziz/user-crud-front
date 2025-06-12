import React, { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../Utils/api.js";

export default function UserCreate() {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    national_id: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    country: "",
    city: "",
    district: "",
    address: "",
    postal_code: "",
    currency: "USD",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/users");
      } else {
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      console.error("Create user error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Link to="/users" className="btn btn-secondary">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Users
            </Link>
            <h2 className="mb-0">
              <i className="fas fa-user-plus mr-2"></i>
              Create New User
            </h2>
          </div>

          <div className="card">
            <div className="card-header bg-success text-white">
              <h3 className="card-title mb-0">
                <i className="fas fa-user-circle mr-2"></i>
                User Information
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="first_name">
                        <i className="fas fa-user mr-2 text-primary"></i>
                        First Name *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.first_name ? "is-invalid" : ""
                        }`}
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                      />
                      {errors.first_name && (
                        <div className="invalid-feedback">
                          {errors.first_name[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="last_name">
                        <i className="fas fa-user mr-2 text-primary"></i>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.last_name ? "is-invalid" : ""
                        }`}
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                      />
                      {errors.last_name && (
                        <div className="invalid-feedback">
                          {errors.last_name[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        <i className="fas fa-envelope mr-2 text-primary"></i>
                        Email *
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                      />
                      {errors.email && (
                        <div className="invalid-feedback">
                          {errors.email[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">
                        <i className="fas fa-lock mr-2 text-primary"></i>
                        Password *
                      </label>
                      <input
                        type="password"
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password_confirmation">
                        <i className="fas fa-lock mr-2 text-primary"></i>
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="national_id">
                        <i className="fas fa-id-badge mr-2 text-primary"></i>
                        National ID *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.national_id ? "is-invalid" : ""
                        }`}
                        id="national_id"
                        name="national_id"
                        value={formData.national_id}
                        onChange={handleChange}
                        placeholder="Enter national ID"
                        required
                      />
                      {errors.national_id && (
                        <div className="invalid-feedback">
                          {errors.national_id[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone">
                        <i className="fas fa-phone mr-2 text-primary"></i>
                        Phone
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">
                          {errors.phone[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender">
                        <i className="fas fa-venus-mars mr-2 text-primary"></i>
                        Gender *
                      </label>
                      <select
                        className={`form-control ${
                          errors.gender ? "is-invalid" : ""
                        }`}
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && (
                        <div className="invalid-feedback">
                          {errors.gender[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="date_of_birth">
                        <i className="fas fa-birthday-cake mr-2 text-primary"></i>
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        className={`form-control ${
                          errors.date_of_birth ? "is-invalid" : ""
                        }`}
                        id="date_of_birth"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        required
                      />
                      {errors.date_of_birth && (
                        <div className="invalid-feedback">
                          {errors.date_of_birth[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="country">
                        <i className="fas fa-globe mr-2 text-primary"></i>
                        Country *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.country ? "is-invalid" : ""
                        }`}
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter country"
                        required
                      />
                      {errors.country && (
                        <div className="invalid-feedback">
                          {errors.country[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="city">
                        <i className="fas fa-city mr-2 text-primary"></i>
                        City *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.city ? "is-invalid" : ""
                        }`}
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        required
                      />
                      {errors.city && (
                        <div className="invalid-feedback">{errors.city[0]}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="district">
                        <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                        District *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.district ? "is-invalid" : ""
                        }`}
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="Enter district"
                        required
                      />
                      {errors.district && (
                        <div className="invalid-feedback">
                          {errors.district[0]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12">
                    <h5 className="border-bottom pb-2">
                      <i className="fas fa-home mr-2 text-primary"></i>
                      Address Information
                    </h5>
                  </div>

                  <div className="col-md-8">
                    <div className="form-group">
                      <label htmlFor="address">
                        <i className="fas fa-map mr-2 text-primary"></i>
                        Full Address *
                      </label>
                      <textarea
                        className={`form-control ${
                          errors.address ? "is-invalid" : ""
                        }`}
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter full address"
                        required
                      />
                      {errors.address && (
                        <div className="invalid-feedback">
                          {errors.address[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="postal_code">
                        <i className="fas fa-mail-bulk mr-2 text-primary"></i>
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.postal_code ? "is-invalid" : ""
                        }`}
                        id="postal_code"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        placeholder="Enter postal code"
                        required
                      />
                      {errors.postal_code && (
                        <div className="invalid-feedback">
                          {errors.postal_code[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="currency">
                        <i className="fas fa-money-bill mr-2 text-primary"></i>
                        Currency
                      </label>
                      <select
                        className="form-control"
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="TRY">TRY</option>
                        <option value="JPY">JPY</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button
                  type="submit"
                  className="btn btn-success mr-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Creating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i>
                      Create User
                    </>
                  )}
                </button>
                <Link to="/users" className="btn btn-secondary">
                  <i className="fas fa-times mr-2"></i>
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
