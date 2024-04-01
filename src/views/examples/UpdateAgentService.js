import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import qs from "qs";

const UpdateAgentService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    serviceType: "",
    serviceName: "",
    shortDescription: "",
    messageNumber: "",
    phoneNumber: "",
    categoryId: "",
    hours: "",
    featuredImage: null,
    bannerImage: null,
  });

  const token = Cookies.get("token");
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `https://at-the-house-app.brandline360.com/api/agent-services/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;
        setFormData({
          serviceType: data.service.service_type || "",
          serviceName: data.service.service_name || "",
          shortDescription: data.service.short_description || "",
          messageNumber: data.service.message_number || "",
          phoneNumber: data.service.phone_number || "",
          categoryId: data.service.category_id || "",
          hours: data.service.hours || "",
        });
        console.log("RES  ", response);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
  
    setFormData({
      ...formData,
      [name]: file,
    });
  };
  
  
  
  

  const updateService = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get("token");
      const requestData = {
        service_name: formData.serviceName,
        short_description: formData.shortDescription,
        message_number: formData.messageNumber,
        phone_number: formData.phoneNumber,
        category_id: formData.categoryId,
      };
  
      if (formData.featuredImage) {
        requestData.featuredImage = formData.featuredImage;
      }
      
      if (formData.bannerImage) {
        requestData.bannerImage = formData.bannerImage;
      }
  
      // Use qs.stringify to convert requestData to x-www-form-urlencoded format
      const formDataToSend = qs.stringify(requestData);
  
      await axios.put(
        `https://at-the-house-app.brandline360.com/api/agent-services/${id}/update`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
  
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Error updating category. Please try again later.");
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
                <h3 className="mb-0">Update Agent Service</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="serviceType">Service Type</Label>
                        <Input
                          type="select"
                          id="serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                        >
                          <option value="">Select Service Type</option>
                          <option value="most_demanding">most_demanding</option>
                          <option value="popular">popular</option>
                          <option value="normal">normal</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="serviceName">Service Name</Label>
                        <Input
                          id="serviceName"
                          name="serviceName"
                          type="text"
                          value={formData.serviceName}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="shortDescription">Short Description</Label>
                        <Input
                          id="shortDescription"
                          name="shortDescription"
                          type="text"
                          value={formData.shortDescription}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="messageNumber">Message Number</Label>
                        <Input
                          id="messageNumber"
                          name="messageNumber"
                          type="text"
                          value={formData.messageNumber}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="text"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="categoryId">Category ID</Label>
                        <Input
                          id="categoryId"
                          name="categoryId"
                          type="text"
                          value={formData.categoryId}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="hours">Hours</Label>
                        <Input
                          id="hours"
                          name="hours"
                          type="text"
                          value={formData.hours}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="featuredImage">Featured Image</Label>
                        <Input
                          id="featuredImage"
                          name="featuredImage"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="bannerImage">Banner Image</Label>
                        <Input
                          id="bannerImage"
                          name="bannerImage"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#a10000", color: "#fff" }}
                    onClick={updateService}
                  >
                    Update Service
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

export default UpdateAgentService;
