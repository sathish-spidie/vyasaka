import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	return (
		<Route
		{...rest}
			render={(props) =>
				!isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

const mapStateToProps = (state) => ({ isAuthenticated: !!state.user.token });

GuestRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(GuestRoute);
