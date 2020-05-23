import React, { useState, useEffect } from "react";
import { Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { confirm } from "../../actions/auth.js";
import PropTypes from "prop-types";

const ConfirmationPage = (props) => {
	const [state, setState] = useState({
		loading: true,
		success: false,
	});

	useEffect(() => {
		props
			.confirm(props.match.params.token)
			.then(() => setState({ loading: false, success: true }))
			.catch(() => setState({ loading: false, success: false }));
	}, [props]);

	const { loading, success } = state;
	return (
		<>
			{loading && (
				<Message icon>
					<Icon name="circle notched" loading />
					<Message.Header>Validating your email</Message.Header>
				</Message>
			)}

			{!loading && success && (
				<Message success icon>
					<Icon name="checkmark" />
					<Message.Content>
						<Message.Header>
							Thank you, you email has been verified.
						</Message.Header>
						<Link to="/dashboard">Go to your Dashboard</Link>
					</Message.Content>
				</Message>
			)}

			{!loading && !success && (
				<Message warning>
					<Message.Header>Oops,Invalid Token</Message.Header>
						<Link to="/">Go to Home</Link>
				</Message>
			)}
		</>
	);
};

ConfirmationPage.propTypes = {
	confirm: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired,
		}),
	}).isRequired,
};

export default connect(null, { confirm })(ConfirmationPage);

