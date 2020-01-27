const Validator = require("validator");
const isEmpty = require("is-empty");

const validateContactInput = data => {
	let errors = {};

	// convert empty fields to an empty string so we can use validator functions
	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.subject = !isEmpty(data.subject) ? data.subject : "";
	data.message = !isEmpty(data.message) ? data.message : "";

	// name check
	if (Validator.isEmpty(data.name)) {
		errors.name = "Name field is required";
	}

	// email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	} else if (!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	// password checks
	if (Validator.isEmpty(data.subject)) {
		errors.subject = "Subject field is required";
	}

	if (Validator.isEmpty(data.message)) {
		errors.message = "Message field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateContactInput;

