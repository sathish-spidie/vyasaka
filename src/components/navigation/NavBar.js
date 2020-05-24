import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../images/vyasakalogo.png";
import { connect } from "react-redux";
import { logout } from "../../actions/auth.js";
import gravatarUrl from "gravatar-url";
import styled from "styled-components";

const MyNavBar = styled.div`
	display: block;
	position: fixed;
	background: white;
	color: black;
	width: 80vw;
`;

const NavMenu = styled.ul`
	display: flex;
	float: right;
	justify-content: space-around;
	align-items: center;
	list-style: none;

	li{
		margin : 0 1em;
	}
`;

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
		background: ${(props) =>
			props.avatar ? `url("${props.avatar}") no-repeat 50% 50%` : ""};
		display: inline-block;
		position: absolute;
		top: 0;
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
			<MyNavBar>
				<Link style={{ float: "left" }} className="logo" to="/">
					<img src={logo} alt="logo" />
				</Link>
				<NavMenu>
					<li style={{ position: "relative" }}>
						{isAuthenticated ? (
							<>
								<Mybutton avatar={avatar} onClick={() => logout()}>
									Logout
								</Mybutton>
							</>
						) : (
							<Link to="/login">Login</Link>
						)}
					</li>
					<li>{!isAuthenticated && <Link to="/signup">Register</Link>}</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
				</NavMenu>
			</MyNavBar>
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
