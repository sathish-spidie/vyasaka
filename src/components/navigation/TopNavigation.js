import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import gravatarUrl from "gravatar-url";
import { logout } from "../../actions/auth.js";
import { connect } from "react-redux";

const TopNavigation = ({ user, logout }) => {
	return (
		<>
			<Menu pointing secondary>
				<Menu.Item as={Link} to="/dashboard">
					<h2>Dashboard</h2>
				</Menu.Item>

				<Menu.Item position="right">
					<Dropdown
						trigger={
							<Image
								style={{ width: "25px", position: "absolute", right: "15px" }}
								src={gravatarUrl(user.email, { default: "retro" })}
							/>
						}
					>
						<Dropdown.Menu style={{ left: "-180%", top: "230%" }}>
							<Dropdown.Item onClick={() => logout()}>logout</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
			</Menu>
		</>
	);
};

TopNavigation.propTypes = {
	user: PropTypes.shape({
		email: PropTypes.string.isRequired,
	}).isRequired,
};

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

export default connect(mapStateToProps, { logout })(TopNavigation);
