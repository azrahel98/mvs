<template>
	<div id="calendario">
		<div class="container-xl">
			<div class="page-body">
				<CardEmploy
					:area="
						employ?.area == undefined ? 'cargando ..' : employ.area.toString()
					"
					:dni="employ?.dni == undefined ? 'cargando .. ' : employ.dni"
					:cargo="
						employ?.cargo == undefined ? 'cargo' : employ.cargo.toString()
					"
					:nombre="employ?.nombre == undefined ? 'cargando ..' : employ.nombre"
				></CardEmploy>

				<div class="row">
					<div class="card main col-lg-8 col-md-8 col-sm-12">
						<div class="calendar-tools">
							<div class="d-flex flex-column flex-lg-row text-center">
								<div class="my-2 me-2 my-lg-0 d-flex justify-content-center">
									<button
										class="btn btn-link text-dark ripple-surface-dark"
										style="min-width: 55.5px"
										@click="anterior"
									>
										<arrow-left-icon /></button
									><button
										data-mdb-ripple-color="dark"
										class="btn btn-link text-dark ripple-surface-dark"
										@click="siguiente"
										style=""
									>
										<arrow-right-icon />
									</button>
								</div>
								<span class="calendar-heading"
									>{{ getMonthName(dateInfo.mes) }} {{ dateInfo.year }}</span
								>
							</div>
							<div
								class="d-flex justify-content-between bt gap-4"
								v-if="adstore.admin"
							>
								<button
									class="btn btn-pill bg-primary-lt"
									data-bs-toggle="modal"
									data-bs-target="#staticBackdropD"
								>
									Añadir
								</button>
								<button
									class="btn btn-pill"
									:class="[
										calstore.saved ? 'bg-primary-lt' : 'bg-danger text-white',
									]"
									@click="calstore.guardarAsistencia"
								>
									Reloj
								</button>
								<ModalAdd
									:dni="dni.dni"
									:nombre="employ?.nombre == null ? 'cargando' : employ?.nombre"
								/>
							</div>
						</div>
						<div class="calendario">
							<div class="card">
								<div class="semana">
									<div class="card">L</div>
									<div class="card">M</div>
									<div class="card">M</div>
									<div class="card">J</div>
									<div class="card">V</div>
									<div class="card">S</div>
									<div class="card">D</div>
								</div>
								<div class="dias" v-if="!isLoading">
									<div
										class="card"
										v-for="a in new Date(
											`${dateInfo.year}-${dateInfo.mes}-1`
										).getDay() == 0
											? 6
											: new Date(
													`${dateInfo.year}-${dateInfo.mes}-1`
											  ).getDay() - 1"
									/>

									<div
										v-for="x in moment(
											`${dateInfo.year}-${dateInfo.mes}-01`,
											'YYYY-MM-DD'
										).daysInMonth()"
									>
										<CardDia
											:dia="x"
											:registro="calstore.regis?.registros.find((e:any) => moment(e.date).date() == x)"
											:docs="calstore.regis?.doc.filter((e:any) => moment(e.fecha).date() == x )"
											:range="calstore.regis?.ranges.filter((e:any) => moment(`${dateInfo.year}-${dateInfo.mes}-${x}`).isBetween(moment(e.inicio),moment(e.fin),null,'[]') )"
										/>
									</div>
								</div>
								<Loading v-else></Loading>
							</div>
						</div>
					</div>

					<div
						class="card registros col-lg-auto col-md-auto col-sm-12"
						v-if="calstore.asistencia.length > 0"
					>
						<div class="table-responsive">
							<table class="table">
								<thead>
									<tr>
										<th>F</th>
										<th>Fecha</th>
										<th>T</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="x in calstore.getList">
										<td>
											<span
												v-if="(x as any).falta == true"
												class="status-dot status-dot-animated bg-danger d-block text-center"
											/>
											<span
												v-else
												class="status-dot bg-success d-block text-center"
											/>
										</td>
										<td>
											{{ (x as any).fecha }}
										</td>
										<td v-if="(x as any).falta != true">
											{{ (x as any).tardanza }}
										</td>
										<td v-if="adstore.admin">
											<button
												class="btn btn-outline-youtube btn-sm text-center"
												@click="eliminarRegistroa(x)"
											>
												<trash-icon />
											</button>
										</td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td colspan="3" class="text-center text-danger">
											Faltas {{ calstore.faltas }}
										</td>
									</tr>
									<tr>
										<td colspan="3" class="text-center text-warning">
											Tardanza {{ calstore.tardanza }}
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { onMounted, ref, watch, onUnmounted } from 'vue'
	import { router } from '../../routers'
	import { BuscarBydni } from '../../../app/employ'
	import { getMonthName, EliminarAsistencia } from '../../../app/asistencia'
	import Loading from '../../components/loading/loading.vue'
	import CardEmploy from '../../components/calendario/employ.vue'
	import { Empleado } from '../../../app/models/empleado'
	import CardDia from '../../components/calendario/dia.vue'
	import { calendarStore } from '../../store/asistencia'
	import ModalAdd from '../../components/modals/doc.vue'

	import moment from 'moment'
	import { adminStore } from '../../store/user'
	import { onBeforeRouteLeave } from 'vue-router'

	const isLoading = ref(false)
	const dni = router.currentRoute.value.params as any
	const employ = ref<Empleado>()

	const dateInfo = ref<any>({
		mes: <number>parseInt(dni.mes),
		year: <number>parseInt(dni.year),
	})

	const calstore = calendarStore()
	const adstore = adminStore()

	onMounted(async () => {
		isLoading.value = true
		employ.value = await BuscarBydni(dni.dni)
		calstore.agregar(dni.dni, parseInt(dni.mes), parseInt(dni.year))
		isLoading.value = false
	})

	onUnmounted(() => {
		calstore.$reset()
	})

	const siguiente = () => {
		if (!calstore.saved) {
			let data = confirm('Estas seguro de salir sin guardar')
			if (data) {
				calstore.$reset()
				if (dateInfo.value.mes == 12) {
					dateInfo.value.mes = 1
					dateInfo.value.year = dateInfo.value.year + 1
				} else {
					dateInfo.value.mes = dateInfo.value.mes + 1
				}
			}
		} else {
			if (dateInfo.value.mes == 12) {
				dateInfo.value.mes = 1
				dateInfo.value.year = dateInfo.value.year + 1
			} else {
				dateInfo.value.mes = dateInfo.value.mes + 1
			}
		}
	}

	const anterior = () => {
		if (!calstore.saved) {
			let data = confirm('Estas seguro de salir sin guardar')
			if (data) {
				calstore.$reset()
				if (dateInfo.value.mes == 1) {
					dateInfo.value.mes = 12
					dateInfo.value.year = dateInfo.value.year - 1
				} else {
					dateInfo.value.mes = dateInfo.value.mes - 1
				}
			}
		} else {
			if (dateInfo.value.mes == 1) {
				dateInfo.value.mes = 12
				dateInfo.value.year = dateInfo.value.year - 1
			} else {
				dateInfo.value.mes = dateInfo.value.mes - 1
			}
		}
	}

	watch(dateInfo.value, async (r, x) => {
		try {
			isLoading.value = true
			calstore.agregar(dni.dni, r.mes, parseInt(r.year))

			await router.replace({
				params: { dni: dni.dni, mes: parseInt(r.mes), year: r.year },
			})
			isLoading.value = false
		} catch (error) {
			console.log(error)
			isLoading.value = false
		}
	})

	onBeforeRouteLeave((to, from, next) => {
		if (!calstore.saved) {
			let data = confirm('Estas seguro de salir sin guardar')
			if (data) {
				next()
			}
		} else {
			next()
		}
	})

	const eliminarRegistroa = async (a: any) => {
		await EliminarAsistencia(dni.dni, a.fecha)
		calstore.asistencia = calstore.asistencia.filter((e) => e.fecha !== a.fecha)
	}
