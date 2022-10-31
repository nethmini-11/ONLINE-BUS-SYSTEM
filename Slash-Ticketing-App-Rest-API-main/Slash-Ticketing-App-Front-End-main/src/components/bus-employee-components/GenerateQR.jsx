import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Dialog from "react-dialog";

let QRCode = require('qrcode-react');

class GenerateQr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busUserId: "",
            busNo: "",
            busRoute: "",
            terminal: "",
            destination: "",
            amount: "",
            redirect: null,
            qrValue: "",
        };
    }


    componentDidMount() {
        this.setState({
            busUserId: sessionStorage.getItem("activeUserID:"),
        });
        const API = "http://localhost:3000";
        fetch(API + "/users/" + sessionStorage.getItem("activeUserID:"))
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    busUserId: json.id,
                    busRoute: json.busRoute,
                    busNo: json.busNo
                });
            }).catch(error => {
            console.log(error);
        });
    }

    generate = (e) => {
        e.preventDefault();
        this.setState({
            qrValue: JSON.stringify({
                busUserId: this.state.busUserId,
                busNo: this.state.busNo,
                busRoute: this.state.busRoute,
                terminal: this.state.terminal,
                destination: this.state.destination,
                amount: this.state.amount,
            })
        })
        toast.info("✔️ QR Code Generated Successfully  !", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setTimeout(
            function () {
                this.setState({isDialogOpen: true});
            }.bind(this),
            2000
        );

    }

    handleClose = () => {
        this.setState({
            isDialogOpen: false,
        })
    }

    render() {
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
                                    <h2 className="header-title">Generate QR for give Journeys Info</h2>
                                </div>
                                <br/>
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        this.generate(e);
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Bus User ID</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Bus User ID"
                                                    name="busUserId"
                                                    readOnly="true"
                                                    onChange={(event) => {
                                                        this.setState({busUserId: event.target.value});
                                                    }}
                                                    value={this.state.busUserId}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Bus No</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Bus No"
                                                    name="busNo"
                                                    readOnly="true"
                                                    onChange={(event) => {
                                                        this.setState({busNo: event.target.value});
                                                    }}
                                                    value={this.state.busNo}
                                                    required
                                                />
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
                                                    Generate QR Code
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
                        title="QR CODE"
                        modal={true}
                        onClose={this.handleClose}
                        buttons={
                            [{
                                text: "Close",
                                onClick: () => this.handleClose()
                            }]
                        }>
                        <h6>Scan using Passenger Mobile App</h6>
                        <br/>
                        <p>
                            <center>
                                <QRCode value={this.state.qrValue} size="150" logoWidth="100" logoHeight="100"/>
                            </center>

                        </p>


                    </Dialog>
                }
            </div>
        );
    }
}

export default GenerateQr;