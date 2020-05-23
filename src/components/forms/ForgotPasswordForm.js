import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends React.Component {
	state = {
		data: {
			email: "",
		},
		loading: false,
		errors: {},
	};

	onChange = (e) =>
		this.setState({
			data: {
				...this.state.data,
				[e.target.name]: e.target.value,
			},
		});

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.props.submit(this.state.data);
		}
	};

	validate = (data) => {
		const errors = {};
		if (!Validator.isEmail(data.email)) {
			errors.email = "Invalid email";
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
				<Form onSubmit={this.onSubmit}>
					{errMessage && (
						<Message negative>
							<Message.Header>Something Went wrong</Message.Header>
							<p>{errMessage}</p>
						</Message>
					)}

					<Form.Field error={!!errors.email}>
						<label htmlFor="email">Registered Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="example@example.com"
							value={data.email}
							onChange={this.onChange}
						/>
						{errors && errors.email && <InlineError text={errors.email} />}
					</Form.Field>
					<Button primary>Send Email</Button>
				</Form>
			</div>
		);
	}
}

ForgotPasswordForm.propTypes = {
	submit: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
