import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";

class ResetPasswordForm extends React.Component {
	state = {
		data: {
			password: "",
			confirmPasswrod: "",
		},
		errors: {},
	};

	onChange = (e) =>
		this.setState({
			data: {
				...this.state.data,
				[e.target.name]: e.target.value,
			},
		});

	onSubmit = (e) => {
		e.preventDefault()
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.props.submit(this.state.data);
		}
	};

	validate = (data) => {
		const errors = {};
		if (!data.password) {
			errors.password = "Can't be blank";
		}
		if (data.password !== data.confirmPasswrod) {
			errors.confirmPasswrod = "Password must match";
		}
		return errors;
	};
	render() {
		const { data, errors } = this.state;
		const myerrors = this.props.errors;
		let errMessage = "";
		if (myerrors) {
			let errors = [];
			// eslint-disable-next-line
			for (let [key, value] of Object.entries(myerrors)) {
				errors.push(value);
			}
			if (errors.length > 1) {
				errMessage = `${errors[0]} ${errors[1]}`;
			} else {
				errMessage = errors[0];
			}
		}

		return (
			<div>
			<h1>Reset Password</h1>
				<Form onSubmit={this.onSubmit}>
					{errMessage && (
						<Message negative>
							<Message.Header>
								Something Went wrong
							</Message.Header>
							<p>{errMessage}</p>
						</Message>
					)}

					<Form.Field error={!!errors.password}>
						<label htmlFor="password">Password</label>
						<input
							value={data.password}
							type="password"
							id="password"
							placeholder="new password"
							name="password"
							onChange={this.onChange}
						/>
						{errors && errors.password && (
							<InlineError text={errors.password} />
						)}
					</Form.Field>
					<Form.Field error={!!errors.password}>
						<label htmlFor="password">Confirm password</label>
						<input
							value={data.confirmPasswrod}
							type="password"
							id="password"
							placeholder="confirm your password"
							name="confirmPasswrod"
							onChange={this.onChange}
						/>
						{errors && errors.confirmPasswrod && (
							<InlineError text={errors.confirmPasswrod} />
						)}
					</Form.Field>
					<Button primary>Reset password</Button>
				</Form>
			</div>
		);
	}
}

ResetPasswordForm.propTypes = {
	submit: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
