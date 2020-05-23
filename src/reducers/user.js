import {
	USER_LOGGED_IN,
	USER_LOGGED_OUT,
	USER_REGISTER,
} from "../types";
const initialState = {};

export default (state = initialState, { type, user }) => {
	switch (type) {
		case USER_LOGGED_IN:
			return user;
		case USER_LOGGED_OUT:
			return {};
		case USER_REGISTER:
			return user;
		default:
			return state;
	}
};
