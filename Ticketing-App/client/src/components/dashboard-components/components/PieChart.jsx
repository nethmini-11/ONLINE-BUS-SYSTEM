import React, { Component } from "react";
import Chart from "react-apexcharts";
import ReactToPrint from 'react-to-print';
class PieChart extends Component {
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












            

            <div className="container2">
            
            <div className="row">

            
               
                <div ref={el2 => (this.componentRef = el2)}>
               
        
               


                <div className="col-xl-12 col-lg-14 coin-distribution">
                <div className="card h-full">
                  <div className="card-body"> <button type="button" onClick={() => { this.setState({ isGen: true }); }} className="generateRes">Genrate Report </button>


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






{ 

                    this.state.isGen ?     <div className="col-xl-4 col-lg-4 coin-distribution">
                        <div className="col">
                        
                            {this.getRedirectButton()}
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

export default PieChart;