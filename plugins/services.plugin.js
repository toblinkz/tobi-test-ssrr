
import { BillingService } from '@/services/billing.service'
import {DeviceService} from "@/services/device.service";

export default ({ app: { $axios } }, inject) => {
	// pass $axios as a dependency to the BillingService constructor
	const billing = new BillingService($axios)
	const device = new DeviceService($axios)

	// inject the service, making it available in the context, component, store, etc.
	inject('billing', billing)
	inject('device', device)
}
