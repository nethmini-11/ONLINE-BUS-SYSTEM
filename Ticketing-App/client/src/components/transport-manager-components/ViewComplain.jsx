import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ViewComplain extends Component {
    constructor(props) {
        super(props);
        this.state = {
          publishedComplaints: [],
          isLoaded: false,
          redirect: null,
        };
    }
    componentDidMount() {
        const API = "http://localhost:3000";
        fetch(API + "/complaints")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    publishedComplaints: json,
                });
            });
    }
    
    deleteAction = (complaint) => {
        const API_URL = "http://localhost:3000/complaints/"+ complaint.id;

        try {
            let result = fetch(API_URL, { method: "delete" });
            console.log("Result: " + result);
            
            toast.success("✔️ Complain Deleted Succesfully !", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
      
            setTimeout(function() { //Start the timer
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
        let { isLoaded, publishedComplaints } = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">Manage complaints</h4>
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
                                <h4 className="header-title">Manage Complains</h4>
                                <div className="single-table">
                                    <div className="table-responsive">
                                        <table className="table table-hover text-center">
                                            <thead className="text-uppercase bg-theme">
                                                <tr className="text-white">
                                                  
                                                    <th scope="col">Complain ID</th>
                                                    <th scope="col">User ID</th>
                                                    <th scope="col">Reported User</th>
                                                    <th scope="col">Remarks</th>
                                                    <th scope = "col"> Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            {publishedComplaints.map((complaint) => (
                                                <tr key={complaint.id}>
                                                    <th scope="row">
                                                    {publishedComplaints.indexOf(complaint) + 1}
                                                    </th>
                                                  <td>{complaint.userId}</td>
                                                    <td>{complaint.reportUser}</td>

                                                    <td>{complaint.remarks} </td>
                                                    
                                                    
                                                    <td>
                                                    <button
                                                        style={{
                                                        paddingLeft: 40,
                                                        border: "none",
                                                        background: "none",
                                                             }}
                                                         onClick={() => this.deleteAction(complaint)}
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

export default ViewComplain;
