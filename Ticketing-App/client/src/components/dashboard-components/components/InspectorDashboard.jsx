import React, { Component } from "react";
import Chart from "react-apexcharts";

class InspectorDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inspectedBusList: {},
      statCharts: {},
      statFullDetails: {},
      isLoaded: false,
      chartOptions: {
        labels: ["Inspected", "Rule Violated"],
      },
      series: [],
    };
  }

  componentDidMount = () => {
    let id = sessionStorage.getItem("activeUserID:");
    const INSPECTED_BUS_URL = "http://localhost:3000/dashboards/"+id;
    const STAT_CHART_URL = "http://localhost:3000/dashboards/charts";
    const STAT_FULL_DETAILS_URL = "http://localhost:3000/dashboards/fullDetails";

    Promise.all([
      fetch(INSPECTED_BUS_URL),
      fetch(STAT_CHART_URL),
      fetch(STAT_FULL_DETAILS_URL),
    ]).then(([res1, res2, res3]) => {
      res1.json().then((json) => {
        console.log("json1", json);

        this.setState({
            inspectedBusList: json,
        });
      }).catch(console.error());

      let a = [];
      res2.json().then((json) => {
        console.log("json2", json);

        a.push(json.inspectedBusCount);
        a.push(json.ruleViolatedBusCount);

        this.setState({
          series: a,
        });
      }).catch(console.error());

      res3.json().then((json) => {
        console.log("json3", json);

        this.setState({
          statFullDetails: json,
          isLoaded:true
        });
      }).catch(console.error());
    });
  };

  render() {
    let { isLoaded, statFullDetails, inspectedBusList } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {/* Dashboard card area start */}
          <div className="main-content-inner">
            {/* overview area start */}
            <div className="row mt-5 mb-5">
              <div className="col-xl-8 col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <div className="d-sm-flex justify-content-between align-items-center">
                      <h4 className="header-title mb-0">Inspected Bus Details</h4>
                    </div>
                    <div className="market-status-table mt-4">
                      <div className="table-responsive">
                        <table className="dbkit-table">
                          <tbody>
                            <tr className="heading-td">
                              <td className="mv-icon">ID</td>
                              <td className="coin-name">Bus Route</td>
                              <td className="buy">Bus No</td>
                              <td className="sell">Remark</td>
                            </tr>
                            <div className="complain-row">
                              {inspectedBusList.map((inspectedBus) => (
                                <tr key={inspectedBus.id}>
                                  <td className="mv-icon">{inspectedBus.id}</td>
                                  <td className="coin-name">
                                    {inspectedBus.busRoute}
                                  </td>
                                  <td className="buy">
                                    {inspectedBus.busNo}
                                  </td>
                                  <td className="sell">
                                    {inspectedBus.remarks}
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

export default InspectorDashboard;
