import React, {Component} from 'react';
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from "react-router-dom";

class Withdraw extends Component {
    state = {
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
        amount: "",
        accBalance: 0,
    };

    handleInputFocus = (e) => {
        this.setState({focus: e.target.name});
    };
    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    submitAction(e) {
        e.preventDefault(e);
        if (this.state.number == "" || this.state.name == "" || this.state.cvc == "" || this.state.expiry == "" || this.state.amount == "") {
            toast.error("🚫 Fill all mandatory fields to proceed the payment ", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (parseInt(this.state.accBalance, 10) < parseInt(this.state.amount, 10)) {
            toast.error("🚫 Insufficient funds", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            this.postData();
        }
    }

    async postData() {
        try {
            const API = "http://localhost:3000";
            let userID = sessionStorage.getItem("activeUserID:");
            let result = await fetch(API + "/funds/withdraw/" + userID, {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(this.state),
            });
            console.log("Result: " + result);
            toast.info("✔️ Funds Added to your bank Account successfully !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(function () { //Start the timer
                this.setState({redirect: "/"}) //After 3 second, set redirect to true
            }.bind(this), 3000)

        } catch (error) {
            console.log(error.message);
        }
    }

    componentDidMount() {
        let active_user_id = sessionStorage.getItem("activeUserID:");
        const API = "http://localhost:3000";
        fetch(API + "/users/" + active_user_id)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    accBalance: json.accountBalance,
                });
                console.log(json.accountBalance);

            });
    }

    render() {
        let {
            accBalance,
        } = this.state;
        if (this.state.redirect) {
            return (
                <div>
                    <Redirect to={this.state.redirect}/>
                </div>
            )
        }
        return (
            <div id="PaymentForm">
                <ToastContainer/>
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h4 className="header-title">Withdraw Balance</h4>
                                    <p>
                                        Use our Secured Payment method to Withdraw your earnings... <br/>
                                    </p>
                                    <br/>
                                    <br/>
                                </div>

                                <form autoComplete="off" onSubmit={(e) => this.submitAction(e)}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group PaymentForm">
                                                <Cards
                                                    cvc={this.state.cvc}
                                                    expiry={this.state.expiry}
                                                    focused={this.state.focus}
                                                    name={this.state.name}
                                                    number={this.state.number}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <input
                                                    className="form-control style-input"
                                                    type="text"
                                                    name="number"
                                                    placeholder="Card Number"
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    className="form-control style-input"
                                                    type="text"
                                                    name="name"
                                                    placeholder="Card Holder Name"
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    className="form-control style-input"
                                                    type="text"
                                                    name="expiry"
                                                    placeholder="MM/YY"
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    className="form-control style-input"
                                                    type="text"
                                                    name="cvc"
                                                    placeholder="CVV"
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Available Account Balance: {accBalance} &nbsp;LKR</label>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    className="form-control style-input"
                                                    type="text"
                                                    name="amount"
                                                    placeholder="Withdraw Amount (LKR)"
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                />
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

export default Withdraw;