</script>

<style lang="scss" scoped>
	.page-body {
		display: grid;
		grid-template-rows: min-content auto;
		.row {
			padding: 0;
			margin: 0;
			gap: 1vh;
			justify-content: center;
			flex-wrap: wrap;
		}
		.main {
			border-radius: 20px;
			padding: 2vh;
			display: grid;
			grid-template-rows: auto 1fr;
			row-gap: 5vh;
			.calendar-tools {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				gap: 2vh;
				div {
					margin: auto;
				}

				.calendar-heading {
					font-size: 1.4rem;
					font-weight: 600;
					text-align: center;
				}
			}

			.calendario {
				.card {
					.semana {
						display: grid;
						grid-template-columns: repeat(7, 1fr);
						column-gap: 0.1vh;
						.card {
							border-top: none;
							border-bottom: none;
							text-align: center;
							text-align: center;
							vertical-align: inherit;
							font-weight: bold;
							font-size: 0.85rem;
						}
					}
					.dias {
						display: grid;
						grid-template-columns: repeat(7, 1fr);
						column-gap: 0.1vh;
					}
				}
			}
		}
	}
	.registros {
		padding: 0;
		margin: 0;

		height: min-content;
		max-height: 80vh;
		text-align: center;

		table {
			tr {
				height: min-content;

				padding: 0;
				margin: 0;
				td {
					height: min-content;
					font-size: 0.9rem;
				}
			}
		}
	}
</style>
