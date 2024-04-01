import { useEffect, useState } from "react";
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

const AddCategory = (args) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // Store the file object
  const [type, setType] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Simple form validation
    if (!name || !image || !type) {
      alert("All fields are required");
      return;
    }
  
    // Validate file extension
    const allowedExtensions = ["jpeg", "jpg", "png", "gif"];
    const extension = image.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      alert("Image must be a file of type: jpeg, png, jpg, gif");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("category_name", name);
      formData.append("image", image); // Append the file object directly
      formData.append("category_type", type);
  
      const token = Cookies.get("token");
      const response = await axios.post(
        "https://at-the-house-app.brandline360.com/api/admin/services/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/admin/categories")
  
      if (response.status === 200) {
        alert(response.data.message);
        // Clear form fields after successful registration
        setName("");
        setImage(null);
        setType("");
        // navigate("/admin/categories");
        console.log(response);
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
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file); // Set the file object in the state
  };

  // viewCategories

  const viewCategories = () => {
    // alert("viewCategories")
    navigate("/admin/categories");
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Add Category</h3>
                <Button
                  style={{ backgroundColor: "#a10000", color: "#fff" }}
                  onClick={viewCategories}
                >
                  View Categories
                </Button>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row form>
                    <Col sm={6}>
                      <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter Category Name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={6}>
                      <FormGroup>
                        <Label for="image">Image</Label>
                        <CustomInput
                          type="file"
                          id="image"
                          onChange={handleFileChange}
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
                  <Row form>
                    <Col sm={6}>
                      <FormGroup>
                        <Label for="type">Type</Label>
                        <Input
                          type="select"
                          name="type"
                          id="type"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="">Select Category Type</option>
                          <option value="normal">Normal</option>
                          <option value="popular">Popular</option>
                          <option value="most_demanding">Most Demanding</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button
                    color="success"
                    type="submit"
                    style={{ backgroundColor: "#a10000", color: "#fff" }}
                  >
                    Register
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

export default AddCategory;
