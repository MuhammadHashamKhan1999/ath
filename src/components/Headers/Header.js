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

// reactstrap components
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [categories, setCategories] = useState([]);

  const getUsers = async () => {
    const token = Cookies.get("token");
    const response = await axios.get(
      "https://at-the-house-app.brandline360.com/api/admin/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUsers(response.data.users.length);
  };

  const getAgents = async () => {
    const token = Cookies.get("token");
    const response = await axios.get(
      "https://at-the-house-app.brandline360.com/api/admin/agents",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAgents(response.data.agents.length);
  };


  const getCategories = async () => {
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

      let popular = response.data.services.popular.length
      let most_demanding = response.data.services.most_demanding.length
      let normal = response.data.services.normal.length

      setCategories(popular + most_demanding + normal);
  };

  useEffect(() => {
    getUsers();
    getAgents();
    getCategories()
  }, []);

  return (
    <>
      <div
        className="header bg-gradient-black pb-8 pt-5 pt-md-8"
        style={{
          background:
            "linear-gradient(0deg, rgba(161,0,0,1) 0%, rgba(161,0,0,1) 66%)",
        }}
      >
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {users}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Agents
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{agents}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Categories
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{categories}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Agent Services
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{categories}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
