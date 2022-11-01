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
          <div className="main-content-inner"><br></br>
            <div className="row">
              <div className="col-xl-4 col-lg-4 coin-distribution">
                <div className="card h-full"style={{ width:700 ,marginLeft:150 ,marginTop:20 }}>
                  <div className="card-body">
                    <h4 className="header-title mb-0">
                      Inspected Bus Vs Rule Violated Bus
                    </h4>
                    <div style={{ paddingTop: 50 }}>
                      <Chart
                        options={this.state.chartOptions}
                        series={this.state.series}
                        type="bar"
                        width="600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default DashBoard;