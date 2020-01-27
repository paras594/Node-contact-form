const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
	auth: {
		api_key: process.env.API_KEY,
		domain: process.env.DOMAIN
	}
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, message) =>
	new Promise((resolve, reject) => {
		const mailOptions = {
			from: email,
			to: "parasarora594@gmail.com",
			subject: subject,
			text: message
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) reject(err);
			else {
				resolve(data);
			}
		});
	});

module.exports = sendMail;
