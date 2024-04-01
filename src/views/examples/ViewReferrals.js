import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "components/Headers/Header.js";
import {
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import Cookies from "js-cookie"; // Import Cookies library

const ViewReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [selectedReferralIndex, setSelectedReferralIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("pending");
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [currentPage, setCurrentPage] = useState(1);
  const [refrellsPerPage] = useState(7); // Number of agents per page

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const token = Cookies.get("token"); // Get the token from cookies
        const response = await axios.get(
          "https://at-the-house-app.brandline360.com/api/referrals",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
        setReferrals(response.data.referrals);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };

    fetchReferrals();
  }, []);

  const handleStatusClick = (index) => {
    setSelectedReferralIndex(index);
    toggleModal();
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handlePopupClose = () => {
    setSelectedReferralIndex(null);
  };

  const handleSaveOption = async () => {
    if (selectedReferralIndex !== null) {
      try {
        const referralId = referrals[selectedReferralIndex].id;
        const token = Cookies.get("token"); // Get the token from cookies
        await axios.put(
          `https://at-the-house-app.brandline360.com/api/referrals/${referralId}`,
          { status: selectedOption },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );

        // Update the status of the selected referral locally
        const updatedReferrals = [...referrals];
        updatedReferrals[selectedReferralIndex].status = selectedOption;
        setReferrals(updatedReferrals);
      } catch (error) {
        console.error("Error updating referral status:", error);
      }
    }
    handlePopupClose();
    toggleModal();
  };


    // Pagination Logic
    const indexOfLastAgent = currentPage * refrellsPerPage;
    const indexOfFirstAgent = indexOfLastAgent - refrellsPerPage;
    const currentRefrells = referrals.slice(indexOfFirstAgent, indexOfLastAgent);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Referrals</h3>
              </CardHeader>
              <CardBody className="text-center" style={{overflowX:'scroll'}}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Serial</th>
                      <th scope="col">Service Name</th>
                      <th scope="col">short_description</th>
                      <th scope="col">message_number</th>
                      <th scope="col">phone_number</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRefrells.map((referral, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{referral.agent_service?.service_name}</td>
                        <td>{referral.agent_service?.short_description}</td>
                        <td>{referral.agent_service?.message_number}</td>
                        <td>{referral.agent_service?.phone_number}</td>

                        <td>
                          <button
                            onClick={() => handleStatusClick(index)}
                            style={{
                              backgroundColor: "#fb6340",
                              color: "#fff",
                              border: "none",
                              outline: "none",
                              padding: ".3rem .5rem",
                              borderRadius: "6px",
                            }}
                          >
                            {referral.status}
                          </button>
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
                        { length: Math.ceil(referrals.length / refrellsPerPage) },
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
        <ModalBody>
          {selectedReferralIndex !== null && (
            <div className="popup">
              <div className="popup-content">
                <h3>
                  <b>Update Status</b>
                </h3>
                <label>
                  <input
                    type="radio"
                    value="pending"
                    checked={selectedOption === "pending"}
                    onChange={() => handleOptionChange("pending")}
                  />
                  
                  <span style={{marginLeft:'.4rem'}}>Pending</span>
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value="approved"
                    checked={selectedOption === "approved"}
                    onChange={() => handleOptionChange("approved")}
                  />
                  
                  <span style={{marginLeft:'.4rem'}}>Approved</span>
                </label>
                <br />
                <label style={{ marginRight: "-20px" }}>
                  <input
                    type="radio"
                    value="denied"
                    checked={selectedOption === "denied"}
                    onChange={() => handleOptionChange("denied")}
                  />
                  <span style={{marginLeft:'.4rem'}}>Denied</span>
                </label>
                <br />
                <div style={{ marginTop: "1rem" }}>
                  <button
                    onClick={handleSaveOption}
                    style={{
                      padding: ".3rem 1rem",
                      backgroundColor: "#870000",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      borderRadius: "6px",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={handlePopupClose}
                    style={{
                      marginLeft: "1rem",
                      padding: ".3rem 1rem",
                      backgroundColor: "#d6b400",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      borderRadius: "6px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewReferrals;
