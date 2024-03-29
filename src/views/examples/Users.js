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
import Cookies from 'js-cookie';

const Users = (args) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('https://at-the-house-app.brandline360.com/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('https://at-the-house-app.brandline360.com/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.delete('https://at-the-house-app.brandline360.com/api/admin/delete-user/'+id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data.message);
      // fetchUsers()
    } catch (error) {
      alert(error.response.data.error);
    }
  }  
  
  
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Users</h3>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                      <th scope="row">
                        {user.name}
                      </th>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td className="text-right">
                        <Button color="danger" onClick={()=>{handleDelete(user.id)}}>Delete</Button>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Users;
