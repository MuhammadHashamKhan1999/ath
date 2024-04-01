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
import React from "react";
import { useLocation, Route, Routes, Navigate, useNavigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import Cookies from "js-cookie";
import AddAgents from "views/examples/AddAgent";
import UpdateAgent from "views/examples/UpdateAgent";
import AddCategory from "views/examples/AddCategory";
import UpdateCategory from "views/examples/UpdateCategory";
import AddAgentServices from "views/examples/AddAgentServices";
import UpdateAgentService from "views/examples/UpdateAgentService";

const Admin = (props) => {
  const navigate = useNavigate()
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;

    const token = Cookies.get('token');
    if (!token) {
      // If token does not exist, navigate to authentication page
      navigate("/auth");
    }
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
          <Route path="/add-agent" element={<AddAgents />} />
          <Route path="/update-agent/:id" element={<UpdateAgent />} />
          <Route path="/add-category" element={<AddCategory/>}/>
          <Route path="/update-category/:id" element={<UpdateCategory/>}/>
          <Route path="/add-agent-services" element={<AddAgentServices/>}/>
          <Route path="/update-agent-services/:id" element={<UpdateAgentService/>}/>
          {/* <Route path="/update-category/:id" element={<UpdateCategory/>}/> */}
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
