import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class EditAdminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: [],
      fullName: "",
      userName: "",
      email: "",
      contactNo: "",
      roleType: "",
      password: "",
      newPassword: "",
      expireDays: null,
      expireDaysVisble: true,
      busRoot: null,
      busNo: null,
      busVisible: true,
      redirect: null,
    };
  }

  componentDidMount() {
    let active_user_id = sessionStorage.getItem("activeUserID:");
    const API = "http://localhost:3000";
    fetch(API + "/users/" + active_user_id)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          activeUser: json,
          fullName: json.fullName,
          userName: json.username,
          email: json.email,
          contactNo: json.mobileNo,
          password: json.password,
          roleType: json.role,
          expireDays: json.expireDates,
          busRoot: json.busRoute,
          busNo: json.busNo,
        });
        if (json.role === "bus") {
          this.setState({
            busVisible: false,
          });
        } else if (json.role == "foreign") {
          this.setState({
            expireDaysVisble: false,
          });
        }
      });
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(this.state));
    this.postData();
  };

  async postData() {
    try {
      let id = sessionStorage.getItem("activeUserID:");
      let result;
      let API = "http://localhost:3000";
      if (this.state.newPassword) {
        result = await fetch(API + "/users/" + id, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            fullName: this.state.fullName,
            username: this.state.userName,
            email: this.state.email,
            mobileNo: this.state.contactNo,
            password: this.state.newPassword,
            role: this.state.roleType,
            expireDays: this.state.expireDays,
            busRoot: this.state.busRoot,
            busNo: this.state.busNo,
          }),
        });
      } else {
        result = await fetch(API + "/users/" + id, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            fullName: this.state.fullName,
            username: this.state.userName,
            email: this.state.email,
            mobileNo: this.state.contactNo,
            password: this.state.password,
            role: this.state.roleType,
            expireDays: this.state.expireDays,
            busRoot: this.state.busRoot,
            busNo: this.state.busNo,
          }),
        });
      }

      console.log("Result: " + result);
      toast.info("✔️ Your Profile Updated Susseccfully !", {
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
          this.setState({ redirect: "/" }); //After 3 second, set redirect to true
        }.bind(this),
        3000
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  deleteProfile() {
    let id = sessionStorage.getItem("activeUserID:");
    const API = "http://localhost:3000";
    const API_URL = API + "/users/" + id;

    try {
      let result = fetch(API_URL, { method: "delete" });

      console.log("Result: " + result);
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
          this.state.activeUser = [];
          window.localStorage.clear();
          window.sessionStorage.clear();
          this.setState({ redirect: "/" });

          window.location.reload(false);
        }.bind(this),
        3000
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}><a href="/"></a></Redirect>;
    }
    return (
      <div>
        <ToastContainer />
        <div className="row">
          <div className="col-lg-12 mt-5">
            <div className="card">
              <div className="card-body">
                <div>
                  <h4 className="header-title">Edit Profile</h4>
                </div>
                <form onSubmit={this.onSubmitHandler} autoComplete="off">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Full Name</label>
                        <input
                          type="text"
                          className="form-control style-input"
                          placeholder="Full Name"
                          id="inputFullName"
                          name="fullName"
                          value={this.state.fullName}
                          onChange={this.onChangeHandler}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">User Name</label>
                        <input
                          type="text"
                          className="form-control style-input"
                          placeholder="User Name"
                          id="inputUserName"
                          name="userName"
                          value={this.state.userName}
                          onChange={this.onChangeHandler}
                          required
                          readOnly
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input
                          type="email"
                          className="form-control style-input"
                          placeholder="Email"
                          id="inputEmail"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangeHandler}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Contact Number
                        </label>
                        <input
                          type="text"
                          className="form-control style-input"
                          placeholder="Contact Number"
                          id="inputContactNo"
                          name="contactNo"
                          value={this.state.contactNo}
                          onChange={this.onChangeHandler}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="col-form-label">User Role</label>
                        <select
                          disabled="true"
                          className="custom-select style-input select-style"
                          name="userRole"
                          value={this.state.roleType}
                          required
                        >
                          <option value="">Select</option>
                          <option value="local">Local Passenger</option>
                          <option value="foreign">Foreign Passenger</option>
                          <option value="bus">Bus Employee</option>
                          <option value="inspector">Inspector</option>
                          <option value="manager">Transport Manager</option>
                        </select>
                      </div>

                      <div
                        className="form-group"
                        hidden={this.state.expireDaysVisble}
                      >
                        <label htmlFor="exampleInputEmail1">Expire Days</label>
                        <input
                          type="text"
                          className="form-control style-input"
                          placeholder="Expire Date"
                          id="expireDays"
                          name="expireDays"
                          value={this.state.expireDays}
                          onChange={this.onChangeHandler}
                        />
                      </div>

                      <div
                        className="form-group"
                        hidden={this.state.busVisible}
                      >
                        <label className="col-form-label">Bus Route</label>
                        <input
                          type="text"
                          className="form-control style-input"
                          placeholder="Bus No"
                          id="busRoot"
                          name="busRoot"
                          value={this.state.busRoot}
                          onChange={this.onChangeHandler}
                        />
                      </div>
                      <div
                        className="form-group"
                        hidden={this.state.busVisible}
                      >
                        <label htmlFor="exampleInputEmail1">Bus No</label>
                        <input
                          type="text"
                          className="form-control style-input"
                          placeholder="Bus No"
                          id="busNo"
                          name="busNo"
                          value={this.state.busNo}
                          onChange={this.onChangeHandler}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="form-control style-input"
                          placeholder="Current Password"
                          id="inputCurrentPassword"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangeHandler}
                          required
                          readOnly
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">New Password</label>
                        <input
                          type="password"
                          className="form-control style-input"
                          placeholder="New Password"
                          id="inputNewPassword"
                          name="newPassword"
                          value={this.state.newPassword}
                          onChange={this.onChangeHandler}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                          Enter New Password if you want to Update the Password.
                        </small>
                      </div>

                      <div className="form-check text-left">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Confirmation
                        </label>
                      </div>
                      <div className="fashion-buttons text-left">
                        <button type="submit" className="btn fashion-btn ">
                          Update Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => this.deleteProfile()}
                          className="btn delete-btn "
                        >
                          Delete Profile
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6"> </div>
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

export default EditAdminProfile;
