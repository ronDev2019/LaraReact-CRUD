import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'

class Student extends Component {
  state = {
    students: [],
    loading: true,
  };

  async componentDidMount() {
    const res = await axios.get("http://127.0.0.1:8000/api/students");
    if (res.data.status === 200) {
      this.setState({
        students: res.data.students,
        loading: false,
      });
    }
  }

  deleteStudent = async (e, id) => {
    const afterDelete = e.currentTarget;
    afterDelete.innerText = "Deleting..."
    const res = await axios.delete(
      `http://127.0.0.1:8000/api/delete-student/${id}`
    );
    if (res.data.status === 200) {
      swal({
        title: "Success",
        text: res.data.message,
        icon: "success",
        button: "Close",
      });
      afterDelete.closest("tr").remove()
    }
  };

  render() {
    let student_html_table = "";

    if (this.state.loading) {
      student_html_table = (
        <tr>
          <td colSpan={6}>
            <h2>Loading...</h2>
          </td>
        </tr>
      );
    } else {
      student_html_table = this.state.students.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.course}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td className="text-center">
              <Link
                to={`edit-student/${item.id}`}
                className="btn btn-success btn-sm"
              >
                Edit
              </Link>
            </td>
            <td className="text-center">
              <button
                type="button"
                onClick={(e) => this.deleteStudent(e, item.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Students Data
                  <Link
                    to={"add-student"}
                    className="btn btn-primary btn-small float-end"
                  >
                    Add Student
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <td>Id</td>
                      <td>Name</td>
                      <td>Course</td>
                      <td>Email</td>
                      <td>Phone</td>
                      <td colSpan={2} className="text-center">
                        Action
                      </td>
                    </tr>
                  </thead>
                  <tbody>{student_html_table}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
