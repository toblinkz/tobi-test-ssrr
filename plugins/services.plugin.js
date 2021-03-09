
import { BillingService } from '@/services/billing.service'

export default ({ app: { $axios } }, inject) => {
	// pass $axios as a dependency to the RecommendationsService constructor
	const billing = new BillingService($axios)

	// inject the service, making it available in the context, component, store, etc.
	inject('billing', billing)
}
