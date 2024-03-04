import { useEffect, useState } from "react";
import { Container, Form, Button, Col, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import "./RegistrationCafe.css";
import HomeNavbar from "./HomeNavbar";

function RegisterCustomer() {
  const [validated, setValidated] = useState(false);
  const [customer, setCustomer] = useState({
    firstName: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const mailData = {
    subject: "Welcome to Cafetto - Your Cafe Management System!",
    message:
      "Thank you for choosing Cafetto, your go-to cafe management system! We are thrilled to have you on board and look forward to serving you.",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      await axios.post("http://localhost:8086/register/user", customer);
      console.log("Customer added successfully");
      alert("Successfuly Registered");
    } catch (error) {
      console.error("Error adding customer: ", error);
    }

    setValidated(true);
  };

  const currentUser = localStorage.getItem("userID");

  const [userRole, setUserRole] = useState(""); // Added state for user role

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8086/fetch/user/${currentUser}`
        );

        const role = response.data.role;
        setUserRole(role);
        console.log(role);

        setCustomer((prevCustomer) => ({
          ...prevCustomer,
          role: role,
        }));
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = async (e) => {
    const email = e.target.email;
    try {
      await axios.post(`http://localhost:8086/mail/send/${email}`, mailData);
    } catch (error) {
      console.error("Error adding customer: ", error);
    }
  };

  return (
    <>
      <HomeNavbar />
      <Container className="registercontainer mt-5 bg-light">
        <div>
          <h1 className="text-center mb-5">Register Here!!!</h1>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                name="firstName"
                pattern="[A-Za-z ]+"
                onChange={handleChange}
              />
              <Form.Label>UserName</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="User name"
                name="username"
                pattern="[A-Za-z ]+"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid name containing only alphabets and spaces.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Email Id</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password must be at least 8 characters long and contain at
                  least one uppercase letter, one lowercase letter, one number,
                  and one special character.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Role</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  as="select"
                  name="role"
                  onChange={handleChange}
                  required
                  // Disable the dropdown to prevent user modification
                  disabled={!userRole}
                >
                  {/* Conditionally render options based on userRole */}
                  {userRole === "Admin" ? (
                    <>
                      <option value="Admin">Admin</option>
                      <option value="Cafe">Cafe</option>
                    </>
                  ) : (
                    <option value="Customer">Customer</option>
                  )}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a user type.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>

          <div className="d-grid mt-5 gap-2 d-md-flex justify-content-md-center">
            <Button
              type="submit"
              variant="outline-success"
              className="px-4 py-2"
              onClick={handleClick}
            >
              Submit form
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default RegisterCustomer;
