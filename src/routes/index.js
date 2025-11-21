import Login from "../Login";
import Accounts from "../pages/Accounts";
import Budgets from "../pages/Budgets";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Goals from "../pages/Goals";
import Home from "../pages/Home";
import Profile from "../pages/Profile"; 
import Register from "../pages/Register";
import Reports from "../pages/Reports";
import Transactions from "../pages/Transactions";
import Web from "../Web";

const indexRoute = [
  {
    path: "/home",
    Component: Home,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "transactions",
        Component: Transactions,
      },
      {
        path: "budgets",
        Component: Budgets,
      },
      {
        path: "categories",
        Component: Categories,
      },
      {
        path: "reports",
        Component: Reports,
      },
      {
        path: "accounts",
        Component: Accounts,
      },
      {
        path: "goals",
        Component: Goals,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
];

export default indexRoute;
