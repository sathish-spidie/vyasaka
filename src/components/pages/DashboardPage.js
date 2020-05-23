import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import styled from "styled-components";

const Wrapper = styled.div`
	position: absolute;
	display: block;
	width: 80vw;
	top: 20vh;
`;

const DashboardPage = ({ isConfirmed }) => {
	return (
		<Wrapper>
			<h1>DashboardPage</h1>
			{!isConfirmed && <ConfirmEmailMessage />}
		</Wrapper>
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
