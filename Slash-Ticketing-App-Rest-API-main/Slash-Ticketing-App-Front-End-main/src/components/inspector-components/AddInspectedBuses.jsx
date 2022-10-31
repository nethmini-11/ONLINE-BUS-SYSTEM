import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddInspectedBuses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: null ,
            busRoute: null,
            busNo: null,
            remarks: null,
        };
      }

      onSubmitHandler = (e) => {
        e.preventDefault();
        // alert(JSON.stringify(this.state));
        this.postData();
      };

      async postData() {
        try {
          let result = await fetch("http://localhost:3000/inspectdebuss", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(this.state),
          });
          console.log("Result: " + result);
          toast.success("✔️ Inspected Bus Added Susseccfully !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(function() { //Start the timer
            this.setState({redirect: "/inspecteddetails"}) //After 3 second, set redirect to true
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
                                    <h4 className="header-title">Add Inspected Bus Details</h4>
                                </div>
                                <form onSubmit={this.onSubmitHandler} autoComplete="off">
                                    <div className="row">
                                        <div className="col-md-8">
                                        <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">User ID</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="User ID"
                                                    name="userid"
                                                    value={this.state.userid}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="col-form-label">Bus Route</label>
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
                                                <label htmlFor="exampleInputEmail1">Bus ID</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Bus ID"
                                                    name="busNo"
                                                    value={this.state.busNo}
                                                    onChange={this.onChangeHandler}
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

export default AddInspectedBuses;
