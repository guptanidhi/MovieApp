import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.js';
import Auth from '../modules/Auth'

export default class LoginPage extends React.Component{

	/*
		Class Constructor
	*/
	constructor(props, context){
		super(props, context);

		const storedMessage = localStorage.getItem('successMessage');
		let successMessage = '';

		if(storedMessage){
			successMessage = storedMessage;
			localStorage.removeItem('successMessage');
		}

		// Set the initial state for Component
		this.state = {
			errors: {},
			successMessage,
			user:{
				email: '',
				password: ''
			}
		};

		this.submit = this.submit.bind(this);
		this.onchange = this.onchange.bind(this);
	}

	/*
		Login the user
		@param - event(Javasscript Event Object)
	*/
	submit(event){
		// Prevent Default Action, in this case action is the form submission event
		event.preventDefault();

		// Create a string for an HTTP body message
		const email = encodeURIComponent(this.state.user.email);
		const password = encodeURIComponent(this.state.user.password);
		const formData = `email=${email}&password=${password}`;

		// Create an AJAX request
		const xhr = new XMLHttpRequest();
		xhr.open('post', '/auth/login');
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.responseType = 'json';
		xhr.addEventListener('load', () => {
			if(xhr.status === 200){
				// success

				// Change the component state
				this.setState({
					errors: {}
				});

				// Save the token
				Auth.authenticateUser(xhr.response.token);
				
				// Change the current URL to
				this.context.router.replace("/");
			} else {
				// failure

				// Change the component state
				const errors = xhr.response.errors ? xhr.response.errors : {};
				errors.summary = xhr.response.message;

				this.setState({
					errors
				});
			}
		});
		xhr.send(formData);
	}

	/*
		On Change of user object
		@param - event(Javasscript Event Object)
	*/
	onchange(event){
		const field = event.target.name;
		const user = this.state.user;
		user[field] = event.target.value;

		this.setState({
			user
		});
	}

	/*
		Render Component
	*/
	render(){
		return(
			<LoginForm onSubmit={this.submit} onChange={this.onchange} errors={this.state.errors} successMessage={this.state.successMessage} user={this.state.user} />
		);
	}
}

LoginPage.contextTypes = {
	router: PropTypes.object.isRequired
};