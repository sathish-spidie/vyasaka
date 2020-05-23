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

const NavBar = ({ isAuthenticated, user }) => {
	let avatar;
	if (isAuthenticated) {
		avatar = gravatarUrl(user.email, { default: "retro" });
	}
	const Mybutton = styled.button`
    &:before {
    content: "";
		width: 25px;
		background: url("${avatar}") no-repeat 50% 50%;
		display: inline-block;
		position: absolute;
		top:0;
		left: -35px;
		height: 25px;
		background-size: cover;
		border-radius: 50%;

  }
`;
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
								<button onClick={logout}>Logout</button>
							</>
						) : (
							<Link to="/login">Login</Link>
						)}
					</li>
					<li>
						{!isAuthenticated && <Link to="/signup">Register</Link>}
					</li>
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
