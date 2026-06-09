import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../services/authService';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
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
    if (!values.password) errors.password = "Password is required";
    if (!values.confirmPassword) errors.confirmPassword = "Please confirm your password";
    if (values.password && values.confirmPassword && values.password !== values.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
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
      await resetPassword(token, formData.password);
      setMessage("Password reset successful! You can now sign in.");
      setFormData({ password: "", confirmPassword: "" });
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
        <p>Reset Password</p>
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
      <Form.Group className="mb-3" controlId="password">
        <Form.Control
          type="password"
          placeholder="New Password"
          value={formData.password}
          onChange={setFormDataField("password")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Control
          type="password"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={setFormDataField("confirmPassword")}
        />
      </Form.Group>
      <button
        type="submit"
        className="btn btn-primary btn-block w-100 mb-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </button>
      <div className="text-center">
        <p>back to <Link to="/">Sign in</Link> or <Link to="/signup">Sign up</Link></p>
      </div>
    </Form>
  );
}
