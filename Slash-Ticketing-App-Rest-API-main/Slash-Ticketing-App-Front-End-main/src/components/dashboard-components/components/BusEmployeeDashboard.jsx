import React, {Component} from "react";
import Redirect from "react-router-dom/es/Redirect";

class InspectorDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statFullDetails: {},
            isLoaded: false,
            balanceDetails: {},
        };
    }

    componentDidMount = () => {
        let id = sessionStorage.getItem("activeUserID:");
        const STAT_FULL_DETAILS_URL =
            "http://localhost:3000/dashboards/fullDetails";
        const CREDIT_BALANCE_URL =
            "http://localhost:3000/passengerdashboard//balance/" + id;

        Promise.all([
            fetch(STAT_FULL_DETAILS_URL),
            fetch(CREDIT_BALANCE_URL),]).then(([res1, res2]) => {
            res1.json().then((json) => {
                console.log("json1", json);

                this.setState({
                    statFullDetails: json,
                    isLoaded: true,
                });
            }).catch(console.error());

            res2
                .json()
                .then((json) => {
                    console.log("json2", json);

                    this.setState({
                        balanceDetails: json,
                    });
                })
                .catch(console.error());
        });
    };

    withdrawAction() {
        this.setState({
            redirect: "/withdraw",
        })
    }
    addJurney(){
        this.setState({
            redirect: "/addjourney",
        })
    }

    qrCodeAction(){
        this.setState({
            redirect: "./generateqr",
        })
    }

    render() {
        let {isLoaded, statFullDetails, balanceDetails} = this.state;
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
                        <br/>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="single-report mb-xs-30">
                                    <div className="s-report-inner pr--20 pt--30 mb-3" onClick={() => {
                                        this.withdrawAction()
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

                            <div className="col-md-4">
                                <div className="single-report mb-xs-30">
                                    <div className="s-report-inner pr--20 pt--30 mb-3" onClick={() => {
                                        this.addJurney()
                                    }}>
                                        <div className="icon">
                                            <i className="ti-harddrives"/>
                                        </div>
                                        <div className="s-report-title d-flex justify-content-between">
                                            <h4 className="header-title mb-0">Record your Service</h4>
                                        </div>
                                        <div className="d-flex justify-content-between pb-2">
                                            <h3>Add Journey</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="single-report mb-xs-30">
                                    <div className="s-report-inner pr--20 pt--30 mb-3" onClick={() => {
                                        this.qrCodeAction()
                                    }}>
                                        <div className="icon">
                                            <i className="ti-harddrives"/>
                                        </div>
                                        <div className="s-report-title d-flex justify-content-between">
                                            <h4 className="header-title mb-0">Send your Service</h4>
                                        </div>
                                        <div className="d-flex justify-content-between pb-2">
                                            <h3>via QR CODE</h3>
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
                        {/* <div class="row">
              <div class="col-lg-12 mt-5">
                <div class="card">
                  <div class="card-body">
                    <h4 class="header-title">Google Map</h4>
                    <div>
                        
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
                    </div>
                </div>
            );
        }
    }
}

export default InspectorDashboard;
