import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";

class EditInvalidTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeReport: null,
          userId: null,
          inspectedId: null,
          reportUser: null,
          userType: null,
          remarks: null,
          redirect: null,
        };
      }
    
      componentDidMount() {
        let active_report_id = sessionStorage.getItem("selectedReportID:");
        const API = "http://localhost:3000";
        fetch(API + "/inspectreports/" + active_report_id)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              activeTimetable: json,
              userId: json.userId,
              inspectedId: json.inspectedId,
              reportUser: json.reportUser,
              userType: json.userType,
              remarks: json.remarks,
            });
          });
      }
    
      updateReport = (e) => {
        e.preventDefault();
        // alert(JSON.stringify(this.state));
        this.postData();
      };
    
      async postData() {
        try {
          let id = sessionStorage.getItem("selectedReportID:");
          let result;
          let API = "http://localhost:3000";

          result = await fetch(API + "/inspectreports/" + id, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: this.state.userId,
                inspectedId: this.state.inspectedId,
                reportUser: this.state.reportUser,
                userType: this.state.userType,
                remarks: this.state.remarks,
            }),
          });
    
          console.log("Result: " + result);
          toast.info("✔️ Inspected Report Updated Successfully !", {
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
              this.setState({ redirect: "/managerule" }); //After 3 second, set redirect to true
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
                                    <h4 className="header-title">Update Rule violations and Invalid Tickets</h4>
                                </div>
                                <form  autoComplete="off"  onSubmit={(e) => {   this.updateReport(e);}}>
                                    <div className="row">
                                        <div className="col-md-8">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">User ID</label>
                                                <input
                                                    type="number"
                                                    className="form-control style-input"
                                                    name="userId"
                                                    onChange={(event) => {
                                                        this.setState({ userId: event.target.value });
                                                      }}
                                                      value={this.state.userId}
                                                ></input>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Inspected Detail ID</label>
                                                <input type="number"
                                                    className="form-control style-input"
                                                    name="inspectedId"
                                                    onChange={(event) => {
                                                        this.setState({ inspectedId: event.target.value });
                                                      }}
                                                      value={this.state.inspectedId}
                                                    required
                                                />
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Report the user (User ID / Bus ID)</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="(User ID / Bus ID)"
                                                    name="reportUser"
                                                    onChange={(event) => {
                                                        this.setState({ reportUser: event.target.value });
                                                      }}
                                                      value={this.state.reportUser}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">User Type</label>
                                                <select
                                                    className="custom-select style-input select-style"
                                                    name="userType"
                                                    onChange={(event) => {
                                                        this.setState({ userType: event.target.value });
                                                      }}
                                                      value={this.state.userType}
                                                    required
                                                >
                                                    <option value="local">Local Passenger</option>
                                                    <option value="foreign">Foreign Passenger </option>
                                                    <option value="bus">Bus</option>
                                                </select>
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

export default EditInvalidTickets;
