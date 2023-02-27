<template>
	<div
		class="card"
		:class="[
			new Date(`${params.mes}/${prop.dia}/${params.year}`).getDay() == 6 ||
			new Date(`${params.mes}/${prop.dia}/${params.year}`).getDay() == 0
				? 'bg-facebook-lt'
				: '',
			registro ? '' : 'bg-warning-lt',
			docs!.length > 0 && !registro ? `${AbrevAsuntos((docs![0] as any).asunto).bg}` : '',
			range!.length > 0 && docs ? `${AbrevAsuntos((range![0] as any).asunto).bg}`:''
		]"
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
					class="status-dot status-dot-animated bg-warning d-block text-center"
				/>
				<p>
					{{ ((prop.registro as any).tardanza as string).substring(0, 5) }}
				</p>
			</div>
		</div>
		<div class="docs" v-if="docs?.length != 0 || range?.length != 0">
			<div class="ranges" v-if="prop.range" v-for="r in prop.range">
				<div
					class="badge"
					data-bs-toggle="modal"
					:class="AbrevAsuntos((r as any).asunto).class"
					:data-bs-target="`#d-${(r as any).det}`"
				>
					{{ AbrevAsuntos((r as any).asunto).abr }}
				</div>
				<ModalCal :doc="(r as Object)" />
			</div>
			<div class="doc" v-if="prop.docs" v-for="r in prop.docs">
				<div
					class="badge opacity-70"
					:class="AbrevAsuntos((r as any).asunto).class"
					data-bs-toggle="modal"
					:data-bs-target="`#d-${(r as any).det}`"
				>
					{{ AbrevAsuntos((r as any).asunto).abr }}
				</div>
				<ModalCal :doc="(r as Object)" />
			</div>
		</div>
		<div></div>
	</div>
</template>

<script lang="ts" setup>
	import { AbrevAsuntos } from '../../../app/documentos'
	import ModalCal from '../../components/calendario/modal.vue'
	import { router } from '../../routers'

	const params = router.currentRoute.value.params as any

	const prop = defineProps({
		dia: { type: Number, required: true },
		registro: { type: Object },
		docs: { type: Array },
		range: { type: Array },
	})
</script>
<style lang="scss" scoped>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	.card {
		font-family: 'Montserrat', sans-serif;
		min-height: 80px;
		display: grid;
		grid-template-rows: min-content min-content min-content auto;
		padding: 0;
		margin: 0;
		font-weight: 500;
		font-size: 0.75rem;
		h2,
		p {
			margin: 0;
			padding: 0;
			justify-self: center;
			height: auto;
		}
		.horas,
		.docs {
			height: min-content;
		}
		.horas {
			justify-self: center;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			gap: 1vh;
			div {
				display: flex;
				align-items: center;
			}
		}
		.docs {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
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
