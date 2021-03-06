
import {BillingService} from '@/services/billing.service'
import {DeviceService} from "@/services/device.service";
import {ErrorService} from "@/services/error.service";
import {UploadFileToS3Service} from "@/services/uploadFileTos3.service";
import {UserService} from "@/services/user.service";
import {UtilityService} from "@/services/utility.service";
import {TeamService} from "../services/team.service";
import {SmsService} from "../services/sms.service";
import {InsightService} from "../services/insight.service";
import {CouponService} from "../services/coupon.service";
import {VoiceOtpService} from "../services/sandbox/voice-otp.service";
import {SmsSandboxService} from "../services/sandbox/sms.service";
import {CampaignService} from "../services/campaign.service";
import {KYCService} from "@/services/kyc.service";

export default ({ app: { $axios, $toast, $config } }, inject) => {
	// pass $axios as a dependency to the BillingService constructor
	const billing = new BillingService($axios)
	const voiceOTP = new VoiceOtpService($axios)
	const smsSandbox = new SmsSandboxService($axios)
	const device = new DeviceService($axios)
	const user = new UserService($axios)
	const utility = new UtilityService($axios)
	const error = new ErrorService($axios, $toast)
	const uploadFileTos3 = new UploadFileToS3Service($axios)
	const teams = new TeamService($axios)
	const sms = new SmsService($axios)
	const insight = new InsightService($axios)
	const coupon = new CouponService($axios)
	const campaign = new CampaignService($axios, $config)
	const kyc = new KYCService($axios)

	// inject the service, making it available in the context, component, store, etc.
	inject('billing', billing)
	inject('device', device)
	inject('user', user)
	inject('utility', utility)
	inject('error', error)
	inject('uploadFileTos3', uploadFileTos3)
	inject('teams', teams)
	inject('sms', sms)
	inject('insight', insight)
	inject('coupon', coupon)
	inject('voiceOTP', voiceOTP)
	inject('smsSandbox', smsSandbox)
	inject('campaign', campaign)
	inject('kyc', kyc)
}
