import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import HomeNavbar from "./HomeNavbar";
// import './AddressForm.css';

const AddressForm = () => {
  const [address, setAddress] = useState({
    contactNo: "",
    city: "",
    street: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!/^\d{10}$/.test(address.contactNo)) {
      errors.contactNo = "Please enter valid number";
    }
    if (!address.city.trim()) {
      errors.city = "City is required";
    }
    if (!address.street.trim()) {
      errors.street = "Street is required";
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      errors.pincode = "Invalid Pincode";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data or perform other actions
      console.log("Form is valid, submit data:", address);
    }
  };

  return (
    <>
    <HomeNavbar/>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="contactNo">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Contact Number"
          name="contactNo"
          value={address.contactNo}
          onChange={handleChange}
          isInvalid={!!errors.contactNo}
        />
        <Form.Control.Feedback type="invalid">
          {errors.contactNo}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="City"
          name="city"
          value={address.city}
          onChange={handleChange}
          isInvalid={!!errors.city}
        />
        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="street">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          placeholder="Street"
          name="street"
          value={address.street}
          onChange={handleChange}
          isInvalid={!!errors.street}
        />
        <Form.Control.Feedback type="invalid">
          {errors.street}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="pincode">
        <Form.Label>Pincode</Form.Label>
        <Form.Control
          type="text"
          placeholder="Pincode"
          name="pincode"
          value={address.pincode}
          onChange={handleChange}
          isInvalid={!!errors.pincode}
        />
        <Form.Control.Feedback type="invalid">
          {errors.pincode}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
};

export default AddressForm;
