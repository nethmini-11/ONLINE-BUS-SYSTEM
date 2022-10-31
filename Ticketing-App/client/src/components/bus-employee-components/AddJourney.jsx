import React, {Component} from "react";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from "react-router-dom";
import Dialog from 'react-dialog'
import "react-dialog/css/index.css";

class AddJourney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busUserId: "",
            userId: "",
            busRoute: "",
            terminal: "",
            destination: "",
            amount: "",
            redirect: null,
            userList: [],
            isDialogOpen: false,
        };
    }

    addJourney = (e) => {
        e.preventDefault();

        const apiURL = "http://localhost:3000";
        fetch(apiURL + "/funds/check/" + this.state.userId, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                amount: this.state.amount,
            }),
        }).then((res) => res.json()).then((json) => {
            console.log("Result: " + json.message);
            console.log("Result: " + json.error);
            if (json.error) {
                this.setState({isDialogOpen: true});
            } else if (json.message) {
                this.postData();
                this.postData2();
                this.toastAndDone();
            }
        }).catch(error => {
            console.log(error.message);
        })

    };

    toastAndDone() {
        toast.info("✔️ Journey Added Successfully !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        toast.info("✔️ Funds Transferred Successfully  !", {
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
                this.setState({
                    redirect: "/journeylist",
                });
            }.bind(this),
            3000
        );
    }

    async postData() {
        try {
            const apiURL = "http://localhost:3000";
            let result1 = await fetch(apiURL + "/funds/update/" + this.state.userId, {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    busUserId: this.state.busUserId,
                    amount: this.state.amount,
                }),
            });
            console.log("Result1: " + result1);


        } catch (error) {
            console.log(error.message);
        }
    }

    async postData2() {
        try {
            const apiURL = "http://localhost:3000";
            let result2 = await fetch(apiURL + "/journeys", {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    busUserId: this.state.busUserId,
                    userId: this.state.userId,
                    busRoute: this.state.busRoute,
                    terminal: this.state.terminal,
                    destination: this.state.destination,
                    amount: this.state.amount,
                }),
            });
            console.log("Result2: " + result2);
        } catch (e) {
            console.log(e.message);
        }

    }

    componentDidMount() {
        this.setState({
            busUserId: sessionStorage.getItem("activeUserID:"),
        });
        const API = "http://localhost:3000";
        fetch(API + "/users/passengers/getlist")
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    userList: json
                });
            }).catch(error => {
            console.log(error);
        });

        fetch(API + "/users/" + sessionStorage.getItem("activeUserID:"))
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    busRoute: json.busRoute
                });
            }).catch(error => {
            console.log(error);
        });
    }

    handleClose = () => {
        this.setState({
            isDialogOpen: false,
        })
        this.postData2();
        toast.info("✔️ Journey Added Successfully !", {
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
                this.setState({
                    redirect: "/journeylist",
                });
            }.bind(this),
            3000
        );
    }

    render() {
        let {userList} = this.state;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}></Redirect>;
        }
        return (
            <div>
                <ToastContainer/>
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h2 className="header-title">Add Journeys</h2>
                                </div>
                                <br/>
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        this.addJourney(e);
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">
                                                    Passenger
                                                </label>
                                                <select
                                                    className="custom-select style-input select-style"
                                                    name="userId"
                                                    id="userId"
                                                    value={this.state.userId}
                                                    onChange={(event) => {
                                                        this.setState({userId: event.target.value});
                                                    }}
                                                    required
                                                >
                                                    <option value="" selected="selected"> Select Passenger</option>
                                                    {userList.map((user) => (
                                                        <option value={user.id}>{user.fullName}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Bus route</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Bus Route"
                                                    name="busRoute"
                                                    readOnly="true"
                                                    onChange={(event) => {
                                                        this.setState({busRoute: event.target.value});
                                                    }}
                                                    value={this.state.busRoute}
                                                    required
                                                />
                                            </div>


                                        </div>

                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Terminal</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Terminal"
                                                    name="terminal"
                                                    onChange={(event) => {
                                                        this.setState({terminal: event.target.value});
                                                    }}
                                                    value={this.state.terminal}
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
                                                    onChange={(event) => {
                                                        this.setState({destination: event.target.value});
                                                    }}
                                                    value={this.state.destination}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Amount</label>
                                                <input
                                                    type="number"
                                                    className="form-control style-input"
                                                    placeholder="Amount for the journey (LKR)"
                                                    name="amount"
                                                    onChange={(event) => {
                                                        this.setState({amount: event.target.value});
                                                    }}
                                                    value={this.state.amount}
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
                {
                    this.state.isDialogOpen &&
                    <Dialog
                        title="Notice !"
                        modal={true}
                        onClose={this.handleClose}
                        buttons={
                            [{
                                text: "Close",
                                onClick: () => this.handleClose()
                            }]
                        }>
                        <h2>Manual Payment</h2>
                        <ul>
                            <li>Passenger does not have enough credits to do the Payment.</li>
                            <li>Bus Employee needs to collect Payment Manually from the Passenger</li>
                            <li>Show this to the Passenger and Collect Payment</li>
                            <li>Bus Route : <b>{this.state.busRoute}</b></li>
                            <li>Terminal : <b>{this.state.terminal}</b></li>
                            <li>Destination : <b>{this.state.destination}</b></li>
                            <li>Payment : <b>{this.state.amount} LKR</b></li>
                        </ul>
                    </Dialog>
                }
            </div>
        );
    }
}

export default AddJourney;
