import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddComplain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            reportUser: "",
            remarks: ""

        };
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.postData();
    };

    async postData() {
        try {
            let result = await fetch("http://localhost:3000/complaints", {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(this.state),
            });
            console.log("Result: " + result);
            toast.info("✔️ Complain Added Susseccfully !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(function () { //Start the timer
                this.setState({redirect: "/managecomplain"}) //After 3 second, set redirect to true
            }.bind(this), 3000)

        } catch (error) {
            console.log(error.message);
        }
    }

    onChangeHandler = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        if (this.state.redirect) {
            return (
                <div>
                    <Redirect to={this.state.redirect}/>
                </div>
            )
        }

        return (
            <div>
                <ToastContainer/>
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h4 className="header-title">Report User</h4>
                                    <p>
                                        Find something inconvenient?? Add your complain here and we'll get back to you
                                        faster! <br/>
                                    </p>
                                    <br/>
                                    <br/>
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
                                                <label htmlFor="exampleInputEmail1">
                                                    Report User
                                                </label>
                                                <input
                                                    type="reportUser"
                                                    className="form-control style-input"
                                                    id="ReportUser"
                                                    name="reportUser"
                                                    placeholder="Enter Bus Number"
                                                    value={this.state.reportUser}
                                                    onChange={this.onChangeHandler}

                                                    required
                                                />

                                                <div className="text-danger"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlTextarea1">Remarks</label>
                                                <textarea
                                                    className="form-control style-input"
                                                    id="Remarks"
                                                    placeholder="State what bothered you"
                                                    rows="3"
                                                    name="remarks"
                                                    value={this.state.remarks}
                                                    onChange={this.onChangeHandler}

                                                    required
                                                />
                                            </div>
                                            <div className="form-check text-left">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="exampleCheck1"
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="exampleCheck1">
                                                    Confirmation
                                                </label>
                                            </div>
                                            <div className="fashion-buttons text-left">
                                                <button type="submit" className="btn fashion-btn ">
                                                    Submit
                                                </button>
                                                <button type="reset" className="btn fashion-btn">
                                                    Clear
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6"></div>
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

export default AddComplain;
