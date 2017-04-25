import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.js';

export default class DashboardPage extends React.Component {
	/*
		Class Constructor
	*/
	constructor(props){
		super(props);
		// Set State
		this.state = {
			secretData: ''
		}
	}

	/*
		This method will be executed after initial Rendering
	*/
	componentDidMount(){
		const xhr = new XMLHttpRequest();
		xhr.open('get', '/api/dashboard');
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		// Set the authorization HTTP Header
		xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
		xhr.responseType = 'json';
		xhr.addEventListener('load', () => {
			if(xhr.status === 200){
				this.setState({
					secretData: xhr.response.message
				});
			}
		});
		xhr.send();
	}

	// Render the Component
	render(){
		return <Dashboard secretData={this.state.secretData} />
	}
}