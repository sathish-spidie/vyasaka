import MyForm from "../forms/MyForm";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import {Link} from "react-router-dom"

const style = {
  position : "relative",
  top: "20vh"
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  submit = (data) => {
    this.props
      .login(data)
      .then(() => this.props.history.push("/dashboard"))
      .catch((err) => 
        this.setState({ errors: err.response.data.errors })
        );
  };
  render() {
    return (
      <div style={style}>
        <h1>Login Page</h1>
        <MyForm button="Login" errors={this.state.errors} submit={this.submit} />
          <div style={{"marginTop" :  "15px"}}>
        <Link to="/forgot_password">Forgot Password?</Link>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


export default connect(null,{login})(LoginPage);
