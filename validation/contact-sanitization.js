const Validator = require("validator");

const sanitizeContactInput = rawData => {
	let { name, email, subject, message } = rawData;

	name = Validator.trim(name);
	email = Validator.trim(email);
	email = Validator.normalizeEmail(email);
	subject = Validator.trim(subject);
	message = Validator.trim(message);

	return { name, email, subject, message };
};

module.exports = sanitizeContactInput;
