import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import { AuthContext } from "../../context/authContext";
import "./login.css";
import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
import NavbarAdmin from "../Admin/NavbarAdmin";
import HomeNavbar from "./HomeNavbar";
import { getToken } from "../login/Auth";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  //   const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!isEmailValid()) {
    //   alert('Invalid email address');
    //   return;
    // }

    // if (!isPasswordValid()) {
    //   alert('Invalid password. It must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one digit.');
    //   return;
    // }

   
    //changed url /user/login
    try {
      const response = await axios.post('http://localhost:8086/login/user', formData);
        console.log(response.data);
        console.log(response.data.role);
        console.log(response.data.token);
       console.log(response.data.message)
       localStorage.setItem("token",JSON.stringify(response.data.token));
       localStorage.setItem("userID",response.data.id);
       console.log(getToken());
      //  console.log(localStorage.getItem("token"));

        
      // role base login condition
      if (response.data.success ===true) {
        // Redirect based on user type
        if (response.data.role === 'Admin') {
          // navigate(/a_sidebar/${response.data.userId});
          navigate("/admin/dashboard");
        } else if (response.data.role === 'Cafe') {
          // navigate(/s_sidebar/${response.data.userId});
          navigate("/cafe/dashboard");
        } else if (response.data.role === 'Customer') 
          

        {
          // navigate(/c_sidebar/${response.data.userId});
          navigate("/customer/dashboard");
        } else {
          alert('Unknown user type');
        }

        // Optionally, you can store user data in the state or context for further use
      } else {
        // Handle login error, e.g., incorrect credentials
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

//  const handleSubmit= async (e)=> {
//     let response = () => {
//       return new Promise(function(resolve, reject) {
//         axios.post('http://localhost:8086/login/user', formData
          
//         ).then(response => {
//           resolve(response);
//         });
//       });
//     };
//     let responseData = await response();
//     console.log(responseData.data);
//   }

  // const token = localStorage.getItem("token");
  // if (token) {
  //   setAuthToken(token);
  // }

  return (
    <>
      <HomeNavbar />

      <div className="login">
        <div className="card">
          <div className="left"></div>
          <div className="right">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <Form.Group
                className="mt-4"
                md="6"
                controlId="validationCustomUsername"
              >
                {/* <Form.Label>Role</Form.Label> */}
                <InputGroup hasValidation>
                  {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
                  {/* <Form.Control
                    as="select"
                    aria-describedby="inputGroupPrepend"
                    name="role"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select User Type</option>
                    <option value="Admin">Admin</option>
                    <option value="Customer">Customer</option>
                    <option value="Cafe">Cafe</option>
                  </Form.Control> */}
                  {/* <Form.Control.Feedback type="invalid">
                    Please select a user type.
                  </Form.Control.Feedback> */}
                </InputGroup>
              </Form.Group>
              <label className="labels">Username</label>
              <input
                type="text"
                placeholder="username"
                name="username"
                onChange={handleChange}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              {/* {err && err} */}
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
