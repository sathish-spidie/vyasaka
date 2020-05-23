import React from "react";
import styled from "styled-components"

const Wrapper=styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	position: absolute;
	width: 80vw;
	top: 10vh;
`
const Homepage = () => {
  return (
    <Wrapper>
      <h1>Welcome to Vyasaka</h1>
    </Wrapper>
  );
};

export default Homepage