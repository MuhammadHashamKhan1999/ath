import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Form,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader
} from "reactstrap";
import Header from "components/Headers/Header.js";

const UpdateAgent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    fetchAgentData();
  }, []);

  const fetchAgentData = async () => {
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
      const agentData = response.data.agent;
      setName(agentData.name);
      setEmail(agentData.email);
      setPhone(agentData.phone);
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Your form submission logic goes here
  };

  const updateNewAgent = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        `https://at-the-house-app.brandline360.com/api/profile/${id}`,
        {
          name,
          email,
          phone,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setModalMessage(response.data.message);
      // Redirect to agents list after successful update
      navigate("/admin/agents");
    } catch (error) {
      console.error("Error updating agent:", error);
      // Handle error
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Update Agents</h3>
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
                  <Button
                    type="button"
                    style={{ backgroundColor: "#a10000", color: "#fff" }}
                    onClick={updateNewAgent}
                  >
                    Update Agent
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

export default UpdateAgent;
