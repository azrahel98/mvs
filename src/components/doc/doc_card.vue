<template>
	<div class="col-md-4 col-sm-3 col-lg-2">
		<div class="card card-stacked">
			<div class="card-body">
				<div class="left"><list-details-icon /></div>
				<div class="rigth">
					<span class="fs-4 fw-bold">{{ prop.doc['tipo'] }}</span>
					<span class="text-muted fs-5">
						<calendar-icon height="18" />{{
							moment(prop.doc['fecha']).format('YYYY-MM-DD')
						}}
					</span>
					<span class="fs-5 fw-bold">{{ prop.doc['nombre'] }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import moment from 'moment'

	const prop = defineProps({
		doc: { type: Object, required: true },
	})
</script>

<style lang="scss" scoped>
	.card-body {
		padding: 0;
		width: 100%;
		margin: 0;
		display: flex;
		justify-content: space-around;
		padding-right: 0.2vh;
		gap: 1vh;
		padding: 1vh;
		.left {
			padding-top: 2vh;
		}
		.rigth {
			display: grid;
		}
	}
</style>
