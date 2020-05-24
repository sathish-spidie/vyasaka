import React from "react";
import styled from "styled-components";

export const MainWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	position: absolute;
	width: 80vw;
	top: 10vh;
`;
const Homepage = () => {
	return (
		<MainWrapper>
			<h1>Welcome to Vyasaka</h1>
		</MainWrapper>
	);
};

export default Homepage;
