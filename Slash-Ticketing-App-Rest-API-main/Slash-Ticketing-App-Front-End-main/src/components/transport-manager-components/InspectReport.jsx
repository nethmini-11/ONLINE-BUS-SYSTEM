import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";;

class InspectReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inspectedReports: [],
            isLoaded: false,
            redirect: null,
        };
    }

    componentDidMount() {
        const API = "http://localhost:3000";
        fetch(API + "/inspectreports")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    inspectedReports: json,
                });
            });
    }

    editAction(record) {
        // alert("Edit = " + record.id);
       window.sessionStorage.setItem("selectedReportID:", record.id);
   }

   deleteAction(record) {
       const API_URL = "http://localhost:3000/inspectreports/" + record.id;

       try {
           let result = fetch(API_URL, { method: "delete" });

           console.log("Result: " + result);
           toast.success("✔️ Inspected Report Deleted Succesfully !", {
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
        let { isLoaded, inspectedReports } = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">Manage Inspected Report details</h4>
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
                                <h4 className="header-title">Manage Rule Violations and Invalid Ticket Details</h4>
                                <div className="single-table">
                                    <div className="table-responsive">
                                        <table className="table table-hover text-center">
                                            <thead className="text-uppercase bg-theme">
                                                <tr className="text-white">
                                                    <th scope="col">ID</th>
                                                    <th scope="col">User ID</th>
                                                    <th scope="col">Inspected Detail ID</th>
                                                    <th scope="col">User Type</th>
                                                    <th scope="col">Reported user (User ID / Bus ID)</th>
                                                    <th scope="col">Remarks</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                            {inspectedReports.map((record) => (
                                                        <tr key={record.id}>
                                                            <th scope="row">
                                                                {inspectedReports.indexOf(record) + 1}
                                                            </th>
                                                            <td>{record.userId}</td>
                                                            <td>{record.inspectedId}</td>
                                                            <td>{record.reportUser}</td>
                                                            <td>{record.userType}</td>
                                                            <td>{record.remarks}</td>
                                                            <td>
                                                                <button
                                                                    style={{
                                                                        padding: 0,
                                                                        border: "none",
                                                                        background: "none",
                                                                    }}
                                                                    onClick={() => this.editAction(record)}
                                                                >
                                                                    <a href="/editreport">
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

export default InspectReport;
