const express = require("express");
const router = express.Router();
const sendMail = require("../libs/email");
const sanitizeContactInput = require("../validation/contact-sanitization");
const validateContactInput = require("../validation/contact-validation");
const { OK, badRequest, serverError } = require("../utils/httpStatus");

router.post("/", (req, res) => {
	let rawData = {
		subject: req.body.subject,
		email: req.body.email,
		name: req.body.name,
		message: req.body.message
	};

	const sanitizedData = sanitizeContactInput(rawData);

	const { errors, isValid } = validateContactInput(sanitizedData);

	if (!isValid) {
		return res.render("index", { errors, data: sanitizedData, csrfToken: req.csrfToken() });
	} else {
		sendMail(sanitizedData.email, sanitizedData.subject, sanitizedData.message)
			.then(data => {
				console.log(data);
				req.flash("success", "Thanks for the message! I'll be in touch.");
				res.render("index", { errors: {}, data: {}, csrfToken: req.csrfToken() });
			})
			.catch(err => {
				res.status(serverError).json({ message: "Internal Error" });
			});
	}
});

router.get("/success", (req, res) => {
	res.render("success-page");
});

module.exports = router;
