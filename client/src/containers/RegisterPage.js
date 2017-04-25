import React, { PropTypes } from 'react';
import RegistrationForm from '../components/RegistrationForm.js';

export default class RegisterPage extends React.Component {
	/*
		Class Constructor
	*/
	constructor(props, context){
		super(props, context);
		// Initial State
		this.state = {
			errors: {},
			user:{
				email: '',
				name: '',
				password:''
			}
		};	
		this.register =  this.register.bind(this);
		this.onchange =  this.onchange.bind(this);	
	}
	/*
		Register the user
		@param - event(Javasscript Event Object)
	*/

	register(event){
		// Prevent Default Action, in this case action is the form submission event
		event.preventDefault();

		// Create a string for an HTTP Body Message
		const name = encodeURIComponent(this.state.user.name);
		const email = encodeURIComponent(this.state.user.email);
		const password = encodeURIComponent(this.state.user.password);
		const formData = `name=${name}&email=${email}&password=${password}`;

		console.log(formData);

		// Create an Ajax request
		const xhr = new XMLHttpRequest();
		xhr.open('post', '/auth/register');
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.responseType = 'json';
		xhr.addEventListener('load', () => {
			if(xhr.status === 200){
				// success

				// Change the component Container state
				this.setState({
					errors: {}
				});

				// Set a Message
				localStorage.setItem('successMessage', xhr.response.message);

				// Redirect to Login page
				this.context.router.replace("/login");
			}else{
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
		Render the Component
	*/
	render(){
		return(
			<RegistrationForm onSubmit={this.register} onChange={this.onchange} errors={this.state.errors} user={this.state.user} />
		)
	}
}

RegisterPage.contextTypes = {
	router: PropTypes.object.isRequired
};