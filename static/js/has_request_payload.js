import crypto from "crypto";

export function hashRequestPayload(data) {
	let secretKey = process.env.ADSK;
	console.log('secr',secretKey);
	return 	crypto.createHmac('sha512', secretKey).update(JSON.stringify(data).replace(/[\/\\']/g,'').trim()).digest('hex');
}
