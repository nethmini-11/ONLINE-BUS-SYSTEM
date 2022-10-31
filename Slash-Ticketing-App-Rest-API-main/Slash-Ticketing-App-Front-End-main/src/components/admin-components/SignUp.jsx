import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      mobileNo: null,
      userName: null,
      password: null,
      confirmPassword: null,
      roleType: "local",
      expireDays: null,
      expireDaysVisble: true,
      busRoot: null,
      busNo: null,
      busVisible: true,
      signin: false,
    };
  }

  register = (e) => {
    e.preventDefault();
    this.postData();
    toast.info("✔️ You're Susseccfully Registered !", {
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
          signin: true,
        });
      }.bind(this),
      3000
    );
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

  signin = (e) => {
    e.preventDefault();
    this.setState({
      signin: true,
    });
  };

  render() {
    if (this.state.signin) {
      return (
        <div>
          <Redirect to="/" />
        </div>
      );
    }
    return (
      <div>
        <div>
          <ToastContainer />
          {/* <div id="preloader">
            <div className="loader" />
          </div> */}
          <div className="login-area">
            <div className="container">
              <div className="login-box ptb--100">
                <form
                  autoComplete="off"
                  onSubmit={(e) => {
                    this.register(e);
                  }}
                >
                  <div className="login-form-head">
                    <h4>Sign up</h4>
                    <p>Hello there, Sign up and Join with Us</p>
                  </div>
                  <div className="login-form-body">
                    <div className="form-gp">
                      <input
                        type="text"
                        id="exampleInputName1"
                        placeholder="Full Name"
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
                      <input
                        type="email"
                        id="exampleInputEmail1"
                        placeholder="Email address"
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
                      <input
                        type="text"
                        id="exampleInputMobile"
                        placeholder="Mobile Number"
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
                      <input
                        type="text"
                        id="exampleInputUserName"
                        placeholder="User Name"
                        onChange={(event) => {
                          this.setState({ userName: event.target.value });
                        }}
                        value={this.state.userName}
                        required
                      />
                      <i className="ti-mobile" />
                      <div className="text-danger" />
                    </div>

                    <div className="form-gp">
                      <input
                        type="password"
                        id="exampleInputPassword1"
                        placeholder="Password"
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
                      <input
                        type="password"
                        id="exampleInputPassword2"
                        placeholder="Confirm Password"
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

                    <div className="form-group">
                      <label className="col-form-label">Role Type</label>

                      <select
                        className="custom-select style-input select-style"
                        name="roleType"
                        id="roleType"
                        value={this.state.roleType}
                        onChange={(event) => {
                          this.setState({ roleType: event.target.value });

                          setTimeout(
                            function () {
                              this.setState({
                                expireDaysVisble: true,
                                busVisible: true,
                              });

                              if (this.state.roleType == "foreign") {
                                this.setState({
                                  expireDaysVisble: false,
                                });
                              }
                              if (this.state.roleType == "bus") {
                                this.setState({
                                  busVisible: false,
                                });
                              }
                            }.bind(this),
                            500
                          );
                        }}
                        required
                      >
                        <option value="local" selected="selected">
                          Local User
                        </option>
                        <option value="foreign">Foreign User</option>
                        <option value="bus">Bus Employee</option>
                      </select>
                      <i className="ti-role" />
                      <div className="text-danger" />
                    </div>

                    <div
                      className="form-gp"
                      hidden={this.state.expireDaysVisble}
                    >
                      <input
                        type="text"
                        id="exampleInputExpireDays"
                        placeholder="Expire Days"
                        onChange={(event) => {
                          this.setState({ expireDays: event.target.value });
                        }}
                        value={this.state.expireDays}
                      />
                      <i className="ti-timer" />
                      <div className="text-danger" />
                    </div>

                    <div className="form-gp" hidden={this.state.busVisible}>
                      <input
                        type="text"
                        id="exampleInputBusRoot"
                        placeholder="Bus Root"
                        onChange={(event) => {
                          this.setState({
                            busRoot: event.target.value,
                          });
                        }}
                        value={this.state.busRoot}
                      />
                      <i className="ti-location-pin" />
                      <div className="text-danger" />
                    </div>

                    <div className="form-gp" hidden={this.state.busVisible}>
                      <input
                        type="text"
                        id="exampleInputBusNo"
                        placeholder="Bus No"
                        onChange={(event) => {
                          this.setState({
                            busNo: event.target.value,
                          });
                        }}
                        value={this.state.busNo}
                      />
                      <i className="ti-truck" />
                      <div className="text-danger" />
                    </div>

                    <div className="submit-btn-area">
                      <button id="form_submit" type="submit">
                        Submit <i className="ti-arrow-right" />
                      </button>
                    </div>

                    <div className="form-footer text-center mt-5">
                      <p className="text-muted">
                        have an account?
                        <a
                          href="/login"
                          onClick={(e) => {
                            this.signin(e);
                          }}
                        >
                          Sign In
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
