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
import { useNavigate } from "react-router-dom";

const Agents = (args) => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('https://at-the-house-app.brandline360.com/api/admin/agents', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAgents(response.data.agents);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchAgents();
  }, []);
  
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

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
        toggle();
        fetchAgents();
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

  const redirecttoUpdate = (id) => {
    navigate("/admin/update-agent/"+id)
  }
  
  
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
                <h3 className="mb-0">Agents</h3>
                <Button color="success" onClick={toggle}>
                  Add +
                </Button>
                <Modal isOpen={modal} toggle={toggle} {...args}>
                  <ModalHeader toggle={toggle}>
                    <h1>Register Agent</h1>
                  </ModalHeader>
                  <ModalBody>
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
                  </ModalBody>
                </Modal>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map(agent => (
                      <tr key={agent.id}>
                      <th scope="row">
                        {agent.name}
                      </th>
                      <td>{agent.email}</td>
                      <td>{agent.phone}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault()
                                redirecttoUpdate(agent.id)
                              }}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Agents;
