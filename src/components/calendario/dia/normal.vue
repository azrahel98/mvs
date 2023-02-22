<template>
	<div class="card">
		<h2>{{ prop.dia }}</h2>
		<div class="horas">
			<div>
				<span class="status-dot bg-azure d-block text-center" />
				<p>{{ ((prop.registro as any).entrada as string).substring(0, 5) }}</p>
			</div>
			<div v-if="(prop.registro as any).entrada2">
				<span class="status-dot bg-azure d-block text-center" />
				<p>
					{{ ((prop.registro as any).entrada2 as string).substring(0, 5) }}
				</p>
			</div>
			<div v-if="(prop.registro as any).salida">
				<span class="status-dot bg-azure d-block text-center" />
				<p>
					{{ ((prop.registro as any).salida as string).substring(0, 5) }}
				</p>
			</div>
		</div>
		<div class="tardanza" v-if="((prop.registro as any).tardanza) ">
			<span
				class="status-dot status-dot-animated bg-danger d-block text-center"
			/>
			<p>
				{{ ((prop.registro as any).tardanza as string).substring(0, 5) }}
			</p>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const prop = defineProps({
		dia: { type: Number, required: true },
		registro: { type: Object },
	})
</script>

<style lang="scss" scoped>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	.card {
		font-family: 'Montserrat', sans-serif;
		min-height: 80px;
		display: grid;
		grid-template-rows: min-content auto min-content;
		padding: 0;
		margin: 0;
		font-weight: 500;
		font-size: 0.75rem;
		p {
			padding: 0;
			margin: 0;
		}
		h2 {
			margin: 0;
			padding: 0;
			height: min-content;
			font-size: 1rem;
			font-weight: 600;
			justify-self: center;
		}
		.horas {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			gap: 0.5vh;
			div {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 0.2vh;
			}
		}
		.tardanza {
			padding-top: 2vh;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.2vh;
		}
		@media only screen and (max-width: 768px) {
			p {
				font-size: 0.55rem;
			}
		}
	}
</style>
