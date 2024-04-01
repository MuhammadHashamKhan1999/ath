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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Agents from "views/examples/Agents";
import Users from "views/examples/Users";
import Category from "views/examples/Category";
import AddAgents from "views/examples/AddAgent";
import UpdateAgent from "views/examples/UpdateAgent";
import AddCategory from "views/examples/AddCategory";
import AgentServices from "views/examples/AgentServices";
import AddAgentServices from "views/examples/AddAgentServices";
import ContactUs from "views/examples/ContactUs";
import ViewReferrals from "views/examples/ViewReferrals";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    subcategories: []
  },
  {
    path: "/agents",
    name: "Agents",
    icon: "ni ni-badge text-blue",
    component: <Agents />,
    layout: "/admin",
    subcategories: [
      {
        path: "/agents",
        name: "Agents List",
        component: <Agents />
      },
      {
        path: "/add-agent", // Corrected path
        name: "Add Agent",
        component: <AddAgents />
      },
    ]
  },
  
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-circle-08 text-blue",
    component: <Users />,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-tv-2 text-primary",
    component: <Category />,
    layout: "/admin",
    subcategories:[
      {
        path: "/categories",
        name: "All Categories",
        component: <Category/>
      },
      {
        path: "/add-category",
        name: "Add Category",
        component: <AddCategory/>
      }
    ]
  },
  {
    path: "/agent-services",
    name: "Agent Services",
    icon: "ni ni-badge text-blue",
    component: <AgentServices />,
    layout: "/admin",
    subcategories:[
      {
        path: "/agent-services",
        name: "All Services",
        component: <AgentServices/>
      },
      {
        path: "/add-agent-services",
        name: "Add Services",
        component: <AddAgentServices/>
      }
    ]
  },
  {
    path: "/contatct-us",
    name: "Contact Us",
    icon: "ni ni-tv-2 text-primary",
    component: <ContactUs/>,
    layout: "/admin",
    subcategories:[
      {
        path: "/contatct-us",
        name: "Contact Us",
        component: <ContactUs/>
      }
    ]
  },
  {
    path: "/view-referrals",
    name: "Referrals",
    icon: "ni ni-books text-blue",
    component: <ViewReferrals/>,
    layout: "/admin",
    subcategories:[
      {
        path: "/view-referrals",
        name: "View Referrals",
        component: <ViewReferrals/>
      }
    ]
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  {
     path: "/login",
     name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
];
export default routes;
