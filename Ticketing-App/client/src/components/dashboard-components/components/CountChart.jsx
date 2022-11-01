import React, { Component } from "react";
import Chart from "react-apexcharts";
import ReactToPrint from 'react-to-print';
class CountChart extends Component {
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
  getRedirectButton = () => {
    // return <button type="button" onClick={() => { this.props.history.push("/admin/restaurants/CreateRestaurant") }} className="view1">Create Restaurant</button>
}
getRedirectButton1 = () => {
  // return <button type="button" onClick={() => { this.props.history.push("/admin/restaurants/CreateRestaurant") }} className="view1">Create Restaurant</button>
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








            <div ref={el => (this.componentRef = el)}>

            <div className="card-body"> <button type="button" onClick={() => { this.setState({ isGen: true }); }} className="generateRes">Generate Report </button>




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

            </div>



            { 

this.state.isGen ?     <div className="col-xl-4 col-lg-4 coin-distribution">
    <div className="col">
    
        {this.getRedirectButton1()}
        <ReactToPrint
            
            documentTitle={"All "}
            onAfterPrint={() => { this.setState({ isGen: false }); }}
            trigger={() => {
                return <button type="button" className="generatePdf">Generate PDF Now</button>




            }}
            content={() => this.componentRef}
        />
    </div>
</div> :             <div className="row text-end">
   
</div>
}


</div>




























</div>

        </div>
      );
    }
  }
}

export default CountChart;