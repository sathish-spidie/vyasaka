import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader"

export const userLoggedIn = (user) => ({
	type: USER_LOGGED_IN,
	user,
});

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT,
});


// ThunkAction
export const login = (credentials) => (dispatch) =>
	api.user.login(credentials).then((user) => {
		localStorage.bookWormJWT = user.token;
		setAuthorizationHeader(user.token)
		dispatch(userLoggedIn(user));
	});

export const logout = () => (dispatch) => {
	localStorage.removeItem("bookWormJWT");
	setAuthorizationHeader()
	dispatch(userLoggedOut());
};

export const confirm = (url) => (dispatch) =>
	api.user.confirm(url).then((user) => {
		localStorage.bookWormJWT = user.token;
		dispatch(userLoggedIn(user));
	});

export const forgotPasswordRequest = ({ email }) => () =>
	api.user.forgotPasswordRequest(email);

export const validateToken = (url) => (dispatch) =>
	api.user.validateToken(url).then((res) => {
		localStorage.validateJWT = res.data.user.validateToken;
	});

export const resetPassword = ({ password }, token) => () =>
	api.user
		.resetPassword(password, token)
		.then(() => localStorage.removeItem("validateJWT"));
