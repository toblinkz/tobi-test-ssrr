<template>
	<div>
		<div class="code-tab">
			<button :class="{'button-tab': json_active, 'inactive-button': !json_active}" @click="showJsonCode">JSON</button>
			<button :class="{'button-tab': js_active, 'inactive-button': !js_active}" @click="showJsCode">Javascript</button>
			<button :class="{'button-tab': node_active , 'inactive-button': !node_active}" @click="showNodeCode">NodeJs</button>
			<button :class="{'button-tab': python_active, 'inactive-button': !python_active}" @click="showPythonCode">Python</button>
			<button :class="{'button-tab': csharp_active, 'inactive-button': !csharp_active}" @click="showCsharpCode">C#</button>
			<button :class="{'button-tab': java_active, 'inactive-button': !java_active}" @click="showJavaCode">Java</button>
			<button :class="{'button-tab': php_active, 'inactive-button': !php_active}" @click="showPhpCode">PHP</button>
		</div>
		<Prism language="javascript" v-show="json_active">
			<slot name="json_code"></slot>
		</Prism>
		<Prism language="javascript" v-show="js_active">
			<slot name="js_code"></slot>
		</Prism>
		<Prism language="javascript" v-show="node_active">
			<slot name="node_code"></slot>
		</Prism>
		<Prism language="python" v-show="python_active">
			<slot name="python_code"></slot>
		</Prism>
		<CodeHighlight language="csharp" v-show="csharp_active">
			<slot name="csharp_code"></slot>
		</CodeHighlight>
		<Prism language="php" v-show="php_active">
			<slot name="php_code"></slot>
		</Prism>
		<Prism language="java" v-show="java_active">
			<slot name="java_code"></slot>
		</Prism>

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


export default {
	name: "CodeBlock",
	components: {
		CodeHighlight,
		Prism
	},

	data(){
		return{
			json_active: true,
			js_active: false,
			php_active: false,
			python_active: false,
			csharp_active: false,
			node_active: false,
			java_active: false
		}
	},
	methods: {
		showJsonCode(){
			this.json_active = true;
			this.php_active = false;
			this.java_active = false;
			this.csharp_active = false;
			this.node_active = false;
			this.js_active = false;
			this.python_active = false;
		},
		showJavaCode(){
			this.json_active = false;
			this.php_active = false;
			this.java_active = true;
			this.csharp_active = false;
			this.node_active = false;
			this.js_active = false;
			this.python_active = false;
		},
		showPythonCode(){
			this.json_active = false;
			this.php_active = false;
			this.java_active = false;
			this.csharp_active = false;
			this.node_active = false;
			this.js_active = false;
			this.python_active = true;
		},
		showNodeCode(){
			this.json_active = false;
			this.php_active = false;
			this.java_active = false;
			this.csharp_active = false;
			this.node_active = true;
			this.js_active = false;
			this.python_active = false;
		},
		showPhpCode(){
			this.json_active = false;
			this.php_active = true;
			this.java_active = false;
			this.csharp_active = false;
			this.node_active = false;
			this.js_active = false;
			this.python_active = false;
		},
		showCsharpCode(){
			this.json_active = false;
			this.php_active = false;
			this.java_active = false;
			this.csharp_active = true;
			this.node_active = false;
			this.js_active = false;
			this.python_active = false;
		},
		showJsCode(){
			this.json_active = false;
			this.php_active = false;
			this.java_active = false;
			this.csharp_active = false;
			this.node_active = false;
			this.js_active = true;
			this.python_active = false;
		}

	}
};
</script>
<style>
.code-tab {
	display: flex;
	justify-content: space-around;
	position: sticky;
	top: 0px;
	margin-bottom: -8px;
	background: #263238;
	padding-top: 24px;
	border-bottom: 2px solid #4a5568; ;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}
pre[class*="language-"] {
	/* padding: 1em; */
	/* margin: .5em 0; */
	overflow: auto;
	border-radius: 0.3em;
	min-height: 160px;
	max-height: 215px;
	background: #263238;

}
code[class*="language-"], pre[class*="language-"] {
	tab-size: 1;
	font-family: Roboto Mono,monospace !important;
}
.button-tab {
	border: none;
	padding: 8px;
	font-size: 14px;
	font-weight: 600;
	line-height: 16px;
	cursor: pointer;
	color: #cbd5e0;
	background-color: rgba(255, 255, 255, 0);
	border-bottom: 3px solid #406dad;
}
.button-tab:focus{
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
	color: #cbd5e0;
	background-color: rgba(255, 255, 255, 0);
}
</style>
