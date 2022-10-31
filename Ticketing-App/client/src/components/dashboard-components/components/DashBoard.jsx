import React, { Component } from "react";
import Chart from "react-apexcharts";

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statCounts: {},
      statCharts: {},
      statFullDetails: {},
      statComplains: {},
      isLoaded: false,
      chartOptions: {
        labels: ["Inspected", "Rule Violated"],
      },
      series: [],
    };
  }

  componentDidMount = () => {
    const STAT_COUNT_URL = "http://localhost:3000/dashboards/counts";
    const STAT_CHART_URL = "http://localhost:3000/dashboards/charts";
    const STAT_FULL_DETAILS_URL =
      "http://localhost:3000/dashboards/fullDetails";
    const STAT_COMPLAINS_URL = "http://localhost:3000/dashboards/complains";

    Promise.all([
      fetch(STAT_COUNT_URL),
      fetch(STAT_CHART_URL),
      fetch(STAT_FULL_DETAILS_URL),
      fetch(STAT_COMPLAINS_URL),
    ]).then(([res1, res2, res3, res4]) => {
      res1
        .json()
        .then((json) => {
          console.log("json1", json);

          this.setState({
            statCounts: json,
          });
        })
        .catch(console.error());

      let a = [];
      res2
        .json()
        .then((json) => {
          console.log("json2", json);

          a.push(json.inspectedBusCount);
          a.push(json.ruleViolatedBusCount);

          this.setState({
            series: a,
          });
        })
        .catch(console.error());

      res3
        .json()
        .then((json) => {
          console.log("json3", json);

          this.setState({
            statFullDetails: json,
          });
        })
        .catch(console.error());

      res4
        .json()
        .then((json) => {
          console.log("json4", json);

          this.setState({
            statComplains: json,
            isLoaded: true,
          });
        })
        .catch(console.error());
    });
  };

  render() {
    let { isLoaded, statCounts, statFullDetails, statComplains } = this.state;
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
                    <div className="s-report-inner pr--20 pt--30 mb-3">
                      <div className="icon">
                        <i className="fa fa-users" />
                      </div>
                      <div className="s-report-title d-flex justify-content-between">
                        <h4 className="header-title mb-0">
                          Registered Local Users
                        </h4>
                      </div>
                      <div className="d-flex justify-content-between pb-2">
                        <h1>{statCounts.localCount}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="single-report mb-xs-30">
                    <div className="s-report-inner pr--20 pt--30 mb-3">
                      <div className="icon">
                        <i className="fa fa-globe" />
                      </div>
                      <div className="s-report-title d-flex justify-content-between">
                        <h4 className="header-title mb-0">
                          Registered Foreign Users
                        </h4>
                      </div>
                      <div className="d-flex justify-content-between pb-2">
                        <h1>{statCounts.foriegnCount}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="single-report">
                    <div className="s-report-inner pr--20 pt--30 mb-3">
                      <div className="icon">
                        <i className="fa fa-bus" />
                      </div>
                      <div className="s-report-title d-flex justify-content-between">
                        <h4 className="header-title mb-0">Registered Bus</h4>
                      </div>
                      <div className="d-flex justify-content-between pb-2">
                        <h1>{statCounts.busCount}</h1>
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
                      <h4 className="header-title mb-0">Complains</h4>
                      <h5 className="custome-select border-0 pr-3">
                        No of Complains &nbsp;{statComplains.complainCount}
                      </h5>
                    </div>
                    <div className="market-status-table mt-4">
                      <div className="table-responsive">
                        <table className="dbkit-table">
                          <tbody>
                            <tr className="heading-td">
                              <td className="mv-icon">ID</td>
                              <td className="coin-name">User ID</td>
                              <td className="buy">User Name</td>
                              <td className="sell">Remark</td>
                            </tr>
                            <div className="complain-row">
                              {statComplains.result.map((statComplain) => (
                                <tr key={statComplain.id}>
                                  <td className="mv-icon">{statComplain.id}</td>
                                  <td className="coin-name">
                                    {statComplain.userId}
                                  </td>
                                  <td className="buy">
                                    {statComplain.reportUser}
                                  </td>
                                  <td className="sell">
                                    {statComplain.remarks}
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
              <div className="col-xl-4 col-lg-4 coin-distribution">
                <div className="card h-full">
                  <div className="card-body">
                    <h4 className="header-title mb-0">
                      Inspected Bus Vs Rule Violated Bus
                    </h4>
                    <div style={{ paddingTop: 50 }}>
                      <Chart
                        options={this.state.chartOptions}
                        series={this.state.series}
                        type="donut"
                        width="300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* overview area end */}
            {/* <div className="row mt-5 mb-5">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="header-title mb-0">
                        Rule Violated Passengers Vs Bus
                      </h4>
                    </div>
                    <div>
                      <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            width="500"
                          />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
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

export default DashBoard;
