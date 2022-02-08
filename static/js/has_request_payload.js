import crypto from "crypto";

export function hashRequestPayload(data) {
	let secretKey = process.env.ADSK;
	return 	crypto.createHmac('sha512', secretKey).update(JSON.stringify(data).replace(/[\/\\']/g,'').trim()).digest('hex');
}
