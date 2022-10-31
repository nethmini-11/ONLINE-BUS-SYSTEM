import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AdminUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminUsers: [],
      isLoaded: false,
      redirect: null,
    };
  }

  editAction(adminUser) {
    window.sessionStorage.setItem("selectedUserID:", adminUser.id);
  }

  deleteAction(adminUser) {
    if (adminUser.role == "manager") {
      toast.error("🚫 You don't have permissions !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const API = "http://localhost:3000";
      const API_URL = API + "/users/" + adminUser.id;

      try {
        let result = fetch(API_URL, { method: "delete" });
        toast.info("✔️ Account Deleted Succesfully !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(
          function () {
            //Start the timer
            this.componentDidMount(); //After 1 second
          }.bind(this),
          1000
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  componentDidMount() {
    const API = "http://localhost:3000";
    fetch(API + "/users")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          adminUsers: json,
        });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let { isLoaded, adminUsers } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <h4 className="header-title">Manage Users</h4>
          Loading...
        </div>
      );
    } else {
      return (
        <div>
          <ToastContainer />
          <div className="row">
            <div className="col-lg-12 mt-5">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title">Manage Users</h4>
                  <div className="single-table">
                    <div className="table-responsive">
                      <table className="table table-hover text-center">
                        <thead className="text-uppercase bg-theme">
                          <tr className="text-white">
                            <th scope="col">Index</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact No.</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {adminUsers.map((adminUser) => (
                            <tr key={adminUser.id}>
                              <th scope="row">
                                {adminUsers.indexOf(adminUser) + 1}
                              </th>
                              <td>{adminUser.username}</td>
                              <td>{adminUser.fullName}</td>
                              <td>{adminUser.role}</td>
                              <td>{adminUser.email}</td>
                              <td>{adminUser.mobileNo}</td>
                              <td>
                                <button
                                  style={{
                                    padding: 0,
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={() => this.editAction(adminUser)}
                                >
                                  <a href="/editadminuser">
                                    <i className="ti-pencil" />
                                  </a>
                                </button>
                              </td>
                              <td>
                                <button
                                  style={{
                                    padding: 0,
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={() => this.deleteAction(adminUser)}
                                >
                                  <i className="ti-trash" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default AdminUserList;
