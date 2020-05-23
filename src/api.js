import axios from "axios";

export default {
	user: {
		login: (credentials) =>
			axios
				.post("api/auth", { credentials })
				.then((res) => res.data.user),
		register: (credentials) =>
			axios
				.post("api/users", { credentials })
				.then((res) => res.data.user),
		confirm: (url) => axios.post(`${url}`).then((res) => res.data.user),
		forgotPasswordRequest: (email) =>
			axios.post("api/auth/forgot_password_request", { email }),
		validateToken: (url) => axios.post(`${url}`),
		resetPassword: (password, token) =>
			axios.post("api/auth/reset_password", { password, token }),
	},
};
