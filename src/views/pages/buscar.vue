<template>
	<div>
		<div class="container-xl">
			<div class="page-header d-print-none">
				<div class="row align-items-center">
					<div class="col">
						<h2 class="page-title">Empleados</h2>
						<div class="text-muted mt-1">{{ resultEmplys?.length }}</div>
					</div>
					<div class="col-auto ms-auto d-print-none">
						<div class="d-flex">
							<input
								type="search"
								class="form-control d-inline-block w-auto me-3"
								v-model="nombre"
								v-on:keyup.enter="buscar"
								placeholder="Buscar Trabajador ... "
							/>
							<a class="btn btn-pill bg-primary-lt">
								<plus-icon />
								Agregar
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-body">
			<div class="container-xl">
				<div class="row row-cards">
					<CardEmploy
						@change="changeEmploy"
						v-for="x in (resultEmplys as EmpleadoVw[])"
						:empleado="x"
					>
					</CardEmploy>
				</div>
			</div>
			<Doc
				:dni="employSelect?.dni == null ? 'cargando' : employSelect?.dni"
				:nombre="
					employSelect?.nombre == null ? 'cargando' : employSelect?.nombre
				"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { BuscarEmpleado } from '../../../app/employ'
	import { EmpleadoVw } from '../../../app/models/empleado'
	import CardEmploy from '../../components/buscar/cardEmploy.vue'
	import Doc from '../../components/modals/doc.vue'

	const nombre = ref<string>()
	const resultEmplys = ref<EmpleadoVw[]>()

	const employSelect = ref<EmpleadoVw>()

	const buscar = async () => {
		const result = await BuscarEmpleado(nombre.value as string)
		resultEmplys.value = result
	}

	const changeEmploy = (e: any) => {
		employSelect.value = e
	}
</script>

<style lang="scss" scoped>
	.row {
		padding: 0;
		.buscar {
			height: 100%;
			display: grid;
			grid-template-rows: auto 1fr;
			margin-top: 2vh;
			row-gap: 2vh;
			// height: 100%;
			.search-input {
				align-self: center;
				justify-self: center;
				width: max-content;
			}
			.resultado {
				overflow-y: auto;
				.profile {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(199px, 1fr));
					align-content: center;
					justify-content: center;
					justify-items: center;
					row-gap: 1vh;
					column-gap: 0.2vh;
				}
			}
		}
	}
</style>
