import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { register } from "../services/authService";
function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  function setFormDataField(field) {
    return (e) => {
      setFormData({ ...formData, [field]: e.target.value });
    };
  }

  function validateForm(values) {
    const errors = {};
    if (!values.username) errors.username = "Username is required";
    if (values.username && values.username.trim().length < 4)
      errors.username = "Username must be at least 4 characters long";
    if (!values.email) errors.email = "Email is required";
    if (values.email && !/\S+@\S+\.\S+/.test(values.email))
      errors.email = "Email is invalid";
    if (!values.password) errors.password = "Password is required";
    return errors;
  }
  const submitHandler = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setIsSubmitting(true);
    }
    register(formData.username, formData.email, formData.password)
      .then((data) => {
        setMessage("Registration successful! Please sign in.");
        setFormData({ username: "", email: "", password: "" });
      })
      .catch((error) => {
        setErrors({ apiError: error.message || "Registration failed" });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Form onSubmit={submitHandler} noValidate>
      <div className="text-center">
        <p>Sign up to your account</p>
        {message && <div className="alert alert-success">{message}</div>}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger">
            <ul className="mb-0">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Form.Group className="mb-3" controlId="formGroupUsername">
        <Form.Control
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={setFormDataField("username")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Control
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={setFormDataField("email")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Control
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={setFormDataField("password")}
        />
      </Form.Group>
      <button type="submit" className="btn btn-primary btn-block w-100 mb-3">
        Sign Up
      </button>
      <div className="text-center">
        {" "}
        Already have an account? <Link to="/signin">Sign in</Link>{" "}
      </div>
    </Form>
  );
}

export default SignUp;
