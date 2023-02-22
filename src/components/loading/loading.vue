<template>
	<div class="container container-slim py-4">
		<span class="loader"></span>
	</div>
</template>

<style lang="scss" scoped>
	.loader {
		width: 48px;
		height: 48px;
		border: 3px dotted #fff;
		border-style: solid solid dotted dotted;
		border-radius: 50%;
		display: inline-block;
		position: relative;
		box-sizing: border-box;
		animation: rotation 2s linear infinite;
	}
</style>
