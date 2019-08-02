import React, { Component } from "react";
import Loader from "../Loader/Loader";
import "./User.scss";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export class User extends Component {
  state = {
    users: [],
    dec: 0,
    loading: false,
    length: "",
    perPage: 5
  };

  componentDidMount = async () => {
    this.setState({
      loading: true
    });
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const val = this.state.length - (this.state.length - this.state.perPage); //495 - (495-5) =400
    const intial = res.data.splice(this.state.inital, val);

    this.setState({
      dec: this.state.length - (this.state.length - this.state.perPage), //495 - (495 -5) === 5
      users: intial,
      loading: false,
      length: res.data.length
    });
  };

  incrementHandler = async () => {
    const res1 = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const inc = res1.data.filter(cur => {
      if (this.state.dec.length > this.state.length) {
        console.log("error");
      } else {
        return (
          cur.id >= this.state.dec + 1 &&
          cur.id <= this.state.dec + this.state.perPage
        );
      }
    });

    this.setState({
      users: inc,
      dec: this.state.dec + 5
    });
  };

  previousHandler = async () => {
    const res1 = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    const decre = res1.data.filter(cur => {
      return cur.id >= this.state.dec - 4 && cur.id <= this.state.dec;

      //   return cur.id >= this.state.dec - 4 && cur.id <= this.state.dec;
    });

    console.log("decrement", decre);

    this.setState({
      users: decre,
      dec: this.state.dec - 5
    });
  };
  render() {
    const table = this.state.users.map(user => {
      return (
        <tr key={user.id}>
          <th scope="row">{user.id}</th>
          <td>{user.name.substr(0, 10)}</td>
          <td>{user.email}</td>
          <td>{user.body.substr(0, 100)}</td>
        </tr>
      );
    });

    return (
      <>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div className="m-3">
            <table className="table table-hover responsive w-100 mr-5">
              <thead className="thead-dark p-3 ">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>{table}</tbody>
            </table>
          </div>
        )}
        <div className="d-flex justify-content-between m-5">
          <span
            className="btn btn-outline-secondary"
            onClick={this.previousHandler}
          >
            <i className="fas fa-arrow-circle-left" /> Previous
          </span>

          <span
            className={`${
              this.state.dec < 0
                ? "btn btn-block btn-outline-secondary"
                : "btn btn-outline-secondary"
            }`}
            onClick={this.incrementHandler}
          >
            Next <i className="fas fa-arrow-circle-right" />
          </span>
        </div>
        <Loader />
      </>
    );
  }
}

export default User;
