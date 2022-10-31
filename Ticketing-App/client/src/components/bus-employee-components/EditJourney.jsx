import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";

class EditJourney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeJourney: null,
      busUserId: "",
      userId: "",
      busRoute: "",
      terminal: "",
      destination: "",
      amount: "",
      redirect: "",
      userList: [],
    };
  }

  componentDidMount() {
    let active_journey_id = sessionStorage.getItem("selectedJourneyID:");
    const API = "http://localhost:3000";
    fetch(API + "/journeys/" + active_journey_id)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          activeJourney: json,
          busUserId: json.busUserId,
          userId: json.userId,
          busRoute: json.busRoute,
          terminal: json.terminal,
          destination: json.destination,
          amount: json.amount,
        });
      });

    fetch(API + "/users/passengers/getlist")
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.setState({
            userList: json
          });
        }).catch(error => {
      console.log(error);
    });
  }

  updateJourney = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(this.state));
    this.postData();
  };

  async postData() {
    try {
      let id = sessionStorage.getItem("selectedJourneyID:");
      let result;
      let API = "http://localhost:3000";

      result = await fetch(API + "/journeys/" + id, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          busUserId: this.state.busUserId,
          userId: this.state.userId,
          busRoute: this.state.busRoute,
          terminal: this.state.terminal,
          destination: this.state.destination,
          amount: this.state.amount,
        }),
      });

      console.log("Result: " + result);
      toast.info("✔️ Journey Updated Susseccfully !", {
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
          this.setState({ redirect: "/journeylist" }); //After 3 second, set redirect to true
        }.bind(this),
        3000
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    let {userList} = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return (
      <div>
        <ToastContainer />
        <div className="row">
          <div className="col-lg-12 mt-5">
            <div className="card">
              <div className="card-body">
                <div>
                  <h2 className="header-title">Add Journeys</h2>
                </div>
                <br />
                <form
                  autoComplete="off"
                  onSubmit={(e) => {
                    this.updateJourney(e);
                  }}
>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Passenger
                        </label>
                        <select
                            className="custom-select style-input select-style"
                            name="userId"
                            id="userId"
                            value={this.state.userId}
                            onChange={(event) => {
                              this.setState({ userId: event.target.value });
                            }}
                            required
                        >
                          <option value="" selected="selected"> Select Passenger </option>
                          {userList.map((user) => (
                              <option value={user.id}>{user.fullName}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Bus route</label>
                        <input
                          type="text"
                          className="form-control style-input"
                          placeholder="Bus Route"
                          name="busRoute"
                          onChange={(event) => {
                            this.setState({ busRoute: event.target.value });
                          }}
                          value={this.state.busRoute}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Terminal</label>
                        <input
                          type="text"
                          className="form-control style-input"
                          placeholder="Terminal"
                          name="terminal"
                          onChange={(event) => {
                            this.setState({ terminal: event.target.value });
                          }}
                          value={this.state.terminal}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Destination</label>
                        <input
                          type="text"
                          className="form-control style-input"
                          placeholder="Destination"
                          name="destination"
                          onChange={(event) => {
                            this.setState({ destination: event.target.value });
                          }}
                          value={this.state.destination}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Amount</label>
                        <input
                          type="number"
                          className="form-control style-input"
                          placeholder="Amount for the journey (LKR)"
                          name="amount"
                          onChange={(event) => {
                            this.setState({ amount: event.target.value });
                          }}
                          value={this.state.amount}
                          required
                        />
                      </div>

                      <div className="fashion-buttons text-left">
                        <button type="submit" className="btn fashion-btn ">
                          Submit
                        </button>
                      </div>
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

export default EditJourney;
