<template>
	<div class="card bg-warning-lt">
		<span
			class="status-dot status-dot-animated bg-warning d-block text-center"
		/>
		<h2 class="text-dark">{{ prop.dia }}</h2>
	</div>
</template>
<script lang="ts" setup>
	const prop = defineProps({
		dia: { type: Number, required: true },
		registro: { type: Object },
		docs: { type: Array },
		range: { type: Array },
	})
</script>

<style lang="scss" scoped>
	.card {
		font-family: 'Montserrat', sans-serif;
		min-height: 80px;
		padding: 0;
		margin: 0;
		padding-left: 0.4vh;
		padding-right: 0.4vh;
		font-weight: 500;
		font-size: 0.75rem;
		display: grid;
		grid-template-columns: auto auto;
		justify-content: center;
		align-items: center;
		column-gap: 0.8vh;
		align-content: flex-start;

		h2 {
			margin: 0;
			padding: 0;
			font-size: 1rem;
			font-weight: 600;
			justify-self: center;
		}
	}
</style>
