import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Table,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AgentServices = (args) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "https://at-the-house-app.brandline360.com/api/admin/services",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setCategories(response.data.services);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const handleDelete = async (id) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.delete(
        `https://at-the-house-app.brandline360.com/api/admin/services/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      alert(response.data.message);
      fetchCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const redirectToUpdate = (id) => {
    navigate("/admin/update-category/"+id)
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Agent Services</h3>
              </CardHeader>
              <CardBody>
                {Object.keys(categories).map((categoryType) => (
                  <div key={categoryType}>
                    <h2>{categoryType}</h2>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Image</th>
                          <th scope="col">Type</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories[categoryType].map((category) => (
                          <tr key={category.id}>
                            <td>{category.category_name}</td>
                            <td>
                              <img
                                src={category.image}
                                alt={category.category_name}
                                style={{ width: "100px", height: "100px" }}
                              />
                            </td>
                            <td>{category.category_type}</td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="btn-icon-only text-light"
                                  href="#pablo"
                                  role="button"
                                  size="sm"
                                  color=""
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-arrow"
                                  right
                                >
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      redirectToUpdate(category.id)
                                    }}
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    href=""
                                    onClick={() => handleDelete(category.id)}
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AgentServices;
