import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ManageTimetables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeTableRecords: [],
            isLoaded: false,
            redirect: null,
        };
    }


    componentDidMount() {
        const API = "http://localhost:3000";
        fetch(API + "/timetables")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    timeTableRecords: json,
                });
            });
    }

    editAction(record) {
         // alert("Edit = " + record.id);
        window.sessionStorage.setItem("selectedTimetableID:", record.id);
    }

    deleteAction(record) {
        const API_URL = "http://localhost:3000/timetables/" + record.id;

        try {
            let result = fetch(API_URL, { method: "delete" });

            console.log("Result: " + result);
            toast.success("✔️ Account Deleted Succesfully !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(function () { //Start the timer
                this.componentDidMount(); //After 1 second
            }.bind(this), 1000)

        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        let { isLoaded, timeTableRecords } = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">Manage Time Tables</h4>
                Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <ToastContainer />
                    {/* Same as */}
                    <ToastContainer />
                    <div className="row">
                        <div className="col-lg-12 mt-5">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Manage Time Tables</h4>
                                    <div className="single-table">
                                        <div className="table-responsive">
                                            <table className="table table-hover text-center">
                                                <thead className="text-uppercase bg-theme">
                                                    <tr className="text-white">
                                                        <th scope="col">ID</th>

                                                        <th scope="col">Bus Route</th>
                                                        <th scope="col">Bus No</th>
                                                        <th scope="col">Terminal</th>
                                                        <th scope="col">Destination</th>
                                                        <th scope="col">Departure</th>
                                                        <th scope="col">Arrival</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {timeTableRecords.map((record) => (
                                                        <tr key={record.id}>
                                                            <th scope="row">
                                                                {timeTableRecords.indexOf(record) + 1}
                                                            </th>
                                                            <td>{record.busRoute}</td>
                                                            <td>{record.busNo}</td>
                                                            <td>{record.terminal}</td>
                                                            <td>{record.destination}</td>
                                                            <td>{record.departureTime}</td>
                                                            <td>{record.arrivalTime}</td>
                                                            <td>
                                                                <button
                                                                    style={{
                                                                        padding: 0,
                                                                        border: "none",
                                                                        background: "none",
                                                                    }}
                                                                    onClick={() => this.editAction(record)}
                                                                >
                                                                    <a href="edittimetable">
                                                                        <i className="ti-pencil" />
                                                                    </a>
                                                                </button>
                                                            
                                                                <button
                                                                    style={{
                                                                        paddingLeft: 40,
                                                                        border: "none",
                                                                        background: "none",
                                                                    }}
                                                                    onClick={() => this.deleteAction(record)}
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

export default ManageTimetables;
