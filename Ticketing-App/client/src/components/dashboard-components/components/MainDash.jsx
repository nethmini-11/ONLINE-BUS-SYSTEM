import React, { Component } from "react";
import DashBoard from "./DashBoard";
import InspectorDashboard from "./InspectorDashboard";
import BusEmployeeDashboard from "./BusEmployeeDashboard";
import PassengerDashboard from "./PassengerDashboard";

class MainDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: [],
      login: false,
      manager: false,
      inspector: false,
      bus: false,
      user: false,
    };
  }

  componentDidMount() {
    let active = JSON.parse(localStorage.getItem("login"));
    if (active && active.login) {
      this.setState({
        login: true,
      });
      if (active.userrole.localeCompare("manager") == 0) {
        this.setState({
          manager: true,
        });
      } else if (active.userrole.localeCompare("inspector") == 0) {
        this.setState({
          inspector: true,
        });
      } else if (active.userrole.localeCompare("bus") == 0) {
        this.setState({
          bus: true,
        });
      } else if (
        active.userrole.localeCompare("local") == 0 ||
        active.userrole.localeCompare("foreign") == 0
      ) {
        this.setState({
          user: true,
        });
      } else {
        alert("Invalid User");
      }
    }
  }

  render() {
    if (this.state.manager) {
      return (
        <div>
          <DashBoard />
        </div>
      );
    } else if (this.state.inspector) {
      return (
        <div>
          <InspectorDashboard />
        </div>
      );
    } else if (this.state.bus) {
      return (
        <div>
          <BusEmployeeDashboard />
        </div>
      );
    } else if (this.state.user) {
      return (
        <div>
          <PassengerDashboard />
        </div>
      );
    }
    return <div>{/* <DashBoard /> */}</div>;
  }
}

export default MainDash;
