import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddInvalidTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            inspectedId: null,
            reportUser: null,
            userType: null,
            remarks: null
        };
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.postData();
    };

    async postData() {
        try {
            let result = await fetch("http://localhost:3000/inspectreports", {
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
            toast.success("✔️Inspect Reports Added Susseccfully !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(function () { //Start the timer
                this.setState({ redirect: "/managerule" }) //After 3 second, set redirect to true
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
                                    <h4 className="header-title">Add Rule violations and Invalid Tickets</h4>
                                </div>
                                <form onSubmit={this.onSubmitHandler} autoComplete="off">
                                    <div className="row">
                                        <div className="col-md-8">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">User ID</label>
                                                <input
                                                    type="number"
                                                    className="form-control style-input"
                                                    name="userId"
                                                    value={this.state.userId}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                ></input>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Inspected Detail ID</label>
                                                <input type="number"
                                                    className="form-control style-input"
                                                    name="inspectedId"
                                                    value={this.state.inspectedId}
                                                    onChange={this.onChangeHandler}
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
                                                    value={this.state.reportUser}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">User Type</label>
                                                <select
                                                    className="custom-select style-input select-style"
                                                    name="userType"
                                                    value={this.state.userType}
                                                    onChange={this.onChangeHandler}
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
                                                    value={this.state.remarks}
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

export default AddInvalidTickets;
