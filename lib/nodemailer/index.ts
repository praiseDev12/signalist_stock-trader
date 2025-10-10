import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from './template';

export const transporter = nodemailer.createTransport({
	pool: true,
	service: 'gmail',
	port: 2525,
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD,
	},
	maxConnections: 1,
});

export const sendWelcomeEmail = async ({
	email,
	name,
	intro,
}: WelcomeEmailData) => {
	const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace(
		'{{intro}}',
		intro
	);

	const mailOptions = {
		from: 'Signalist signalist@gmail.com',
		to: email,
		subject: 'Welcome to Signalist your stock market toolkit is ready',
		text: 'Thank you for joining Signalist',
		html: htmlTemplate,
	};

	await transporter.sendMail(mailOptions);
};
