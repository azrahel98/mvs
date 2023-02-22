<template>
	<div
		class="card"
		:class="[prop.registro == undefined ? 'bg-youtube-lt' : '']"
	>
		<h2 class="text-dark">{{ prop.dia }}</h2>
		<div class="horas" v-if="prop.registro">
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
			<div class="tardanza" v-if="((prop.registro as any).tardanza) ">
				<span
					class="status-dot status-dot-animated bg-yellow d-block text-center"
				/>
				<p>
					{{ ((prop.registro as any).tardanza as string).substring(0, 5) }}
				</p>
			</div>
		</div>
		<div class="docs">
			<div class="ranges" v-if="prop.range" v-for="r in prop.range">
				<div
					class="badge bg-bitbucket-lt"
					data-bs-toggle="modal"
					:data-bs-target="`#d-${(r as any).det}`"
				>
					{{ (r as any).det }}
				</div>
				<ModalCal :doc="(r as Object)" />
			</div>
			<div class="doc" v-if="prop.docs" v-for="r in prop.docs">
				<div
					class="badge"
					:class="[(r as any).asunto == 'JUSTIFICADO' ? 'bg-twitter' : 'bg-warning']"
					data-bs-toggle="modal"
					:data-bs-target="`#d-${(r as any).det}`"
				>
					{{ (r as any).det }}
				</div>
				<ModalCal :doc="(r as Object)" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import ModalCal from '../../components/calendario/modal.vue'

	const prop = defineProps({
		dia: { type: Number, required: true },
		registro: { type: Object },
		docs: { type: Array },
		range: { type: Array },
	})

	const chequear = (horastr: string) => {
		var hora = horastr.split(':')[0]
		var minuto = horastr.split(':')[1]

		if (parseInt(hora) >= 1) return true
		if (parseInt(minuto) > 15) return true
		return false
	}
</script>
<style lang="scss" scoped>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	.card {
		font-family: 'Montserrat', sans-serif;
		min-height: 80px;
		display: grid;
		grid-template-rows: repeat(auto, 4);
		row-gap: 0.5vh;
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
			gap: 1vh;

			div {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 0.2vh;
			}
		}
		.docs {
			display: grid;
			grid-template-rows: auto auto;
			justify-content: center;
			row-gap: 0.5vh;
			padding-top: 0.5vh;
			.ranges,
			.doc {
				display: flex;
				height: min-content;
				justify-content: space-around;
				gap: 0.5vh;
				flex-wrap: wrap;
			}
		}
	}
	// .card {
	// 	min-height: 100px;
	// 	display: grid;
	// 	grid-template-rows: min-content min-content auto auto;
	// 	row-gap: 1vh;

	// 	.doc,
	// 	.docr {
	// 		display: flex;
	// 		justify-content: center;
	// 		height: min-content;
	// 		flex-wrap: wrap;
	// 		gap: 1vh;
	// 	}

	// 	.doc {
	// 		padding-bottom: 1vh;
	// 	}

	// 	.registro {
	// 		display: grid;
	// 		row-gap: 1vh;
	// 		.reloj {
	// 			display: flex;
	// 			justify-content: space-around;
	// 			flex-wrap: wrap;
	// 			.badge {
	// 				height: min-content;
	// 			}
	// 		}
	// 		.tardanza {
	// 			justify-self: center;
	// 			background-color: orange;
	// 		}
	// 	}
	// 	span {
	// 		justify-self: center;
	// 	}
	// }
</style>
