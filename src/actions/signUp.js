import {userLoggedIn} from "./auth"
import api from "../api";


// ThunkAction
export const signUp = (credentials) => (dispatch) =>
	api.user
		.register(credentials)
		.then((user) => {
			localStorage.bookWormJWT = user.token;
			dispatch(userLoggedIn(user));
		})
