import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { validateToken } from "../../actions/auth";
import { Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ValidateTokenPage = (props) => {
	const [loading, setState] = useState({ loading: true });
	useEffect(() => {
		props
			.validateToken(props.match.params.token)
			.then(() => {
				setState((state) => {
					state.loading = false;
				});
				props.history.push("/reset_password");
			})
			.catch((err) => {
				console.log(err);
				setState((state) => {
					state.loading = false;
				});
			});
	}, [props]);
	return (
		<>
			{loading ? (
				<Message success>Loading...</Message>
			) : (
				<>
					<Message error>Invalid Token</Message>
					<span style={{ margin: "10px" }}>
						<Link to="/login">Go to login.</Link>
					</span>
				</>
			)}
		</>
	);
};

export default connect(null, { validateToken })(ValidateTokenPage);
