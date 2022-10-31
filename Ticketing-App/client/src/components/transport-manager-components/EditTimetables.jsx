import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";

class EditTimetables extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeTimetable: null,
          busRoute: null,
          busNo: null,
          terminal: null,
          destination: null,
          departureTime: null,
          arrivalTime: null,
          redirect: null,
        };
      }
    
      componentDidMount() {
        let active_timetable_id = sessionStorage.getItem("selectedTimetableID:");
        const API = "http://localhost:3000";
        fetch(API + "/timetables/" + active_timetable_id)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              activeTimetable: json,
              busRoute: json.busRoute,
              busNo: json.busNo,
              terminal: json.terminal,
              destination: json.destination,
              departureTime: json.departureTime,
              arrivalTime: json.arrivalTime,
            });
          });
      }
    
      updateTimetable = (e) => {
        e.preventDefault();
        // alert(JSON.stringify(this.state));
        this.postData();
      };
    
      async postData() {
        try {
          let id = sessionStorage.getItem("selectedTimetableID:");
          let result;
          let API = "http://localhost:3000";

          result = await fetch(API + "/timetables/" + id, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify({
                busRoute: this.state.busRoute,
                busNo: this.state.busNo,
                terminal: this.state.terminal,
                destination: this.state.destination,
                departureTime: this.state.departureTime,
                arrivalTime: this.state.arrivalTime,
            }),
          });
    
          console.log("Result: " + result);
          toast.info("✔️ Timetable Updated Successfully !", {
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
              this.setState({ redirect: "/managetimetable" }); //After 3 second, set redirect to true
            }.bind(this),
            3000
          );
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
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h4 className="header-title">Update Bus Timetables</h4>
                                </div>
                                 <form  autoComplete="off"  onSubmit={(e) => {   this.updateTimetable(e);}}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Bus Route</label>
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
                                                <label htmlFor="exampleInputEmail1">Bus No</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Bus No"
                                                    name="busNo"
                                                    onChange={(event) => {
                                                        this.setState({ busNo: event.target.value });
                                                      }}
                                                      value={this.state.busNo}
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
                                                <label htmlFor="exampleInputEmail1">Departure</label>
                                                <input
                                                    type="time"
                                                    className="form-control style-input"
                                                    placeholder="Departure from the Terminal"
                                                    name="departureTime"
                                                    onChange={(event) => {
                                                        this.setState({ departureTime: event.target.value });
                                                      }}
                                                      value={this.state.departureTime}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Arrival</label>
                                                <input
                                                    type="time"
                                                    className="form-control style-input"
                                                    placeholder="Arriving at the Destination"
                                                    name="arrivalTime"
                                                    onChange={(event) => {
                                                        this.setState({ arrivalTime: event.target.value });
                                                      }}
                                                      value={this.state.arrivalTime}
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

export default EditTimetables;
