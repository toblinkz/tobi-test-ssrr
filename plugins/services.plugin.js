
import {BillingService} from '@/services/billing.service'
import {DeviceService} from "@/services/device.service";
import {ErrorService} from "@/services/error.service";
import {UploadFileToS3Service} from "@/services/uploadFileTos3.service";
import {UserService} from "@/services/user.service";
import {UtilityService} from "@/services/utility.service";
import {TeamService} from "../services/team.service";

export default ({ app: { $axios, $toast } }, inject) => {
	// pass $axios as a dependency to the BillingService constructor
	const billing = new BillingService($axios)
	const device = new DeviceService($axios)
	const user = new UserService($axios)
	const utility = new UtilityService($axios)
	const error = new ErrorService($axios, $toast)
	const uploadFileTos3 = new UploadFileToS3Service($axios)
	const teams = new TeamService($axios)

	// inject the service, making it available in the context, component, store, etc.
	inject('billing', billing)
	inject('device', device)
	inject('user', user)
	inject('utility', utility)
	inject('error', error)
	inject('uploadFileTos3', uploadFileTos3)
	inject('teams', teams)
}
