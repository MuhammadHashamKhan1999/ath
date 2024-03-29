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
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = (args) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState("");

const fetchdata = async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(
      `https://at-the-house-app.brandline360.com/api/admin/services/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    setName(response.data.service.category_name)
    setImage(response.data.service.image)
    setType(response.data.service.category_type)
    console.log(response.data.service);
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
    // if (!name || !image || !type) {
    //   alert("All fields are required");
    //   return;
    // }

    try {
      const formData = new FormData();
      formData.append("category_name", name);
      formData.append("image", image);
      formData.append("category_type", type);

      const token = Cookies.get("token");
      const response = await axios.put(
        `https://at-the-house-app.brandline360.com/api/admin/services/${id}/update`,
        {category_name:name, image:image, category_type:type},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        // Clear form fields after successful registration
        setName("");
        setImage(null);
        setType("");
        navigate("/admin/categories")
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
    setImage(event.target.files[0]);
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
                <h3 className="mb-0">Update Category</h3>
              </CardHeader>
              <CardBody>
              <form onSubmit={handleSubmit}>
                      <FormGroup row>
                        <Label for="name" sm={2}>
                          Name
                        </Label>
                        <Col sm={10}>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Enter Category Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="image" sm={2}>
                          Image
                        </Label>
                        <Col sm={10}>
                          <Input
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleFileChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="type" sm={2}>
                          Type
                        </Label>
                        <Col sm={10}>
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
                            <option value="most_demanding">
                              Most Demanding
                            </option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col>
                          <Button
                            color="success"
                            type="submit"
                            className="w-100"
                          >
                            Register
                          </Button>
                        </Col>
                      </FormGroup>
                    </form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UpdateCategory;
