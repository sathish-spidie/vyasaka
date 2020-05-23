import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

const mapStateToProps = (state) => ({ isAuthenticated: !!state.user.token });

UserRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(UserRoute);
