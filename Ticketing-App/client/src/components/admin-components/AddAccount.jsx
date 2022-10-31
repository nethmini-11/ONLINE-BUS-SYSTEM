import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";

class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      mobileNo: null,
      userName: null,
      password: null,
      confirmPassword: null,
      roleType: "inspector",
      redirect: null,
    };
  }

  addAccount = (e) => {
    e.preventDefault();

    if (this.state.confirmPassword !== this.state.password) {
      toast.error("🚫 Both Passwords should be matched !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      this.postData();
      toast.info("✔️ Account Susseccfully Added to the System !", {
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
          this.setState({
            redirect: "/adminuserlist",
          });
        }.bind(this),
        3000
      );
    }
  };

  async postData() {
    try {
      const apiURL = "http://localhost:3000";
      let result = await fetch(apiURL + "/users", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.state),
      });
      console.log("Result: " + result);
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return (
      <div>
        <ToastContainer />
        <div className="container p-0">
          <div className="row no-gutters">
            <div className="login-box-s2 ptb--100">
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  this.addAccount(e);
                }}
              >
                <div className="login-form-head">
                  <h4>Add User Account</h4>
                  <p>
                    Add Users to Give Access to Manage <br /> The Flash
                    Ticketing System
                  </p>
                </div>
                <div className="login-form-body">
                  <div className="form-gp">
                    <label htmlFor="exampleInputName1">Full Name</label>
                    <input
                      type="text"
                      id="inputFullName"
                      name="fullName"
                      onChange={(event) => {
                        this.setState({ fullName: event.target.value });
                      }}
                      value={this.state.fullName}
                      required
                    />
                    <i className="ti-user" />
                    <div className="text-danger" />
                  </div>
                  <div className="form-gp">
                    <label htmlFor="exampleInputName1">User Role</label>
                    <br />
                    <br />
                    <select
                      className="custom-select style-input select-style"
                      name="userRole"
                      id="userRole"
                      value={this.state.roleType}
                      onChange={(event) => {
                        this.setState({ roleType: event.target.value });
                      }}
                      required
                    >
                      <option value="inspector" selected="selected">
                        Inspector
                      </option>
                      <option value="manager">Transport Manager</option>
                    </select>
                    <div className="text-danger" />
                  </div>
                  <div className="form-gp">
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <input
                      type="userName"
                      id="inputUsername"
                      name="userName"
                      onChange={(event) => {
                        this.setState({ userName: event.target.value });
                      }}
                      value={this.state.userName}
                      required
                    />
                    <i className="ti-id-badge" />
                    <div className="text-danger" />
                  </div>
                  <div className="form-gp">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      id="inputEmail"
                      name="email"
                      onChange={(event) => {
                        this.setState({ email: event.target.value });
                      }}
                      value={this.state.email}
                      required
                    />
                    <i className="ti-email" />
                    <div className="text-danger" />
                  </div>
                  <div className="form-gp">
                    <label htmlFor="exampleInputContactNo1">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="mobileNo"
                      name="mobileNo"
                      onChange={(event) => {
                        this.setState({ mobileNo: event.target.value });
                      }}
                      value={this.state.mobileNo}
                      required
                    />
                    <i className="ti-mobile" />
                    <div className="text-danger" />
                  </div>
                  <div className="form-gp">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      id="inputPassword"
                      name="password"
                      onChange={(event) => {
                        this.setState({ password: event.target.value });
                      }}
                      value={this.state.password}
                      required
                    />
                    <i className="ti-lock" />
                    <div className="text-danger" />
                  </div>
                  <div className="form-gp">
                    <label htmlFor="exampleInputPassword2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={(event) => {
                        this.setState({
                          confirmPassword: event.target.value,
                        });
                      }}
                      value={this.state.confirmPassword}
                      required
                    />
                    <i className="ti-lock" />
                    <div className="text-danger" />
                  </div>
                  <center>
                    <div className="submit-btn-area">
                      <button id="form_submit" type="submit">
                        Submit <i className="ti-save" />
                      </button>
                    </div>
                  </center>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAccount;
