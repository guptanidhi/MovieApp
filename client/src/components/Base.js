import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

const Base = ({ children }) => (
	<div>
		<div className="top-bar">
			{Auth.isUserAuthenticated() ? ( 
				<div className="top-bar-right">
					<Link to="/">Dashboard</Link>
					<Link to="/favourite">Favourite</Link>
					<Link to="/logout">Logout</Link>
				</div>
			) : (
				<div className="top-bar-right">
					<IndexLink to="/">Home</IndexLink>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</div>
			)}
			
		</div>
		{ /* child component */ }
		{children}

	</div>
);

Base.propTypes = {
	children: PropTypes.object.isRequired
};

export default Base;