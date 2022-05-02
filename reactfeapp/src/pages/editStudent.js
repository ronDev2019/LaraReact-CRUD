import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function withParams(Components) {
  return (props) => <Components {...props} params={useParams()} />;
}

class editStudent extends Component {
  state = {
    name: "",
    course: "",
    email: "",
    phone: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  async componentDidMount() {
    const studId = this.props.params.id;
    //console.log(studId);
    const res = await axios.get(
      `http://127.0.0.1:8000/api/edit-student/${studId}`
    );
    if (res.data.status === 200) {
      this.setState({
        name: res.data.student.name,
        course: res.data.student.course,
        email: res.data.student.email,
        phone: res.data.student.phone,
      });
    }
  }

  updateStudent = async (e) => {
    e.preventDefault();

    document.getElementById("update-button").disabled = true;
    document.getElementById("update-button").innerText = "Updating...";

    const studId = this.props.params.id;
    const res = await axios.put(
      `http://127.0.0.1:8000/api/update-student/${studId}`,
      this.state
    );
    if (res.data.status === 200) {
      swal({
        title: "Success",
        text: res.data.message,
        icon: "success",
        button: "Close",
      });
      document.getElementById("update-button").innerText = "Update Student";
      document.getElementById("update-button").disabled = false;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>
                  Edit Student
                  <Link
                    to={"/"}
                    className="btn btn-primary btn-small float-end"
                  >
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.updateStudent}>
                  <div className="form-group mb-3">
                    <label>Student Name</label>
                    <input
                      type={"text"}
                      name={"name"}
                      onChange={this.handleInput}
                      value={this.state.name}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Student Course</label>
                    <input
                      type={"text"}
                      name={"course"}
                      onChange={this.handleInput}
                      value={this.state.course}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Student Email</label>
                    <input
                      type={"text"}
                      name={"email"}
                      onChange={this.handleInput}
                      value={this.state.email}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Student Phone</label>
                    <input
                      type={"text"}
                      name={"phone"}
                      onChange={this.handleInput}
                      value={this.state.phone}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <button
                      type="submit"
                      id="update-button"
                      className="btn btn-primary"
                    >
                      Update Student
                    </button>
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

export default withParams(editStudent);
