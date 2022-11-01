import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Clock from "react-live-clock";

// Components
import AdminUserList from "../admin-components/AdminUserList";
import EditAdminProfile from "./components/EditAdminProfile";
import DashboardLogin from "../admin-components/DashboardLogin";
import AddAccount from "../admin-components/AddAccount";
import EditAdminUser from "./components/EditAdminUser";
import SignUp from "../admin-components/SignUp";
import AddJourney from "../bus-employee-components/AddJourney";
import JourneyList from "../bus-employee-components/JourneyList";
import EditJourney from "../bus-employee-components/EditJourney";
import AddInspectedBuses from "../inspector-components/AddInspectedBuses";
import InspectedDetails from "../transport-manager-components/InspectedDetails";
import AddTimetables from "../transport-manager-components/AddTimetables";
import ManageTimetables from "../transport-manager-components/ManageTimetables";
import AddInvalidTickets from "../inspector-components/AddInvalidTickets";
import InspectReport from "../transport-manager-components/InspectReport";
import AddComplain from "../passenger-components/AddComplain";
import Qrgenerate from "../passenger-components/qrgeneration";
import PassengerViewComplain from "../passenger-components/PassengerViewComplain";
import EditComplain from "../passenger-components/EditComplain";
import ViewComplain from "../transport-manager-components/ViewComplain";
import MainDash from "./components/MainDash";
import AddFunds from "../passenger-components/addFunds";
import Withdraw from "../bus-employee-components/Withdraw";
import GenerateQr from "../bus-employee-components/GenerateQR";
import GenerateQrlong from "../bus-employee-components/GenerateQR long";
import EditTimetables from "../transport-manager-components/EditTimetables";
import EditInvalidTickets from "../inspector-components/EditInvalidTickets";
import EditInspectedBuses from "../inspector-components/EditInspectedBuses";
import CountChart from "./components/CountChart";
import PieChart from "./components/PieChart";
class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      activeUser: [],
      redirect: null,
      login: false,
      hiddenManager: true,
      hiddenInspector: true,
      hiddenBus: true,
      hiddenUser: true,
    };
  }

  logoutAction = () => {
    this.state.activeUser = [];
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.setState({ redirect: "/" });

    toast.info("✔️ You're Succesfully Loged Out", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  componentDidMount() {
    let active = JSON.parse(localStorage.getItem("login"));
    if (active && active.login) {
      this.setState({
        login: true,
      });
      if (active.userrole.localeCompare("manager") == 0) {
        this.setState({
          hiddenManager: false,
        });
      } else if (active.userrole.localeCompare("inspector") == 0) {
        this.setState({
          hiddenInspector: false,
        });
      } else if (active.userrole.localeCompare("bus") == 0) {
        this.setState({
          hiddenBus: false,
        });
      } else if (
        active.userrole.localeCompare("local") == 0 ||
        active.userrole.localeCompare("foreign") == 0
      ) {
        this.setState({
          hiddenUser: false,
        });
      } else {
        alert("Invalid User");
      }
      const LogedUserID = active.userid;
      const API = "http://localhost:3000";
      fetch(API + "/users/" + LogedUserID)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            isLoaded: true,
            activeUser: json,
          });
          window.sessionStorage.setItem(
            "activeUserID:",
            this.state.activeUser.id
          );
        });
    } else {
      this.state.activeUser = [];
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.setState({ redirect: "/" });
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Router>
          <Redirect to={this.state.redirect} />
          <Switch>
            <Route path="/" exact>
              <DashboardLogin />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
          </Switch>
        </Router>
      );
    }
    return (
      <div>
        {/* <ToastContainer /> */}
        {/* <div id="preloader">
          <div className="loader" />
        </div> */}
        <div className="page-container">
          <Router>
            {/* sidebar menu area start */}
            <div className="sidebar-menu">
              <div className="sidebar-header">
                <div className="logo">
                  <a href="/">
                    <img src="assets/images/icon/logo.png" alt="logo" />
                  </a>
                </div>
              </div>
              <div className="main-menu">
                <div className="menu-inner">
                  <nav>
                    <ul className="metismenu" id="menu">
                      <li className="">
                        <a>
                          <NavLink
                            to="/"
                            exact
                            activeStyle={{ color: "white" }}
                          >
                            <i className="ti-dashboard" />{" "}
                            <span>Dashboard</span>
                          </NavLink>
                        </a>
                      </li>
                      <li hidden={this.state.hiddenManager}>
                        <a href="javascript:void(0)" aria-expanded="true">
                          <i className=" ti-layout-grid2" />
                          <span>User Management</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/adminreg"
                                exact
                                activeStyle={{ color: "white" }}
                              >
                                <span>Add User</span>
                              </NavLink>
                            </a>
                          </li>
                          <li>
                            <a>
                              <NavLink
                                to="/adminuserlist"
                                exact
                                activeStyle={{ color: "white" }}
                              >
                                <span>Manage Users</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>



                      <li hidden={this.state.hiddenManager}>
                        <a href="javascript:void(0)" aria-expanded="true">
                          <i className=" ti-layout-grid2" />
                          <span>Report Generate</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/count"
                                exact
                                activeStyle={{ color: "white" }}
                              >
                                <span>User Count Report</span>
                              </NavLink>
                            </a>
                          </li>
                          <li>
                            <a>
                              <NavLink
                                to="/piechart"
                                exact
                                activeStyle={{ color: "white" }}
                              >
                                <span>Pie Chart Report</span>
                              </NavLink>


                              <NavLink
                                to="/adminuserlist"
                                exact
                                activeStyle={{ color: "white" }}
                              >
                                <span>User List Report</span>
                              </NavLink>







                            </a>
                          </li>
                        </ul>
                      </li>


























                      <li hidden={this.state.hiddenBus}>
                        <a
                          href="javascript:void(0)"
                          aria-expanded="true"
                          render={this.state.renderStoreManager}
                        >
                          <i className=" ti-layout-grid2" />
                          <span>Passenger Activities Management</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/addjourney"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Add Journey</span>
                              </NavLink>
                            </a>
                          </li>
                          <li>
                            <a>
                              <NavLink
                                to="/journeylist"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Journey List</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li hidden={this.state.hiddenInspector}>
                        <a
                          href="javascript:void(0)"
                          aria-expanded="true"
                          render={this.state.renderStoreManager}
                        >
                          <i className=" ti-layout-grid2" />
                          <span>Inspected Buses</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/addinspectedbuses"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Add Inspected Bus</span>
                              </NavLink>
                            </a>
                          </li>
                          <li>
                            <a>
                              <NavLink
                                to="/inspecteddetails"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Manage Inspected</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li hidden={this.state.hiddenManager}>
                        <a
                          href="javascript:void(0)"
                          aria-expanded="true"
                          render={this.state.renderStoreManager}
                        >
                          <i className=" ti-layout-grid2" />
                          <span>Inspected Buses</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/inspecteddetails"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Manage Inspected</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li hidden={this.state.hiddenManager}>
                        <a
                          href="javascript:void(0)"
                          aria-expanded="true"
                          render={this.state.renderStoreManager}
                        >
                          <i className=" ti-layout-grid2" />
                          <span>Time Tables</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/addtimetable"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Add TimeTables</span>
                              </NavLink>

                              <NavLink
                                to="/count"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Count Report</span>
                              </NavLink>





                            </a>
                          </li>
                          <li>
                            <a>
                              <NavLink
                                to="/managetimetable"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Manage TimeTables</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li hidden={this.state.hiddenInspector}>
                        <a
                          href="javascript:void(0)"
                          aria-expanded="true"
                          render={this.state.renderStoreManager}
                        >
                          <i className=" ti-layout-grid2" />
                          <span>Rule Violations</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/addrule"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Add Violations</span>
                              </NavLink>
                            </a>
                          </li>
                          <li>
                            <a>
                              <NavLink
                                to="/managerule"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Manage Violations</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li hidden={this.state.hiddenManager}>
                        <a
                          href="javascript:void(0)"
                          aria-expanded="true"
                          render={this.state.renderStoreManager}
                        >
                          <i className=" ti-layout-grid2" />
                          <span>Rule Violations</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/managerule"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Manage Violations</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li hidden={this.state.hiddenUser}>
                        <a
                          href="javascript:void(0)"
                          aria-expanded="true"
                          render={this.state.renderStoreManager}
                        >
                          <i className=" ti-layout-grid2" />
                          <span>Complains</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/addcomplain"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Add Complain</span>
                              </NavLink>
                            </a>
                          </li>
                          <li>
                            <a>
                              <NavLink
                                to="/managecomplain"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Manage Complains</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li hidden={this.state.hiddenUser}>
                        <a
                          href="javascript:void(0)"
                          aria-expanded="true"
                          render={this.state.renderStoreManager}
                        >
                          <i className=" ti-layout-grid2" />
                          <span>Generate QR Code</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/generateqr3"
                                activeStyle={{ color: "white" }}
                              >
                                <span>Generate Your QR Code</span>
                              </NavLink>
                            </a>
                          </li>
                          
                        </ul>
                      </li>
                      <li hidden={this.state.hiddenManager}>
                        <a
                          href="javascript:void(0)"
                          aria-expanded="true"
                          render={this.state.renderStoreManager}
                        >
                          <i className=" ti-layout-grid2" />
                          <span>Complains</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/viewcomplain"
                                activeStyle={{ color: "white" }}
                              >
                                <span>View Complains</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            {/* sidebar menu area end */}
            {/* main content area start */}
            <div className="main-content">
              {/* page title area start */}
              <div className="page-title-area">
                <div className="row align-items-center">
                  <div className="col-sm-8">
                  <div className="col-md-6 col-sm-8 clearfix">
                    <div className="nav-btn pull-left">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="search-box pull-left">
                      <form action="#">
                        <input
                          type="text"
                          name="search"
                          placeholder="Search Here"
                          required
                        />
                        <i className="ti-search red-color" />
                      </form>
                    </div>
                  </div>
                  </div>
                  <div className="col-sm-1">
                    <div className="breadcrumbs-area clearfix">
                      {/* <h4 className="page-title pull-left text-uppercase">
                        {this.state.activeUser.role}
                      </h4> */}
                    </div>
                  </div>

                  <div className="col-sm-3 clearfix">
                    <div className="user-profile pull-right">
                      <img
                        className="avatar user-thumb"
                        src="assets/images/author/avatar.png"
                        alt="avatar"
                      />
                      <h4
                        className="user-name dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        {this.state.activeUser.username}{" "}
                        <i className="fa fa-angle-down red-color" />
                      </h4>
                      <div className="dropdown-menu">
                        <a className="dropdown-item">
                          <Link to="/editprofile">Edit Profile</Link>
                        </a>
                        <a className="dropdown-item" hidden={this.state.hiddenUser}>
                          <Link to="/addfunds">Recharge Account</Link>
                        </a>
                        <a className="dropdown-item" hidden={this.state.hiddenBus}>
                          <Link to="/withdraw">Withdraw Earning</Link>
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => this.logoutAction()}
                        >
                          <Link>Log Out</Link>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* page title area end */}
              <div className="main-content-inner">
                <Switch>
                  <Route path="/" exact>
                    <MainDash />
                  </Route>
                  {/* <Route path="/dash" exact>
                    <DashBoard />
                  </Route> */}
                  <Route path="/adminreg" exact>
                    <AddAccount />
                  </Route>
                  <Route path="/adminuserlist" exact>
                    <AdminUserList />
                  </Route>

                  <Route path="/editprofile" exact>
                    <EditAdminProfile />
                  </Route>
                  <Route path="/editadminuser" exact>
                    <EditAdminUser />
                  </Route>
                  <Route path="/addjourney" exact>
                    <AddJourney />
                  </Route>
                  <Route path="/journeylist" exact>
                    <JourneyList />
                  </Route>
                  <Route path="/editjourney" exact>
                    <EditJourney />
                  </Route>
                  <Route path="/addinspectedbuses" exact>
                    <AddInspectedBuses />
                  </Route>
                  <Route path="/inspecteddetails" exact>
                    <InspectedDetails />
                  </Route>
                  <Route path="/editbus" exact>
                    <EditInspectedBuses />
                  </Route>
                  <Route path="/addtimetable" exact>
                    <AddTimetables />
                  </Route>
                  <Route path="/managetimetable" exact>
                    <ManageTimetables />
                  </Route>
                  <Route path="/edittimetable" exact>
                    <EditTimetables />
                  </Route>
                  <Route path="/addrule" exact>
                    <AddInvalidTickets />
                  </Route>
                  <Route path="/managerule" exact>
                    <InspectReport />
                  </Route>
                  <Route path="/editreport" exact>
                    <EditInvalidTickets />
                  </Route>
                  <Route path="/addcomplain" exact>
                    <AddComplain />
                  </Route>
                  <Route path="/generateqr3" exact>
                    <Qrgenerate />
                  </Route>
                  <Route path="/managecomplain" exact>
                    <PassengerViewComplain />
                  </Route>
                  <Route path="/editcomplain" exact>
                    <EditComplain />
                  </Route>
                  <Route path="/viewcomplain" exact>
                    <ViewComplain />
                  </Route>
                  <Route path="/addfunds" exact>
                    <AddFunds />
                  </Route>
                  <Route path="/withdraw" exact>
                    <Withdraw />
                  </Route>
                  <Route path="/generateqr" exact>
                    <GenerateQr />
                  </Route>
                  <Route path="/generateqr2" exact>
                    <GenerateQrlong />
                  </Route>

              

                  <Route path="/count" exact>
                    < CountChart />
                  </Route>


                 

                  <Route path="/piechart" exact>
                    < PieChart />
                  </Route>



                </Switch>
              </div>
            </div>
            {/* main content area end */}
            {/* footer area start*/}
            <footer>
              <div className="footer-area">
                <p>
                  © Copyright 2020 <a href="">Ticketing App</a>. All right
                  reserved. Developed by <a href="">Team BackSlash</a>.
                </p>
              </div>
            </footer>
            {/* footer area end*/}
          </Router>
        </div>
        {/* page container area end */}
      </div>
    );
  }
}

export default DashboardLayout;
