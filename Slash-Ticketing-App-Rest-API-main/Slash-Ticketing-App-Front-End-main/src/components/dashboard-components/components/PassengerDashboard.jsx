import React, {Component} from "react";
import Redirect from "react-router-dom/es/Redirect";

class PassengerDashboard extends Component {
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
                                <div className="col-md-4">
                                    <div className="single-report mb-xs-30">
                                        <div className="s-report-inner pr--20 pt--30 mb-3" onClick={() => {
                                            this.addFunds()
                                        }}>
                                            <div className="icon">
                                                <i className="ti-money"/>
                                            </div>
                                            <div className="s-report-title d-flex justify-content-between">
                                                <h4 className="header-title mb-0">Account Balance</h4>
                                            </div>
                                            <div className="d-flex justify-content-between pb-2">
                                                <h1>LKR&nbsp;{balanceDetails.accountBalance}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="single-report mb-xs-30">
                                        <div className="s-report-inner pr--20 pt--30 mb-3">
                                            <div className="icon">
                                                <i className="ti-map-alt"/>
                                            </div>
                                            <div className="s-report-title d-flex justify-content-between">
                                                <h4 className="header-title mb-0">
                                                    Last Visited Place
                                                </h4>
                                            </div>
                                            <div className="d-flex justify-content-between pb-2">
                                                {/* <h1>{statCounts.foriegnCount}</h1> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* sales report area end */}
                        {/* overview area start */}
                        <div className="row">
                            <div className="col-xl-8 col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-sm-flex justify-content-between align-items-center">
                                            <h4 className="header-title mb-0">Journey Details</h4>
                                        </div>
                                        <div className="market-status-table mt-4">
                                            <div className="table-responsive">
                                                <table className="dbkit-table">
                                                    <tbody>
                                                    <tr className="heading-td">
                                                        <td className="coin-name">Bus Route</td>
                                                        <td className="buy">Terminal</td>
                                                        <td className="sell">Destination</td>
                                                        <td className="sell">Amount</td>
                                                    </tr>
                                                    <div className="complain-row">
                                                        {journeyList.map((journey) => (
                                                            <tr key={journey.id}>
                                                                <td className="coin-name">
                                                                    {journey.busRoute}
                                                                </td>
                                                                <td className="buy">{journey.terminal}</td>
                                                                <td className="sell">
                                                                    {journey.destination}
                                                                </td>
                                                                <td className="sell">{journey.amount}</td>
                                                            </tr>
                                                        ))}
                                                    </div>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 coin-distribution">
                                <div className="card h-full">
                                    <div className="card-body">
                                        <h4 className="header-title mb-0">Rule Violated</h4>
                                        <div className="complain-row">
                                            <div class="timeline-area ">
                                                <div class="timeline-task ">
                                                    <div class="icon bg1">
                                                        <i class="fa fa-warning"></i>
                                                    </div>
                                                    <div class="tm-title">
                                                        <h4>Warning</h4>
                                                        <span class="time">
                              <i class="ti-time"></i>
                                                            {ruleViolatedList.createdAt}
                            </span>
                                                    </div>
                                                    <p>{ruleViolatedList.remarks}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* market value area start */}
                        <div className="row mt-5 mb-5">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-sm-flex justify-content-between align-items-center">
                                            <h4 className="header-title mb-0">Bus Time Table</h4>
                                        </div>
                                        <div className="market-status-table mt-4">
                                            <div className="table-responsive">
                                                <table className="dbkit-table">
                                                    <tbody>
                                                    <tr className="heading-td">
                                                        <td className="mv-icon">ID</td>
                                                        <td className="coin-name">Bus Route</td>
                                                        <td className="buy">Bus No</td>
                                                        <td className="sell">Terminal</td>
                                                        <td className="trends">Destination</td>
                                                        <td className="attachments">Departure Time</td>
                                                        <td className="stats-chart">Arrival Time</td>
                                                    </tr>
                                                    <div className="bus-timetable">
                                                        {statFullDetails.map((statFullDetail) => (
                                                            <tr key={statFullDetail.id}>
                                                                <td className="mv-icon">
                                                                    {statFullDetail.id}
                                                                </td>
                                                                <td className="coin-name">
                                                                    {statFullDetail.busRoute}
                                                                </td>
                                                                <td className="buy">
                                                                    {statFullDetail.busNo}
                                                                </td>
                                                                <td className="sell">
                                                                    {statFullDetail.terminal}
                                                                </td>
                                                                <td className="trends">
                                                                    {statFullDetail.destination}
                                                                </td>
                                                                <td className="attachments">
                                                                    {statFullDetail.departureTime}
                                                                </td>
                                                                <td className="stats-chart">
                                                                    {statFullDetail.arrivalTime}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </div>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* market value area end */}
                    </div>
                </div>
            );
        }
    }


}

export default PassengerDashboard;
