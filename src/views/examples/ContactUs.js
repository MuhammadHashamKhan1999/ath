/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useState } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
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
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import Cookies from "js-cookie";

const ContactUs = (args) => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(7); // Number of agents per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          "https://at-the-house-app.brandline360.com/api/support",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);


  const handleDelete = async (id) => {
    console.log(id)
    try {
      const token = Cookies.get("token");
      const response = await axios.delete(
        "https://at-the-house-app.brandline360.com/api/support/" + id, // Check this line
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      alert(response.data.message);
  
      // Remove the deleted user from the users state
      setContacts(prevContact => prevContact.filter(contact => contact.id !== id));
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  
  
  const indexOfLastAgent = currentPage * contactsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - contactsPerPage;
  const currentContact = contacts.slice(indexOfFirstAgent, indexOfLastAgent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Contacts</h3>
              </CardHeader>

              <CardBody className="text-center" style={{overflowX:'scroll'}}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Message</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentContact.map((contact, index) => (
                      <tr key={contact.id}>
                        <th scope="row">{index + 1}</th>
                        <td >{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.message}</td>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-file-x-fill"
                            viewBox="0 0 16 16"
                            onClick={() => handleDelete(contact.id)}
                            style={{marginLeft:'.5rem' , cursor:'pointer' , color:"#a10000" , marginTop:'1rem'}}
                          >
                            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M6.854 6.146 8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 1 1 .708-.708" />
                          </svg>
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
                        { length: Math.ceil(contacts.length / contactsPerPage) },
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
    </>
  );
};

export default ContactUs;
