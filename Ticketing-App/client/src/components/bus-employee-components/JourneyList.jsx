import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactToPrint from 'react-to-print';
class JourneyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journeyList: [],
      isLoaded: false,
      redirect: null,
    };
  }
  getRedirectButton = () => {
    // return <button type="button" onClick={() => { this.props.history.push("/admin/restaurants/CreateRestaurant") }} className="view1">Create Restaurant</button>
}
  componentDidMount() {
    const busUserId = sessionStorage.getItem("activeUserID:");
    const API = "http://localhost:3000";
    fetch(API + "/journeysfind/" + busUserId)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          journeyList: json,
        });
      });
  }

  editAction(journey) {
    window.sessionStorage.setItem("selectedJourneyID:", journey.id);
  }

  deleteAction(journey) {
    const API = "http://localhost:3000";
    const API_URL = API + "/journeys/" + journey.id;

    try {
      let result = fetch(API_URL, { method: "delete" });
      toast.info("✔️ Journey Deleted Succesfully !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(
        function () {
          //Start the timer
          this.componentDidMount(); //After 1 second
        }.bind(this),
        1000
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let { isLoaded, journeyList } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <h4 className="header-title">Passenger Activities</h4>
          Loading...
        </div>
      );
    } else {
      return (
        <div>
            <div ref={el => (this.componentRef = el)}></div>
          <ToastContainer />
          <div className="row">
            <div className="col-lg-12 mt-5">
              <div className="card">
                <div className="card-body">




                <div ref={el => (this.componentRef = el)}>
               
        
                <button type="button" onClick={() => { this.setState({ isGen: true }); }} className="generateRes">Genrate Report </button>









                  <h4 className="header-title">Passenger Activities</h4>
                  <div className="single-table">
                    <div className="table-responsive">
                      <table className="table table-hover text-center">
                        <thead className="text-uppercase">
                          <tr className="text-dark">
                            <th scope="col">Index</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Bus Route</th>
                            <th scope="col">Terminal</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Amount (LKR)</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {journeyList.map((journey) => (
                            <tr key={journey.id}>
                              <th scope="row">
                                {journeyList.indexOf(journey) + 1}
                              </th>
                              <td>{journey.userId}</td>
                              <td>{journey.busRoute}</td>
                              <td>{journey.terminal}</td>
                              <td>{journey.destination}</td>
                              <td>{journey.amount}</td>
                              <td>
                                <button
                                  style={{
                                    padding: 0,
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={() => this.editAction(journey)}
                                >
                                  <a href="/editjourney">
                                    <i className="ti-pencil" />
                                  </a>
                                </button>
                              </td>
                              <td>
                                <button
                                  style={{
                                    padding: 0,
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={() => this.deleteAction(journey)}
                                >
                                  <i className="ti-trash" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>


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
      );
    }
  }
}

export default JourneyList;
