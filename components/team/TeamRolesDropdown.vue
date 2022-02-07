<template>
	<div class="custom-select" :tabindex="tabindex" @blur="open = false">
		<div class="selected" :class="{ open: open }" @click="open = !open">
			{{ selected }}
		</div>
		<div class="items" :class="{ selectHide: !open }">
			<div
				v-for="role in options"
				:key="role.id"
				@click="
          selected = role.name;
          open = false;
          $emit('select-role-input', role.id);
        "
			>
				{{ role.name }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TeamRolesDropdown",
	props: {
		options: {
			type: Array,
			required: true,
		},
		default: {
			type: Object,
			required: false,
			default: null,
		},
		tabindex: {
			type: Number,
			required: false,
			default: 0,
		},
	},
	data() {
		return {
			selected: this.default.name
				? this.default.name
				: this.options.length > 0
					? this.options[0].name
					: null,
			open: false,
		};
	},
	mounted() {
		this.$emit("select-role-input", this.selected);
	},
}
</script>

<style scoped>
.custom-select {
	position: relative;
	width: 100%;
	text-align: left;
	outline: none;
	height: 36px;
	line-height: 36px;
}

.custom-select .selected {
	background: #FFFFFF;
	border: 1px solid rgba(204, 204, 204, 0.34);
	box-sizing: border-box;
	border-radius: 5px;
	color: #333333;
	padding-left: 1em;
	cursor: pointer;
	user-select: none;
}

.custom-select .selected.open {
	border: 1px solid #4DB6AC;
	border-radius: 5px 5px 0 0;
}

.custom-select .selected:after {
	position: absolute;
	content: "";
	top: 50%;
	transform: translateY(-20%);
	right: 1em;
	width: 0;
	height: 0;
	border: 6px solid #333333;
	border-color: #333333 transparent transparent transparent;
}

.custom-select .items {
	color: #333333;
	border-radius: 0 0 6px 6px;
	overflow: hidden;
	position: absolute;
	left: 0;
	right: 0;
	z-index: 1;
	background: #FFFFFF;
	box-shadow: 0 4px 15px 1px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
}

.custom-select .items div {
	color: #333333;
	padding-left: 1em;
	cursor: pointer;
	user-select: none;
}

.custom-select .items div:hover {
	background-color: #E5E5E5;
}

.selectHide {
	display: none;
}
</style>
