import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";

class EditInspectedBuses extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeBus: null,
          userid: null ,
          busRoute: null,
          busNo: null,
          remarks: null,
          redirect: null,
        };
      }
    
      componentDidMount() {
        let active_bus_id = sessionStorage.getItem("selectedBusID:");
        const API = "http://localhost:3000";
        fetch(API + "/inspectdebuss/" + active_bus_id)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              activeBus: json,
              userid: json.userid,
              busRoute: json.busRoute,
              busNo: json.busNo,
              remarks: json.remarks,
              
            });
          });
      }
    
      updateBus = (e) => {
        e.preventDefault();
        // alert(JSON.stringify(this.state));
        this.postData();
      };
    
      async postData() {
        try {
          let id = sessionStorage.getItem("selectedBusID:");
          let result;
          let API = "http://localhost:3000";

          result = await fetch(API + "/inspectdebuss/" + id, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify({
                userid: this.state.userid,
                busRoute: this.state.busRoute,
                busNo: this.state.busNo,
                remarks: this.state.remarks,
    
            }),
          });
    
          console.log("Result: " + result);
          toast.info("✔️ Inspected Buses Updated Successfully !", {
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
              this.setState({ redirect: "/inspecteddetails" }); //After 3 second, set redirect to true
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
                                    <h4 className="header-title">Update Inspected Bus Details</h4>
                                </div>
                                <form  autoComplete="off"  onSubmit={(e) => {   this.updateBus(e);}}>
                                    <div className="row">
                                        <div className="col-md-8">
                                        <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">User ID</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="User ID"
                                                    name="userid"
                                                    onChange={(event) => {
                                                        this.setState({ userid: event.target.value });
                                                      }}
                                                      value={this.state.userid}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="col-form-label">Bus Route</label>
                                                <select
                                                    className="custom-select style-input select-style"
                                                    name="busRoute"
                                                    onChange={(event) => {
                                                        this.setState({ busRoute: event.target.value });
                                                      }}
                                                      value={this.state.busRoute}
                                                    required
                                                >
                                                    <option value="Wakwella - Karapitiya">Wakwella - Karapitiya</option>
                                                    <option value="Joolgaha - Wakwella">Joolgaha - Wakwella</option>
                                                    <option value="Kaduwela - Kollupitiya">Kaduwela - Kollupitiya</option>
                                                    <option value="Colombo - Pitakotuwa">Colombo - Pitakotuwa</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Bus ID</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Bus ID"
                                                    name="busNo"
                                                    onChange={(event) => {
                                                        this.setState({ busNo: event.target.value });
                                                      }}
                                                      value={this.state.busNo}
                                                    required
                                                />
                                                <small id="emailHelp" className="form-text text-muted">
                                                    This should be related to the bus route.
                        </small>
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlTextarea1">
                                                    Remarks
                        </label>
                                                <textarea
                                                    className="form-control style-input"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                    name="remarks"
                                                    onChange={(event) => {
                                                        this.setState({ remarks: event.target.value });
                                                      }}
                                                      value={this.state.remarks}
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

export default EditInspectedBuses;
