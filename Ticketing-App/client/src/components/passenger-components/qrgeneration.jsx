import React, {Component} from "react";
import Redirect from "react-router-dom/es/Redirect";

class Qrgenerate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balanceDetails: {},
            journeyList: {},
            statFullDetails: {},
            ruleViolatedList: {},
            isLoaded: false,
            redirect: null,
        };
    }

    componentDidMount = () => {
        let id = sessionStorage.getItem("activeUserID:");
        const CREDIT_BALANCE_URL =
            "http://localhost:3000/passengerdashboard//balance/" + id;
        const JOURNEYS_URL =
            "http://localhost:3000/passengerdashboard/journeys/" + id;
        const STAT_FULL_DETAILS_URL =
            "http://localhost:3000/dashboards/fullDetails";
        const RULE_VIOLATED_URL =
            "http://localhost:3000/passengerdashboard/ruleviolated/" + id;


        Promise.all([
            fetch(CREDIT_BALANCE_URL),
            fetch(JOURNEYS_URL),
            fetch(RULE_VIOLATED_URL),
            fetch(STAT_FULL_DETAILS_URL),
        ]).then(([res1, res2, res3, res4]) => {
            res1
                .json()
                .then((json) => {
                    console.log("json1", json);

                    this.setState({
                        balanceDetails: json,
                    });
                })
                .catch(console.error());

            res2
                .json()
                .then((json) => {
                    console.log("json2", json);

                    this.setState({
                        journeyList: json,
                    });
                })
                .catch(console.error());

            res3
                .json()
                .then((json) => {
                    console.log("json3", json);

                    this.setState({
                        ruleViolatedList: json,
                    });
                })
                .catch(console.error());

            res4
                .json()
                .then((json) => {
                    console.log("json4", json);

                    this.setState({
                        statFullDetails: json,
                        isLoaded: true,
                    });
                })
                .catch(console.error());
        });

    };

    qrCodeAction(){
        this.setState({
            redirect: "./generateqr",
        })
    }

    qrCodeAction2(){
        this.setState({
            redirect: "./generateqr2",
        })
    }


    addFunds() {
        this.setState({
            redirect: "/addfunds",
        })
    }

    render() {
        let {
            isLoaded,
            balanceDetails,
            journeyList,
            statFullDetails,
            ruleViolatedList,
        } = this.state;
        if (this.state.redirect) {
            return (
                <div>
                    <Redirect to={this.state.redirect}/>
                </div>
            )
        }
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {/* Dashboard card area start */}
                    <div className="main-content-inner">
                        {/* sales report area start */}
                        <div className="sales-report-area mt-5 mb-5">
                            <div className="row">
                                
                                

<br></br>

                                <div className="col-md-4 " >
                                <div className="single-report mb-xs-30" style={{width:400,height:300,marginLeft:100,marginTop:100 ,backgroundColor:"white"}}>
                                <img src="assets/images/icon/ql.png" style={{height:220 ,width:400 ,border:"1px solid black"}} alt="logo" />
                                    <div className="s-report-inner pr--20 pt--30 mb-3" onClick={() => {
                                        this.qrCodeAction()
                                    }}>
                                        <div className="icon">
                                            <i className="ti-hand-point-up"/>
                                        </div>
                                        <div className="s-report-title d-flex justify-content-between">
                                            <h4 className="header-title mb-0">Short Term QR Service</h4>
                                        </div>
                                        {/* <div className="d-flex justify-content-between pb-2">
                                            <h3>via QR CODE</h3>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            

                            <div className="col-md-4">
                                <div className="single-report mb-xs-30"  style={{width:400,height:300,marginLeft:200,marginTop:100,backgroundColor:"white"}}>
                                <img src="assets/images/icon/q.png" style={{height:220 ,width:400 ,border:"1px solid black"}}alt="logo" />
                                    <div className="s-report-inner pr--20 pt--30 mb-3" onClick={() => {
                                        this.qrCodeAction2()
                                    }}>
                                        <div className="icon">
                                            <i className="ti-hand-point-up"/>
                                        </div>
                                        <div className="s-report-title d-flex justify-content-between">
                                            <h4 className="header-title mb-0">Long term QR Service</h4>
                                        </div>
                                        {/* <div className="d-flex justify-content-between pb-2">
                                            <h3>via QR CODE</h3>
                                        </div> */}
                                    </div>
                                </div>
                            </div>














                            </div>
                        </div>
                        {/* sales report area end */}
                        {/* overview area start */}
                    </div>
                </div>
            );
        }
    }


}

export default Qrgenerate;
