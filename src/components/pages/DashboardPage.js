import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import styled from "styled-components";
import { MainWrapper } from "../pages/Homepage.js";

export const Wrapper = styled.div`
	position: absolute;
	display: block;
	width: 80vw;
	top: 20vh;
`;

const DashboardPage = ({ isConfirmed }) => {
	return (
		<MainWrapper>
			<h1>DashboardPage</h1>
			{!isConfirmed && <ConfirmEmailMessage />}
		</MainWrapper>
	);
};

DashboardPage.propTypes = {
	isConfirmed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
	return {
		isConfirmed: !!state.user.confirmed,
	};
}

export default connect(mapStateToProps)(DashboardPage);
