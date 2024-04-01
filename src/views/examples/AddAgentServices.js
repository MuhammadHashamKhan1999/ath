import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  Form,
  CustomInput,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AddAgentServices = (args) => {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [messageNumber, setMessageNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [hours, setHours] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null); // New state for featured image
  const [bannerImage, setBannerImage] = useState(null); // New state for banner image

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple form validation
    if (
      !serviceType ||
      !serviceName ||
      !shortDescription ||
      !messageNumber ||
      !phoneNumber ||
      !categoryId ||
      !hours ||
      !featuredImage || // Ensure featured image is not empty
      !bannerImage // Ensure banner image is not empty
    ) {
      alert("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("service_type", serviceType);
      formData.append("service_name", serviceName);
      formData.append("short_description", shortDescription);
      formData.append("message_number", messageNumber);
      formData.append("phone_number", phoneNumber);
      formData.append("category_id", categoryId);
      formData.append("hours", hours);
      formData.append("featured_image", featuredImage);
      formData.append("banner_image", bannerImage);

      const token = Cookies.get("token");
      const response = await axios.post(
        "https://at-the-house-app.brandline360.com/api/agent-services/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
          },
        }
      );
      
      navigate("/admin/agent-services");
      if (response.status === 200) {
        alert(response.data.message);
        // Clear form fields after successful registration
        setServiceType("");
        setServiceName("");
        setShortDescription("");
        setMessageNumber("");
        setPhoneNumber("");
        setCategoryId("");
        setHours("");
        setFeaturedImage(null); // Reset featured image after successful registration
        setBannerImage(null); // Reset banner image after successful registration
        // navigate("/admin/categories");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // If the error has a response from the server, display the error message
        alert(error.response.data.message);
      } else {
        // If there's no response from the server, display a generic error message
        alert("Failed to add category");
      }
    }
  };

  const viewServices = () => {
    navigate("/admin/agent-services");
  };

  const [newAgents, setNewAgents] = useState([]);

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
      setNewAgents(response.data.agents);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Add Service</h3>
                <Button
                  style={{ backgroundColor: "#a10000", color: "#fff" }}
                  onClick={viewServices}
                >
                  View Services
                </Button>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="serviceType">Select Agent</Label>
                        <Input
                          type="select"
                          id="selectagent"
                          name="serviceType"
                        >
                          <option value="">Select Agent</option>
                          {newAgents.map((ele, index) => (
                            <option key={index} value={ele.name}>
                              {ele.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label for="serviceType">Service Type</Label>
                        <Input
                          type="select"
                          id="serviceType"
                          name="serviceType"
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                        >
                          <option value="">Select Service Type</option>
                          <option value="most_demanding">most_demanding</option>
                          <option value="popular">popular</option>
                          <option value="normal">normal</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="serviceName">Service Name</Label>
                        <Input
                          id="serviceName"
                          name="serviceName"
                          type="text"
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label for="shortDescription">Short Description</Label>
                        <Input
                          id="shortDescription"
                          name="shortDescription"
                          type="text"
                          value={shortDescription}
                          onChange={(e) => setShortDescription(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="messageNumber">Message Number</Label>
                        <Input
                          id="messageNumber"
                          name="messageNumber"
                          type="text"
                          value={messageNumber}
                          onChange={(e) => setMessageNumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label for="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="categoryId">Category ID</Label>
                        <Input
                          id="categoryId"
                          name="categoryId"
                          type="text"
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label for="hours">Hours</Label>
                        <Input
                          id="hours"
                          name="hours"
                          type="text"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>
                      <FormGroup>
                        <Label for="featuredImage">Featured Image</Label>
                        <CustomInput
                          id="featuredImage"
                          name="featuredImage"
                          type="file"
                          onChange={(e) => setFeaturedImage(e.target.files[0])}
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "0.25rem",
                            padding: "0.375rem 0.75rem",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={6}>
                      <FormGroup>
                        <Label for="bannerImage">Banner Image</Label>
                        <CustomInput
                          id="bannerImage"
                          name="bannerImage"
                          type="file"
                          onChange={(e) => setBannerImage(e.target.files[0])}
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
                    type="submit"
                    style={{ backgroundColor: "#a10000", color: "#fff" }}
                  >
                    Add Service
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AddAgentServices;
