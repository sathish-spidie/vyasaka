import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../images/vyasakalogo.png";
import { connect } from "react-redux";
import { logout } from "../../actions/auth.js";
import gravatarUrl from "gravatar-url";
import "./NavBar.css";
import styled from "styled-components";

// <Image
// 	style={{ width: "25px", position: "absolute", right: "15px" }}
// 	src={gravatarUrl(user.email, { default: "retro" })}
// />

const navbar = {
	display: "block",
	position: "fixed",
	background: "white",
	color: "black",
	width: "80vw",
};

const navMenu = {
	display: "flex",
	float: "right",
	justifyContent: "space-around",
	alignItems: "center",
	listStyle: "none",
};

	const Mybutton = styled.button`
        background: transparent;
        color: #1172c4;
        font-size: 14px;
        border-color: #1172c4;
        border-style: solid;
        border-width: 2px;
        border-radius: 22px;
        padding: 10px 40px;
        transition: all 0.2s linear;

    &:before {
    content: "";
		width: 40px;
		height: 40px;
		background:  ${props => props.avatar ? `url("${props.avatar}") no-repeat 50% 50%` : ""};
		display: inline-block;
		position: absolute;
		top:0;
		left: -50px;
		background-size: cover;
		border-radius: 50%;
  }
`;

const NavBar = ({ isAuthenticated, user, logout }) => {
	let avatar;
	if (isAuthenticated) {
		avatar = gravatarUrl(user.email, { default: "retro" });
	}
	return (
		<>
			<div style={navbar} className="navbar">
				<Link style={{ float: "left" }} className="logo" to="/">
					<img src={logo} alt="logo" />
				</Link>
				<ul style={navMenu} className="nav-menu">
					<li style={{ position: "relative" }}>
						{isAuthenticated ? (
							<>
								<Mybutton avatar={avatar} onClick={() => logout()}>Logout</Mybutton>
							</>
						) : (
							<Link to="/login">Login</Link>
						)}
					</li>
					<li>{!isAuthenticated && <Link to="/signup">Register</Link>}</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
				</ul>
			</div>
		</>
	);
};

NavBar.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.user.token,
	user: state.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
