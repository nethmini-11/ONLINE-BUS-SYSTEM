import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class InspectedDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inspectedRecords: [],
            isLoaded: false,
            redirect: null,
        };
    }

    componentDidMount() {
        const API = "http://localhost:3000";
        fetch(API + "/inspectdebuss")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    inspectedRecords: json,
                });
            });
    }

    editAction(record) {
        // alert("Edit = " + record.id);
       window.sessionStorage.setItem("selectedBusID:", record.id);
   }

   deleteAction(record) {
       const API_URL = "http://localhost:3000/inspectdebuss/" + record.id;

       try {
           let result = fetch(API_URL, { method: "delete" });

           console.log("Result: " + result);
           toast.success("✔️ Inspected Bus Detail Deleted Succesfully !", {
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
        let { isLoaded, inspectedRecords } = this.state;
      /*  if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">Manage Inspected Bus details</h4>
                Loading...
                </div>
            );
        } else { */
        return (
            <div>
                <ToastContainer />
                {/* Same as */}
                <ToastContainer />
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title">Manage Inspected Buses Details</h4>
                                <div className="single-table">
                                    <div className="table-responsive">
                                        <table className="table table-hover text-center">
                                            <thead className="text-uppercase bg-theme">
                                                <tr className="text-white">
                                                    <th scope="col">ID</th>

                                                    <th scope="col">User ID</th>
                                                    <th scope="col">Bus Route</th>
                                                    <th scope="col">Bus ID</th>

                                                    <th scope="col">Remarks</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                            {inspectedRecords.map((record) => (
                                                        <tr key={record.id}>
                                                            <th scope="row">
                                                                {inspectedRecords.indexOf(record) + 1}
                                                            </th>
                                                            <td>{record.userId}</td>
                                                            <td>{record.busRoute}</td>
                                                            <td>{record.busNo}</td>
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
                                                                    <a href="/editbus">
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
//}

export default InspectedDetails;
