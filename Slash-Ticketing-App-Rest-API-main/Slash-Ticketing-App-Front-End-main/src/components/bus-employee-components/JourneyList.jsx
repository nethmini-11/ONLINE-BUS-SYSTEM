import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class JourneyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journeyList: [],
      isLoaded: false,
      redirect: null,
    };
  }

  componentDidMount() {
    const busUserId = sessionStorage.getItem("activeUserID:");
    const API = "http://localhost:3000";
    fetch(API + "/journeysfind/" + busUserId)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          journeyList: json,
        });
      });
  }

  editAction(journey) {
    window.sessionStorage.setItem("selectedJourneyID:", journey.id);
  }

  deleteAction(journey) {
    const API = "http://localhost:3000";
    const API_URL = API + "/journeys/" + journey.id;

    try {
      let result = fetch(API_URL, { method: "delete" });
      toast.info("✔️ Journey Deleted Succesfully !", {
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

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let { isLoaded, journeyList } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <h4 className="header-title">Manage Your Journeis</h4>
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
                  <h4 className="header-title">Manage Your Journeis</h4>
                  <div className="single-table">
                    <div className="table-responsive">
                      <table className="table table-hover text-center">
                        <thead className="text-uppercase bg-theme">
                          <tr className="text-white">
                            <th scope="col">Index</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Bus Route</th>
                            <th scope="col">Terminal</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Amount (LKR)</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {journeyList.map((journey) => (
                            <tr key={journey.id}>
                              <th scope="row">
                                {journeyList.indexOf(journey) + 1}
                              </th>
                              <td>{journey.userId}</td>
                              <td>{journey.busRoute}</td>
                              <td>{journey.terminal}</td>
                              <td>{journey.destination}</td>
                              <td>{journey.amount}</td>
                              <td>
                                <button
                                  style={{
                                    padding: 0,
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={() => this.editAction(journey)}
                                >
                                  <a href="/editjourney">
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
                                  onClick={() => this.deleteAction(journey)}
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

export default JourneyList;
