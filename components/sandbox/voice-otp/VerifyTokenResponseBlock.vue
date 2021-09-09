<template>
	<div style="width: 580px">
		<div v-if="show_verify_default_text" class="code-block-style">
			<div class="text-center" style="margin-top: 60px">Verify pin to see the response here</div>
		</div>
		<CodeHighlight v-if="!show_verify_default_text" language="json">
			<slot name="json_code"></slot>
		</CodeHighlight>
	</div>
</template>

<script>
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import 'prismjs';
import Prism from 'vue-prism-component';

import "vue-code-highlight/themes/prism-okaidia.css";
import 'prism-es6/components/prism-markup-templating';
import 'prism-es6/components/prism-java';
import 'prism-es6/components/prism-php';
import 'prism-es6/components/prism-python';
import 'prism-es6/components/prism-json';
import CodeBlock from "../../general/CodeBlock";
export default {
	name: "VerifyTokenResponseBlock",
	components: {
		CodeBlock,
		CodeHighlight, Prism
	},
	props: {
		show_verify_default_text: {}
	},
}
</script>

<style scoped>
.code-block-style {
	color: #FFFFFF;
	overflow: auto;
	border-radius: 0.3em;
	min-height: 160px;
	max-height: 280px;
	background: #263238;
}
</style>
