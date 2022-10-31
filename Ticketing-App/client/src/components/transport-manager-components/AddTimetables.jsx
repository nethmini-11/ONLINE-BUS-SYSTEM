import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddTimetables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busRoute: null,
            busNo: null,
            terminal: null,
            destination: null,
            departureTime: null,
            arrivalTime: null,
            redirect: null,
        };
      }

      onSubmitHandler = (e) => {
        e.preventDefault();
        // alert(JSON.stringify(this.state));
        this.postData();
      };

      async postData() {
        try {
          let result = await fetch("http://localhost:3000/timetables", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(this.state),
          });
          console.log("Result: " + result);
          toast.success("✔️Timetable Added Susseccfully !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(function() { //Start the timer
            this.setState({redirect: "/managetimetable"}) //After 3 second, set redirect to true
          }.bind(this), 3000)
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

    render() {
        return (
            <div>
                <ToastContainer />
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h4 className="header-title">Create Bus Timetables</h4>
                                </div>
                                <form onSubmit={this.onSubmitHandler} autoComplete="off">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Bus Route</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Bus Route"
                                                    name="busRoute"
                                                    value={this.state.busRoute}
                                                    onChange={this.onChangeHandler}
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
                                                    value={this.state.busNo}
                                                    onChange={this.onChangeHandler}
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
                                                    value={this.state.terminal}
                                                    onChange={this.onChangeHandler}
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
                                                    value={this.state.destination}
                                                    onChange={this.onChangeHandler}
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
                                                    value={this.state.departureTime}
                                                    onChange={this.onChangeHandler}
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
                                                    value={this.state.arrivalTime}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                />
                                            </div>


                                            <div className="fashion-buttons text-left">
                                                <button type="submit" className="btn fashion-btn ">
                                                    Submit
                        </button>
                                                <button type="reset" className="btn fashion-btn">
                                                    Reset
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

export default AddTimetables;
