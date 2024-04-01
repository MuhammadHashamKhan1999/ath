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
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Header from "components/Headers/Header.js";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Category = (args) => {
  const navigate = useNavigate();
  const [categoriesOne, setCategoriesOne] = useState([]);
  const [categoriesTwo, setCategoriesTwo] = useState([]);
  const [categoriesThree, setCategoriesThree] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [firstCategoriesPerPage] = useState(7); // Number of agents per page
  const [secondCategoriesPerPage] = useState(7); // Number of agents per page
  const [thirdCategoriesPerPage] = useState(7); // Number of agents per page

  const [activeTab, setActiveTab] = useState("Popular");

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
      console.log("Updated categories state:", response.data.services.popular); //
      setCategoriesOne(response.data.services.popular);
      setCategoriesTwo(response.data.services.most_demanding);
      setCategoriesThree(response.data.services.normal);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
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
    navigate("/admin/update-category/" + id);
  };

  const addCategories = () => {
    navigate("/admin/add-category");
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

// Pagination Logic for categoriesOne
const indexOfLastAgentOne = currentPage * firstCategoriesPerPage;
const indexOfFirstAgentOne = indexOfLastAgentOne - firstCategoriesPerPage;
const firstCurrentUserOne = categoriesOne.slice(
  indexOfFirstAgentOne,
  indexOfLastAgentOne
);

// Pagination Logic for categoriesTwo
const indexOfLastAgentTwo = currentPage * secondCategoriesPerPage;
const indexOfFirstAgentTwo = indexOfLastAgentTwo - secondCategoriesPerPage;
const firstCurrentUserTwo = categoriesTwo.slice(
  indexOfFirstAgentTwo,
  indexOfLastAgentTwo
);

// Pagination Logic for categoriesThree
const indexOfLastAgentThree = currentPage * thirdCategoriesPerPage;
const indexOfFirstAgentThree = indexOfLastAgentThree - thirdCategoriesPerPage;
const firstCurrentUserThree = categoriesThree.slice(
  indexOfFirstAgentThree,
  indexOfLastAgentThree
);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Categories</h3>
                <Button
                  style={{ backgroundColor: "#a10000", color: "#fff" }}
                  onClick={addCategories}
                >
                  Add Category
                </Button>
              </CardHeader>
              <CardBody style={{overflowX:'scroll'}}>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === "Popular",
                      })}
                      onClick={() => {
                        toggleTab("Popular");
                      }}
                    >
                      Popular
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === "Most Demanding",
                      })}
                      onClick={() => {
                        toggleTab("Most Demanding");
                      }}
                    >
                      Most Demanding
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "Normal" })}
                      onClick={() => {
                        toggleTab("Normal");
                      }}
                    >
                      Normal
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="Popular">
                    <RenderCategories categoryType="Popular" />
                  </TabPane>
                  <TabPane tabId="Most Demanding">
                    <RenderCategoriesTwo categoryType="Most Demanding" />
                  </TabPane>
                  <TabPane tabId="Normal">
                    <RenderCategoriesThree categoryType="Normal" />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );

  function RenderCategories({ categoryType }) {
    return (
      <>
        <div key={categoryType} style={{ marginTop: ".5rem" }}>
          <h2>{capitalizeFirstLetter(categoryType)}</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Type</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {firstCurrentUserOne.map((category) => (
                <tr key={category.id}>
                  <td>{category.category_name}</td>
                  <td>
                    {category.image && (
                      <img
                        src={`data:image/png;base64,${category.image}`}
                        alt={category.category_name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </td>
                  <td>{capitalizeFirstLetter(categoryType)}</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                      onClick={() => redirectToUpdate(category.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-file-x-fill"
                      viewBox="0 0 16 16"
                      onClick={() => handleDelete(category.id)}
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
              marginTop: "2rem",
              marginRight:'4rem'
            }}
          >
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {Array.from(
                  {
                    length: Math.ceil(
                      categoriesOne.length / firstCategoriesPerPage
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
        </div>
      </>
    );
  }

  function RenderCategoriesTwo({ categoryType }) {
    return (
      <>
        <div key={categoryType} style={{ marginTop: ".5rem" }} >
          <h2>{capitalizeFirstLetter(categoryType)}</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Type</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {firstCurrentUserTwo.map((category) => (
                <tr key={category.id}>
                  <td>{category.category_name}</td>
                  <td>
                    {category.image && (
                      <img
                        src={`data:image/png;base64,${category.image}`}
                        alt={category.category_name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </td>
                  <td>{capitalizeFirstLetter(categoryType)}</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                      onClick={() => redirectToUpdate(category.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-file-x-fill"
                      viewBox="0 0 16 16"
                      onClick={() => handleDelete(category.id)}
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
              marginTop: "2rem",
              marginRight:'4rem'
            }}
          >
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {Array.from(
                  {
                    length: Math.ceil(
                      categoriesTwo.length / secondCategoriesPerPage
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
        </div>
      </>
    );
  }

  function RenderCategoriesThree({ categoryType }) {
    return (
      <>
        <div key={categoryType} style={{ marginTop: ".5rem" }}>
          <h2>{capitalizeFirstLetter(categoryType)}</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Type</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {firstCurrentUserThree.map((category) => (
                <tr key={category.id}>
                  <td>{category.category_name}</td>
                  <td>
                    {category.image && (
                      <img
                        src={`data:image/png;base64,${category.image}`}
                        alt={category.category_name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </td>
                  <td>{capitalizeFirstLetter(categoryType)}</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                      onClick={() => redirectToUpdate(category.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-file-x-fill"
                      viewBox="0 0 16 16"
                      onClick={() => handleDelete(category.id)}
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
              marginRight:'4rem',
              marginTop: "2rem",
            }}
          >
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {Array.from(
                  {
                    length: Math.ceil(
                      categoriesThree.length / thirdCategoriesPerPage
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
        </div>
      </>
    );
  }
};

export default Category;
