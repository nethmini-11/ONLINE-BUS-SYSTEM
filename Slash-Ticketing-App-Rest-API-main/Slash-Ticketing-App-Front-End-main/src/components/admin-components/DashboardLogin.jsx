import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

class DashboardLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      password: null,
      login: false,
      active: null,
      redirect: null,
      signup: false
    };
  }

  login = (e) => {
    e.preventDefault();
    let LOGIN_API = "http://localhost:3000";
    fetch(LOGIN_API+"/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userName: this.state.userName,
        password: this.state.password,
      }),
    }).then((response) => {
      response.json().then((result) => {
        console.log("result", result);
        if (result.message) {
          toast.error("🚫 User Not Found, UserName/Password does not Match", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        console.log(result.role);
        if (result && result.id) {
          localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              userName: result.userName,
              userid: result.id,
              userrole: result.role,
            })
          );
          let userFullName = result.fullName;

          toast.info(
            "✔️ Welcome " + userFullName + " !",
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }

        setTimeout(
          function () {
            //Start the timer
            this.storeCollector(); //After 2 second
          }.bind(this),
          2000
        );
      });
    });
  };

  signup = (e) => {
    e.preventDefault();
    this.setState({
      signup: true
    });

  };

  componentDidMount() {
    this.storeCollector();
  }

  storeCollector() {
    let active = JSON.parse(localStorage.getItem("login"));
    if (active && active.login) {
      this.setState({
        login: true,
        active: active,
        redirect: "/",
      });
      return;
    }
  }

  reload() {
    window.location.reload(false);
  }

  render() {
    if(this.state.signup) {
      return (
        <div>
          <Redirect to="/signup" />
        </div>
      );
    }
    if (this.state.login) {
      return (
        <div>
          <Redirect to="/" />
          <a href="/" onClick={this.reload()}> </a>
        </div>
      );
    }
    return (
      <div>
        <ToastContainer />
        <div className="login-area">
          <div className="container">
            <div className="login-box ptb--100">
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  this.login(e);
                }}
              >
                <div className="login-form-head">
                  <h4>Sign In</h4>
                  <p>Hello there, Sign in and start Using Ticketing App</p>
                </div>
                <div className="login-form-body">
                  <div className="form-gp">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input
                      type="Username"
                      id="exampleInputEmail1"
                      onChange={(event) => {
                        this.setState({ userName: event.target.value });
                      }}
                      value={this.state.userName}
                      required
                    />
                    <i className="ti-email" />
                    <div className="text-danger" />
                  </div>
                  <div className="form-gp">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      id="exampleInputPassword1"
                      onChange={(event) => {
                        this.setState({ password: event.target.value });
                      }}
                      value={this.state.password}
                      required
                    />
                    <i className="ti-lock" />
                    <div className="text-danger" />
                  </div>
                  {/* <div className="row mb-4 rmber-area">
                    <div className="col-6 text-right">
                      <a href="#">Forgot Password?</a>
                    </div>
                  </div> */}
                  <div className="submit-btn-area">
                    <button id="form_submit" type="submit">
                      Submit <i className="ti-arrow-right" />
                    </button>
                  </div>
                  <div className="form-footer text-center mt-5">
                    <p className="text-muted">
                      Don't have an account?{" "}
                      <a href="/signup"
                        onClick={(e) => {
                          this.signup(e);
                        }}
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* login area end */}
      </div>
    );
  }
}

export default DashboardLogin;
