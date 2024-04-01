import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Table,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AgentServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(7); // Number of agents per page

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://at-the-house-app.brandline360.com/api/services"
      );
      setServices(response.data.services);
      console.log(response);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const redirectToUpdate = (id) => {
    navigate("/admin/update-agent-services/" + id);
  };

  const addService = () => {
    navigate("/admin/add-agent-services");
  };

  const handleAgentDelete = async (id) => {
    const token = Cookies.get("token");
    try {
      await axios.delete(
        `https://at-the-house-app.brandline360.com/api/agent-services/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Service Delete Successfull!");
      // Refresh the list of services after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // Pagination Logic
  const currentCategoryServices = services[activeTab] || [];
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = currentCategoryServices.slice(
    indexOfFirstService,
    indexOfLastService
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Agent Services</h3>
                <Button
                  style={{ backgroundColor: "#a10000", color: "#fff" }}
                  onClick={addService}
                >
                  Add Service
                </Button>
              </CardHeader>
              <CardBody style={{overflowX:'scroll'}}>
                <Nav tabs>
                  {Object.keys(services).map((category) => (
                    <NavItem key={category}>
                      <NavLink
                        className={`${activeTab === category ? "active" : ""}`}
                        onClick={() => toggleTab(category)}
                      >
                        {category}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
                <TabContent activeTab={activeTab} style={{ marginTop: "1rem" }}>
                  {Object.keys(services).map((category) => (
                    <TabPane key={category} tabId={category}>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Service Name</th>
                            <th scope="col">Short Description</th>
                            <th scope="col">Message Number</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Service Type</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentServices.map((service) => (
                            <tr key={service.id}>
                              <td>{service.service_name}</td>
                              <td>{service.short_description}</td>
                              <td>{service.message_number}</td>
                              <td>{service.phone_number}</td>
                              <td>{service.service_type}</td>
                              <td>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  className="bi bi-pencil-fill"
                                  viewBox="0 0 16 16"
                                  onClick={() => redirectToUpdate(service.id)}
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
                                  onClick={() => handleAgentDelete(service.id)}
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
                        
                      </Table>
                      {/* Pagination */}
                      <div
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            marginRight:'4rem',
                            marginTop: "2rem",
                          }}
                        >
                          <nav aria-label="Page navigation example">
                            <ul className="pagination">
                              {Array.from(
                                {
                                  length: Math.ceil(
                                    currentCategoryServices.length /
                                      servicesPerPage
                                  ),
                                },
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
                    </TabPane>
                  ))}
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AgentServices;
