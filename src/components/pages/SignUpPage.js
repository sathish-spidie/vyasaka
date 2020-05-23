import MyForm from "../forms/MyForm";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUp } from "../../actions/signUp";

const style = {
  position : "relative",
  top: "20vh"
}

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  submit = (data) => {
    this.props
      .signUp(data)
      .then(() => this.props.history.push("/dashboard"))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  };
  render() {
    return (
      <div style={style}>
        <h1>Register Page</h1>
        <MyForm
          button="SignUp"
          errors={this.state.errors}
          submit={this.submit}
        />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, { signUp })(SignUpPage);
