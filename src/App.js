import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import SignUpPage from "./components/pages/SignUpPage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ValidateTokenPage from "./components/pages/ValidateTokenPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "./components/navigation/NavBar.js";

const App = ({ isAuthenticated }) => (
	<BrowserRouter>
		<div className="App">
		<div style={{width:"80vw",margin: "auto"}} className="mycontainer">
			<Navbar />
			<Switch>
				<Route path="/" exact component={Homepage} />
				<GuestRoute path="/signup" component={SignUpPage} />
				<GuestRoute path="/login" component={LoginPage} />
				<GuestRoute path="/forgot_password" component={ForgotPasswordPage} />
				<GuestRoute
					path="/api/auth/validate_token/:token"
					component={ValidateTokenPage}
				/>
				<GuestRoute path="/reset_password" component={ResetPasswordPage} />
				<UserRoute path="/dashboard" component={DashboardPage} />
				<Route
					path="/api/auth/confirmation/:token"
					component={ConfirmationPage}
				/>
			</Switch>
			</div>
		</div>
	</BrowserRouter>
);

App.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.user.email,
	};
}

export default connect(mapStateToProps, null)(App);
