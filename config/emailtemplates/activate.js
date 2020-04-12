const keys = require('../../config/keys')

module.exports= mail =>{
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>Activate Your Account</h3>
					<p>${mail.body}</p>
					<div>
						<a href="${keys.domain}/users/verify/${mail.token}">Confirm your account</a>
					</div>
				</div>
			</body>
		</html>
	`;
};