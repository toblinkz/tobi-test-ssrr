<template>
	<div style="width: 580px">
		<div v-if="show_default_text" class="code-block-style">
			<div class="text-center" style="margin-top: 60px">Dial number to see the response here</div>
		</div>
		<CodeHighlight v-if="!show_default_text" language="json">
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
import CodeBlock from "./CodeBlock";

export default {
	name: "CodeBlockResponse",
	components: {
		CodeBlock,
		CodeHighlight, Prism
	},
	data() {
		return {}
	},
	props: {
		show_default_text: {}
	},
	methods: {}
};
</script>
<style scoped>
.code-tab {
	display: flex;
	justify-content: space-around;
	position: sticky;
	top: 0px;
	margin-bottom: -10px;
	background: rgba(32, 74, 113, 1);
	padding-top: 24px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}

pre[class*="language-"] {
	/* padding: 1em; */
	/* margin: .5em 0; */
	overflow: auto;
	border-radius: 0.3em;
	min-height: 160px;
	max-height: 280px;
	text-align: center;
	background: rgba(32, 74, 113, 1);
}

code[class*="language-"], pre[class*="language-"] {
	tab-size: 1;
}

.button-tab {
	border-radius: 4px;
	border: none;
	padding: 8px;
	font-size: 14px;
	font-weight: 600;
	line-height: 16px;
	cursor: pointer;
	outline: 0;
	color: rgb(255, 255, 255);
	background-color: rgba(255, 255, 255, 0.1);
}

.button-tab:focus {
	outline: 0;
}

.inactive-button {
	border-radius: 4px;
	border: none;
	padding: 8px;
	font-size: 14px;
	font-weight: 600;
	line-height: 16px;
	cursor: pointer;
	color: rgb(154, 168, 189);
	background-color: rgba(255, 255, 255, 0);
}

.code-block-style {
	color: #FFFFFF;
	overflow: auto;
	border-radius: 0.3em;
	min-height: 160px;
	max-height: 280px;
	background: #263238;
}

</style>
