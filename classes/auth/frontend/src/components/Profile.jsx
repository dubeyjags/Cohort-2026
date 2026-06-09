import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { updateProfile } from "../services/authService";

export const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, USA",
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
    if (!values.firstName) errors.firstName = "First name is required";
    if (!values.lastName) errors.lastName = "Last name is required";
    if (!values.email) errors.email = "Email is required";
    if (values.email && !/\S+@\S+\.\S+/.test(values.email))
      errors.email = "Email is invalid";
    return errors;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setIsSubmitting(true);
    updateProfile(formData)
      .then(() => {
        setMessage("Profile updated successfully!");
        setErrors({});
      })
      .catch((error) => {
        setErrors({ form: error.message || "Failed to update profile" });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={4}>
          <Card className="text-center mb-4 bg-white">
            <Card.Body>
              <img
                src="https://via.placeholder.com/120"
                alt="Profile"
                className="rounded-circle mb-3"
                width="120"
                height="120"
              />
              <h5 className="mb-1">{formData.firstName} {formData.lastName}</h5>
              <p className="text-muted">{formData.email}</p>
              <Button variant="primary" size="sm">
                Change Photo
              </Button>
            </Card.Body>
          </Card>

          <Card className="bg-white">
            <Card.Header>Account Details</Card.Header>
            <Card.Body>
              <p><strong>Role:</strong> Customer</p>
              <p><strong>Member since:</strong> Jan 2024</p>
              <p><strong>Status:</strong> Active</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="bg-white">
            <Card.Header>Profile Information</Card.Header>
            <Card.Body>
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
              <Form onSubmit={submitHandler} noValidate>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.firstName}
                        onChange={setFormDataField("firstName")}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.lastName}
                        onChange={setFormDataField("lastName")}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={setFormDataField("email")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.phone}
                    onChange={setFormDataField("phone")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.address}
                    onChange={setFormDataField("address")}
                  />
                </Form.Group>

                <div className="text-end">
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
