import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class RegistrationForm extends React.Component{
	render(){
		return(
			<Card className="container">
				<form action="/" onSubmit={this.props.onSubmit}>
					<h2 className="card-heading">Register</h2>

					{this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

					<div className="field-line">
						<TextField floatingLabelText="Name" name="name" errorText={this.props.errors.name} onChange={this.props.onChange} value={this.props.user.name} />
					</div>

					<div className="field-line">
						<TextField floatingLabelText="Email" name="email" errorText={this.props.errors.email} onChange={this.props.onChange} value={this.props.user.email} />
					</div>

					<div className="field-line">
						<TextField floatingLabelText="Password" type="password" name="password" errorText={this.props.errors.password} onChange={this.props.onChange} value={this.props.user.password} />
					</div>

					<div className="button-line">
						<RaisedButton type="submit" label="Register" primary />
					</div>

					<CardText>Already have an account? <Link to={'/login'}>Login</Link></CardText>
				</form>
			</Card>
		);
	}
}

RegistrationForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};