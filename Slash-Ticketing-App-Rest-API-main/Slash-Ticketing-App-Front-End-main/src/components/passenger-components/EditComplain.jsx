import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";

class EditComplain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      reportedUser: null,
      remarks: null,
      redirect: null,
    };
  }

  componentDidMount() {
    let active_complain_id = sessionStorage.getItem("selectedComplainID:");
    const API = "http://localhost:3000";
    fetch(API + "/complaints/" + active_complain_id)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          
         reportedUser: json.reportedUser,
          remarks: json.remarks,
          
         
        });
      });
  }

  updateComplain = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(this.state));
    this.postData();
  };

  async postData() {
    try {
      let id = sessionStorage.getItem("selectedComplainID:");
      let result;
      let API = "http://localhost:3000";

      result = await fetch(API + "/complaints/" + id, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: this.state.userId,
          reportedUser: this.state.reportedUser,
          remarks: this.state.remarks,
          
        }),
      });

      console.log("Result: " + result);
      toast.info("✔️ Complain Updated Susseccfully !", {
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
          this.setState({ redirect: "/editcomplain" }); //After 3 second, set redirect to true
        }.bind(this),
        3000
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return (
      <div>
        <ToastContainer />
        <div className="row">
          <div className="col-lg-12 mt-5">
            <div className="card">
              <div className="card-body">
                <div>
                  <h2 className="header-title">Add Complains</h2>
                </div>
                <br />
                <form
                  autoComplete="off"
                  onSubmit={(e) => {
                    this.updateComplain(e);
                  }}
                >
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          User ID
                        </label>
                        <input
                          type="number"
                          className="form-control style-input"
                          placeholder="User ID"
                          name="userid"
                          onChange={(event) => {
                            this.setState({ userId: event.target.value });
                          }}
                          value={this.state.userId}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Report User 
                        </label>
                        <input
                          type="reportUser"
                          className="form-control style-input"
                          id="ReportUser"
                          name="reportUser"
                          placeholder="Enter Bus Number"
                          value={this.state.reportUser}
                          onChange={this.onChangeHandler}
                          
                          required
                        />
                        
                        <div className="text-danger" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Remarks</label>
                        <textarea
                          className="form-control style-input"
                          id="Remarks"
                          placeholder="State what bothered you"
                          rows="3"
                          name="remarks"
                          value={this.state.remarks}
                          onChange={this.onChangeHandler}
                          
                          required
                        />
                      </div>
                  

                 

                      <div className="fashion-buttons text-left">
                        <button type="submit" className="btn fashion-btn ">
                          Submit
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

export default EditComplain;
