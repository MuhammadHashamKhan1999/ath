/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useState } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  UncontrolledTooltip,
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  FormText,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate, useParams } from "react-router-dom";

const UpdateAgent = (args) => {
  const navigate = useNavigate();
  const {id} = useParams()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const fetchdata = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `https://at-the-house-app.brandline360.com/api/admin/agents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      // console.log(id)
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  
  useEffect(async () => {
    fetchdata();
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Simple form validation
    if (!name || !email || !phone || !password) {
      alert('All fields are required');
      return;
    }
  
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
  
    try {
      const token = Cookies.get('token'); // Retrieve token from cookie
      const response = await axios.post('https://at-the-house-app.brandline360.com/api/admin/register-agent', {
        name: name,
        email: email,
        phone: phone,
        password: password
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in Authorization header
        }
      });
  
      if (response.status === 200) {
        alert(response.data.message);
        // Clear form fields after successful registration
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        navigate("/admin/agents")
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        // If the error has a response from the server, display the error message
        alert(error.response.data.message);
      } else {
        // If there's no response from the server, display a generic error message
        alert('Failed to register agent');
      }
    }
  };
  
  
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">update Agents</h3>
              </CardHeader>
              <CardBody>
              <Form onSubmit={handleSubmit}>
                      <FormGroup row>
                        <Label for="exampleName" sm={2}>
                          Name
                        </Label>
                        <Col sm={10}>
                          <Input
                            id="exampleName"
                            name="name"
                            placeholder="Enter Agent Name"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="exampleEmail" sm={2}>
                          Email
                        </Label>
                        <Col sm={10}>
                          <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Enter Email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="examplePhone" sm={2}>
                          Phone
                        </Label>
                        <Col sm={10}>
                          <Input
                            id="examplePhone"
                            name="phone"
                            placeholder="Enter Phone Number"
                            type="text"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="examplePassword" sm={2}>
                          Password
                        </Label>
                        <Col sm={10}>
                          <Input
                            id="examplePassword"
                            name="password"
                            placeholder="password placeholder"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup check row>
                        <Col>
                          <Button color="success" type="submit" className="w-100">Register</Button>
                        </Col>
                      </FormGroup>
                    </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UpdateAgent;
