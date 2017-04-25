export default class Auth{
	/*
		Authenticate a user.
		Save a token String in Local Storage
		@param {string} token
	*/

	static authenticateUser(token){
		localStorage.setItem('token', token);
	}

	/* 
		Check if a user is authenticated -  Token is saved or not in Local Storage
	*/
	static isUserAuthenticated(){
		return localStorage.getItem('token') !== null;
	}

	/* 
		Deauthenticate a user - Remove a token from Local Storage
	*/
	static deauthenticateUser(){
		localStorage.removeItem('token');
	}

	/* 
		Get a token value

		@returns {string}
	*/
	static getToken(){
		return localStorage.getItem('token');
	}

}