
import { BillingService } from '@/services/billing.service'
import {DeviceService} from "@/services/device.service";
import {UploadFileToS3Service} from "../services/uploadFileTos3.service";

export default ({ app: { $axios } }, inject) => {
	// pass $axios as a dependency to the BillingService constructor
	const billing = new BillingService($axios)
	const device = new DeviceService($axios)
	const uploadFileTos3 = new UploadFileToS3Service($axios)

	// inject the service, making it available in the context, component, store, etc.
	inject('billing', billing)
	inject('device', device)
	inject('uploadFileTos3', uploadFileTos3)
}
