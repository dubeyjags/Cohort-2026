import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/authService';

export const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  function setFormDataField(field) {
    return (e) => {
      setFormData({ ...formData, [field]: e.target.value });
    };
  }

  function validate(values) {
    const errors = {};
    if (!values.email) errors.email = "Email is required";
    if (values.email && !/\S+@\S+\.\S+/.test(values.email))
      errors.email = "Email is invalid";
    return errors;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setIsSubmitting(true);
    try {
      await forgotPassword(formData.email);
      setMessage("Password reset link sent! Check your email.");
      setFormData({ email: "" });
      setErrors({});
    } catch (error) {
      setErrors({ api: error?.response?.data?.message || error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={submitHandler} noValidate>
      <div className="text-center">
        <p>Forgot Password?</p>
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
      <Form.Group className="mb-3" controlId="emailOrMobile">
        <Form.Control
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={setFormDataField("email")}
        />
      </Form.Group>
      <button
        type="submit"
        className="btn btn-primary btn-block w-100 mb-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Reset Password"}
      </button>
      <div className="text-center">
        <p>back to <Link to="/">Sign in</Link> or <Link to="/signup">Sign up</Link></p>
      </div>
    </Form>
  );
}
