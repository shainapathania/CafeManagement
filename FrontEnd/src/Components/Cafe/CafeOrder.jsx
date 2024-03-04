import "./myOrder.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CafeNavbar from "./CafeNavbar";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Modal,
} from "react-bootstrap";

export default function CafeOrder() {
  const [orderList, setOrderList] = useState([]);
  const [ItemList, setItemList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [selectedFoodItem, setSelectedFoodItem] = useState({
    // orderItemId: "",
    
    status: "",
  });
  const populateData = () => {
    axios.get("http://localhost:8086/orders/orderitem/fetch").then((response) => {
      setItemList(response.data);
    });
  };

  useEffect(() => {
    populateData();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8086/orders/orderitem/fetch`)
      .then((response) => {
        setOrderList(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error, display a message to the user, retry the request, etc.
      });
  }, []);

  const handleShowModal = (item) => {
    setSelectedFoodItem({
      ...item,
      status: item.order.status, // Set the status property from the order object
      id: item.order.orderId, // Set the ID in selectedFoodItem state
    });
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

 

  const handleUpdate = async (e) => {
    
    try {
      console.log("Updating with:", selectedFoodItem);
      console.log("Order ID:", selectedFoodItem.id);
      console.log("Status:", selectedFoodItem.status);
  
      const response = await axios.put(
        `http://localhost:8086/orders/updateStatus/${selectedFoodItem.id}/${selectedFoodItem.status}`
      );
  
      console.log("Order status updated:", response.data);
      populateData();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  
  
  

  const handleStatusChange = (e) => {
    const { value } = e.target;
    console.log('Selected Status:', value); // Add this line for debugging
    setSelectedFoodItem((prevDetails) => ({
      ...prevDetails,
      status: value,
    }));
  };
  

  return (
    <>
    <CafeNavbar/>
      <Container className="container mt-5 bg-light">
        <Row className="justify-content-center">
          <Col xs={12} md={12}>
            <div className="all-categories">
              <h1 className="text-center mb-5">All Items</h1>
              <Table bordered hover className="table category-table">
                <thead>
                  <tr>
                    <th
                      className="text-center "
                      style={{ backgroundColor: "#325f53", color: "#ffffff" }}
                    >
                      Product ID
                    </th>
                    <th
                      className="text-center  "
                      style={{ backgroundColor: "#325f53", color: "#ffffff" }}
                    >
                      Name
                    </th>

                    <th
                      className="text-center "
                      style={{ backgroundColor: "#325f53", color: "#ffffff" }}
                    >
                      Category
                    </th>
                    <th
                      className="text-center "
                      style={{ backgroundColor: "#325f53", color: "#ffffff" }}
                    >
                      Cafe
                    </th>
                    <th
                      className="text-center "
                      style={{ backgroundColor: "#325f53", color: "#ffffff" }}
                    >
                      Price
                    </th>

                    <th
                      className="text-center "
                      style={{ backgroundColor: "#325f53", color: "#ffffff" }}
                    >
                      Quantity
                    </th>
                    <th
                      className="text-center "
                      style={{ backgroundColor: "#325f53", color: "#ffffff" }}
                    >
                      Status
                    </th>
                    <th
                      className="text-center "
                      style={{ backgroundColor: "#325f53", color: "#ffffff" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody id="tbl_head">
                  {orderList.map((o) => {
                    return (
                      <tr>
                        <th>{o.orderItemId}</th>
                        {/* <th>Food</th> */}
                        <th className="text-center">
                          {o.product ? o.product.name : "N/A"}
                        </th>
                        <th className="text-center">
                          {o.product && o.product.category
                            ? o.product.category.name
                            : "N/A"}
                        </th>
                        <th className="text-center">
                          {o.order && o.order.cafe ? o.order.cafe.name : "N/A"}
                        </th>
                        <th className="text-center">{o.product.price}</th>
                        <th className="text-center">{o.quantity}</th>
                        <th className="text-center">{o.order.status}</th>
                        <td className="text-center">
                          <Button
                            onClick={() => handleShowModal(o)}
                            variant="info"
                          >
                            Update
                          </Button>{" "}
                          {/* <Button
                            variant="danger"
                            onClick={() => handleDeleteClick(o.orderItemId)}
                          >
                            Delete
                          </Button> */}
                        </td>
                        {/* <th>Order Time</th>
                <th>Order Status</th> */}
                        {/* <th>Delivery Person</th>
                <th>Delivery Contact</th>
                <th>Delivery Time</th> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Order Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleUpdate}>
                    
                    <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      value={selectedFoodItem.status}
                      onChange={handleStatusChange}
                      required
                    >
                      
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </Form.Control>
            </Form.Group> 
                    <Form.Control.Feedback type="invalid">
                      Please select a user type.
                    </Form.Control.Feedback>

                    {/* <Form.Group controlId="price">
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedFoodItem.status}
                        onChange={handleStatusChange}
                      />
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                      Update
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
