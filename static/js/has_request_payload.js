import crypto from "crypto";

export function hashRequestPayload(data) {
	let secretKey = process.env.ACCOUNT_SECRET_KEY;
	console.log(secretKey);
	return 	crypto.createHmac('sha512', secretKey).update(JSON.stringify(data).trim()).digest('hex');
}
