import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
import Header from "components/Headers/Header.js";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Agents = (args) => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [agentsPerPage] = useState(7); // Number of agents per page

  const toggleModal = () => setModal(!modal);

  const fetchAgents = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "https://at-the-house-app.brandline360.com/api/admin/agents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAgents(response.data.agents);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple form validation
    if (!name || !email || !phone || !password) {
      setModalMessage("All fields are required");
      return;
    }

    if (password.length < 8) {
      setModalMessage("Password must be at least 8 characters long");
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
        // Clear form fields after successful registration
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        toggle();
        fetchAgents();
      } else {
        setModalMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // If the error has a response from the server, display the error message
        setModalMessage(error.response.data.message);
      } else {
        // If there's no response from the server, display a generic error message
        setModalMessage("Failed to register agent");
      }
    }
  };

  const redirecttoUpdate = (id) => {
    navigate("/admin/update-agent/" + id);
  };

  const addAgent = () => {
    navigate("/admin/add-agent");
  };

  // Delete Agent

  const handleAgentDelete = async (id) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.delete(
        "https://at-the-house-app.brandline360.com/api/admin/delete-user/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setModalMessage(response.data.message);

      // Update the agents state by filtering out the deleted agent
      setAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== id));
    } catch (error) {
      setModalMessage(error.response.data.error);
    }
  };

  // Pagination Logic
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Agents</h3>
                <Button
                  style={{ backgroundColor: "#a10000", color: "#fff" }}
                  onClick={addAgent}
                >
                  Add Agent
                </Button>
              </CardHeader>
              <CardBody style={{overflowX:'scroll'}}>
                <table className="table table-striped" >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAgents.map((agent, index) => (
                      <tr key={agent.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{agent.name}</td>
                        <td>{agent.email}</td>
                        <td>{agent.phone}</td>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-pencil-fill"
                            viewBox="0 0 16 16"
                            onClick={() => redirecttoUpdate(agent.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-file-x-fill"
                            viewBox="0 0 16 16"
                            onClick={() => handleAgentDelete(agent.id)}
                            style={{
                              marginLeft: ".5rem",
                              cursor: "pointer",
                              color: "#a10000",
                            }}
                          >
                            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M6.854 6.146 8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 1 1 .708-.708" />
                          </svg>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: "4rem",
                    marginTop: "2rem",
                  }}
                >
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      {Array.from(
                        { length: Math.ceil(agents.length / agentsPerPage) },
                        (_, i) => (
                          <li
                            key={i}
                            className={`page-item ${
                              currentPage === i + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              onClick={() => paginate(i + 1)}
                              className="page-link"
                            >
                              {i + 1}
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  </nav>
                </div>
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

export default Agents;
