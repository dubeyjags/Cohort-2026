import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "../services/authService";
import { useState } from "react";

function SignIn() {
  const [formData, setFormData] = useState({
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

  function validate(values) {
    const errors = {};
    if (!values.email) errors.email = "Email or Mobile is required";
    if (!values.password) errors.password = "Password is required";
    return errors;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setIsSubmitting(true);
    }
    login(formData.email, formData.password)
      .then((data) => {
        setMessage("Login successful!");
        setFormData({ email: "", password: "" });
      })
      .catch((error) => {
        setErrors({ apiError: error.message || "Login failed" });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }
  
  return (
    <Form onSubmit={submitHandler} noValidate>
      <div className="text-center">
        <p>Sign in to your account</p>
      </div>
      <Form.Group className="mb-3" controlId="email">
        <Form.Control
          type="email"
          placeholder="Email Address"
          onChange={setFormDataField("email")}
          value={formData.email}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Control type="password" placeholder="Password" 
        value={formData.password}
        onChange={setFormDataField("password")}
        />
      </Form.Group>
      <button
        type="submit"
        onClick={SignIn}
        className="btn btn-primary btn-block w-100 mb-3"
      >
        {" "}
        Sign In{" "}
      </button>
      <div className="text-center">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p>
          Forgot Password? <Link to="/forgot-password">Reset here</Link>{" "}
        </p>
      </div>
    </Form>
  );
}

export default SignIn;
