import React from "react";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/auth";

class ResetPasswordPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: {},
		};
	}

	submit = (data, token) => {
		this.props
			.resetPassword(data, localStorage.getItem("validateJWT"))
			.then(() => this.props.history.push("/login"))
			.catch((err) =>
				this.setState({ errors: err.response.data.errors })
			);
	};

	render() {
		return (
			<>
				<ResetPasswordForm
					errors={this.state.errors}
					submit={this.submit}
				/>
			</>
		);
	}
}

ResetPasswordPage.propTypes = {
	resetPassword: PropTypes.func.isRequired,
	params: PropTypes.shape({
		match: PropTypes.shape({
			token: PropTypes.string.isRequired,
		}),
	}),
};

export default connect(null, { resetPassword })(ResetPasswordPage);
