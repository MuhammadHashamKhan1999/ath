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
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import qs from "qs"; // Import qs library

const UpdateCategory = () => {
  const { id } = useParams();
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
      setName(response.data.service.category_name);
      setType(response.data.service.category_type);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const updateCategory = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get("token");
      const requestData = {
        category_name: name,
        category_type: type,
      };

      if (image) {
        requestData.image = image;
      }

      // Use qs.stringify to convert requestData to x-www-form-urlencoded format
      const formData = qs.stringify(requestData);

      await axios.put(
        `https://at-the-house-app.brandline360.com/api/admin/services/${id}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      alert("Category updated successfully!");
      navigate("/admin/categories")
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Error updating category. Please try again later.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Update Category</h3>
              </CardHeader>
              <CardBody>
                <Form>
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
                        <Input
                          id="image"
                          name="image"
                          type="file"
                          onChange={handleFileChange}
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
                    onClick={updateCategory}
                  >
                    Update Category
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

export default UpdateCategory;
