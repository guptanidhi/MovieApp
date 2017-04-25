const express = require('express');
const validator = require('validator');
const passport = require('passport');


const router = new express.Router();

/*
	Validate the Register form

	@param {object} payload - HTTP body message
	@returns {object} Validation result. Object contains a boolean validation result, 
	error tips & global message	for the whole form.
*/
function validateRegisterForm(payload){
	const errors = {};
	let isFormValid = true;
	let message = '';
	if(!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)){
		isFormValid = false;
		errors.email = "Please provide a correct email address."
	}

	if(!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8){
		isFormValid = false;
		errors.password = 'Password must have atleast 8 characters.'
	}

	if(!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0){
		isFormValid = false;
		errors.name = 'Please provide your name.'
	}

	if(!isFormValid){
		message = 'Check the form for errors.';
	}
	
	return{
		success: isFormValid,
		message,
		errors
	};
}

/*
	Validate the Login Form

	@param {object} payload - the HTTP body message
	@returns {object} Validation result. Object contains a boolean validation result, 
	error tips & global message for the whole form.
*/
function validateLoginForm(payload){
	const errors = {};
	let isFormValid = true;
	let message = "";

	if(!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0){
		isFormValid = false;
		errors.email = 'Please provide valid email address.';
	}
	if(!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0){
		isFormValid = false;
		errors.password = "Please provide password."
	}

	if(!isFormValid){
		message = 'Check the form for errors.'
	}

	return {
		success: isFormValid,
		message,
		errors
	}
}

// Routing to Register API
router.post('/register', (req, res, next) => {
	const validationResult = validateRegisterForm(req.body);

	if(!validationResult.success){
		return res.status(400).json({
			success: false,
			message: validationResult.message,
			errors: validationResult.errors
		});
	}
	
	return passport.authenticate('local-registration', (err) => {
		if(err){
			if(err.name === "MongoError" && err.code === 11000){
				// 11000 Mongo Code is for a duplication email error
				// 409 HTTP status code is for conflict error
				return res.status(409).json({
					success: false,
					message: 'Check the form for errors.',
					errors:{
						email: ' This email is already taken.'
					}
				});
			}
			return res.status(400).json({
				success: false,
				message: 'Could not process the form.'
			});
		}
		return res.status(200).json({
			success: true,
			message: 'You have successfully Registered, Now you should be able to Login.'
		});
	})(req, res, next);
});

// Routing to Login API
router.post('/login', (req, res, next) => {
	const validationResult = validateLoginForm(req.body);
	
	if(!validationResult.success){
		return res.status(400).json({
			success: false,
			message: validationResult.message,
			errors: validationResult.errors
		});
	}

	return passport.authenticate('local-login', (err, token, userData) => {
		if(err){
			if(err.name === "IncorrectCredentialsError"){
				return res.status(400).json({
					success: false,
					message: err.message
				});
			}

			return res.status(400).json({
				success: false,
				message: 'Could not process the form. Please try again.'
			});
		}

		return res.json({
			success: true,
			message: 'You have successfully logged in!',
			token,
			user: userData
		});
	})(req, res, next);
})

module.exports = router;