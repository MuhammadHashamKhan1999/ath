import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AddAgents = (args) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const toggleModal = () => setModal(!modal);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple form validation
    if (!name || !email || !phone || !password) {
      setModalMessage("All fields are required");
      toggleModal();
      return;
    }

    if (password.length < 8) {
      setModalMessage("Password must be at least 8 characters long");
      toggleModal();
      return;
    }

    try {
      const token = Cookies.get("token"); // Retrieve token from cookie
      const response = await axios.post(
        "https://at-the-house-app.brandline360.com/api/admin/register-agent",
        {
          name: name,
          email: email,
          phone: phone,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );

      if (response.status === 200) {
        setModalMessage(response.data.message);
        toggleModal();
        // Clear form fields after successful registration
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        navigate("/admin/agents");
      } else {
        setModalMessage(response.data.message);
        toggleModal();
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // If the error has a response from the server, display the error message
        setModalMessage(error.response.data.message);
        toggleModal();
      } else {
        // If there's no response from the server, display a generic error message
        setModalMessage("Failed to register agent");
        toggleModal();
      }
    }
  };

  const viewAgents = () => {
    navigate("/admin/agents");
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
                <h3 className="mb-0">Add Agents</h3>
                <Button
                  style={{ backgroundColor: "#a10000", color: "#fff" }}
                  onClick={viewAgents}
                >
                  View Agents
                </Button>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleName">Name</Label>
                        <Input
                          type="text"
                          name="name"
                          id="exampleName"
                          placeholder="Enter Agent Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                          type="email"
                          name="email"
                          id="exampleEmail"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="examplePhone">Phone</Label>
                        <Input
                          type="text"
                          name="phone"
                          id="examplePhone"
                          placeholder="Enter Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>




                  <Row form>
                      <Col md={6}>
                      <FormGroup>
                        <Label for="exampleName">Adress</Label>
                        <Input
                          type="text"
                          name="adress"
                          id="adress"
                          placeholder="Enter Adress"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="suite_number">Suite Number</Label>
                        <Input
                          type="text"
                          name="suite_number"
                          id="suite_number"
                          placeholder="Suite Number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>








                  <Row form>
                      <Col md={6}>
                      <FormGroup>
                        <Label for="city">City</Label>
                        <Input
                          type="text"
                          name="city"
                          id="city"
                          placeholder="Enter City"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="state">State</Label>
                        <Input
                          type="text"
                          name="state"
                          id="state"
                          placeholder="State"
                        />
                      </FormGroup>
                    </Col>
                  </Row>





                  <Row form>
                      <Col md={6}>
                      <FormGroup>
                        <Label for="zip">Zip</Label>
                        <Input
                          type="text"
                          name="zip"
                          id="zip"
                          placeholder="Enter Zip"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={6}>
                      <FormGroup>
                        <Label for="image">Image</Label>
                        <CustomInput
                          type="file"
                          id="image"
                          name="image"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "0.25rem",
                            padding: "0.375rem 0.75rem",
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>


                  <Button
                    style={{ backgroundColor: "#a10000", color: "#fff" }}
                    type="submit"
                  >
                    Register
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Message</ModalHeader>
        <ModalBody>{modalMessage}</ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "#e1ae26", color: "#fff" }}
            onClick={toggleModal}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddAgents;
