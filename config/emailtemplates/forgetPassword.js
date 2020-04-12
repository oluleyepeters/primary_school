const keys = require('../../config/keys')

module.exports=mail =>{
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>Password Reset</h3>
					<p>${mail.body}</p>
					<div>
						<a href="${keys.domain}/users/forgotpassword/${mail.token}/resetPassword">Reset Your Password </a>
					</div>
				</div>
			</body>
		</html>
	`;
};