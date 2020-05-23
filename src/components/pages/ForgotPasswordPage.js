import React from "react";
import { Message } from "semantic-ui-react";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forgotPasswordRequest } from "../../actions/auth";

class ForgotPasswordPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			success: false,
			errors: {},
		};
	}

	submit = (data) => {
		this.setState({ loading: true });
		this.props
			.forgotPasswordRequest(data)
			.then(() => this.setState({ loading: false, success: true }))
			.catch((err) =>
				this.setState({ loading: false, errors: err.response.data.errors })
			);
	};

	render() {
		return (
			<>
				{this.state.loading  ||  this.state.success ? (
					<Message loading={this.state.loading}>loading...</Message>
				) : (
					<ForgotPasswordForm errors={this.state.errors} submit={this.submit} />
				)}
			</>
		);
	}
}

ForgotPasswordPage.propTypes = {
	forgotPasswordRequest: PropTypes.func.isRequired,
};

export default connect(null, { forgotPasswordRequest })(ForgotPasswordPage);
