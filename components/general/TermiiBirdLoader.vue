<template>
	<div v-if="loading" class="centered">
		<div class="fade-in"  >
			<img src="/images/termii_bird.svg"  data-src-retina="/" width="150px" height="auto">
		</div>
	</div>

</template>

<script>
export default {
	data: () => ({
		loading: false,
	}),
	methods: {
		start() {
			this.loading = true
		},
		finish() {
			this.loading = false
		},
	},
}
</script>

<style scoped>
.fade-in {
	animation: fadeIn ease 3s;
	-webkit-animation: fadeIn ease 3s;
	-moz-animation: fadeIn ease 3s;
	-o-animation: fadeIn ease 3s;
	-ms-animation: fadeIn ease 3s;
	animation-iteration-count: infinite;

}
@keyframes fadeIn {
	0% {opacity:0;}
	100% {opacity:1;}
}

@-moz-keyframes fadeIn {
	0% {opacity:0;}
	100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
	0% {opacity:0;}
	100% {opacity:1;}
}

@-o-keyframes fadeIn {
	0% {opacity:0;}
	100% {opacity:1;}
}

@-ms-keyframes fadeIn {
	0% {opacity:0;}
	100% {opacity:1;}
}
#logo-fading {
	-webkit-animation-name: logo-breathe;
	animation-name: logo-breathe;
	-webkit-animation-duration: 1.15s;
	animation-duration: 1.15s;
	-webkit-animation-delay: .1s;
	animation-delay: .1s;
	-webkit-animation-timing-function: cubic-bezier(.73,.005,.42,1.005);
	animation-timing-function: cubic-bezier(.73,.005,.42,1.005);
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
	-webkit-animation-direction: alternate;
	animation-direction: alternate;
	opacity: .1;
}
.centered {
	position: fixed;
	top: 50%;
	left: 50%;
	/* bring your own prefixes */
	transform: translate(-50%, -50%);
}
</style>
