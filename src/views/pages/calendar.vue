<template>
	<div id="report-calendar" ref="report-calendar">
		<CardEmploy
			v-if="!isLoading"
			:area="employ?.area == undefined ? 'cargando ..' : employ.area.toString()"
			:dni="employ?.dni == undefined ? 'cargando .. ' : employ.dni"
			:cargo="employ?.cargo == undefined ? 'cargo' : employ.cargo.toString()"
			:nombre="employ?.nombre == undefined ? 'cargando ..' : employ.nombre"
		></CardEmploy>
		<Loading v-else></Loading>

		<div class="container-xl">
			<div class="page-body">
				<div class="card main">
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
						<div class="d-flex justify-content-between bt gap-4">
							<button class="btn btn-pill bg-primary-lt" style="">
								Añadir
							</button>
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
										: new Date(`${dateInfo.year}-${dateInfo.mes}-1`).getDay() -
										  1"
								></div>

								<div
									v-for="x in moment(
										`${dateInfo.year}-${dateInfo.mes}-01`,
										'YYYY-MM-DD'
									).daysInMonth()"
								>
									<DiaFalta
										v-if="regis?.registros.filter((e:any) => moment(e.date).date() == x).length == 0 && regis?.doc.filter((e:any) => moment(e.fecha).date() == x ).length == 0 && regis?.ranges.filter((e:any) => moment(`${dateInfo.year}-${dateInfo.mes}-${x}`).isBetween(moment(e.inicio),moment(e.fin),null,'[]') ).length == 0"
										:dia="x"
									>
									</DiaFalta>
									<DiaSinDocs
										v-else-if="regis?.registros && regis?.doc.filter((e:any) => moment(e.fecha).date() == x ).length == 0 && regis?.ranges.filter((e:any) => moment(`${dateInfo.year}-${dateInfo.mes}-${x}`).isBetween(moment(e.inicio),moment(e.fin),null,'[]') ).length == 0"
										:dia="x"
										:registro="regis?.registros.find((e:any) => moment(e.date).date() == x)"
										:docs="regis?.doc.filter((e:any) => moment(e.fecha).date() == x )"
										:range="regis?.ranges.filter((e:any) => moment(`${dateInfo.year}-${dateInfo.mes}-${x}`).isBetween(moment(e.inicio),moment(e.fin),null,'[]') )"
									>
									</DiaSinDocs>

									<CardDia
										v-else
										:dia="x"
										:registro="regis?.registros.find((e:any) => moment(e.date).date() == x)"
										:docs="regis?.doc.filter((e:any) => moment(e.fecha).date() == x )"
										:range="regis?.ranges.filter((e:any) => moment(`${dateInfo.year}-${dateInfo.mes}-${x}`).isBetween(moment(e.inicio),moment(e.fin),null,'[]') )"
									/>
								</div>
							</div>
							<Loading v-else></Loading>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { onMounted, ref, watch } from 'vue'
	import { router } from '../../routers'
	import { BuscarBydni } from '../../../app/employ'
	import { getMonthName, buscarRegistros } from '../../../app/asistencia'
	import Loading from '../../components/loading/loading.vue'
	import CardEmploy from '../../components/calendario/employ.vue'
	import { Empleado, Marcaciones } from '../../../app/models/empleado'
	import CardDia from '../../components/calendario/dia.vue'

	import DiaFalta from '../../components/calendario/dia/falta.vue'
	import DiaSinDocs from '../../components/calendario/dia/normal.vue'

	import moment from 'moment'

	const regis = ref<Marcaciones>()

	const isLoading = ref(false)
	const dni = router.currentRoute.value.params as any
	const employ = ref<Empleado>()

	const dateInfo = ref<any>({
		mes: <number>parseInt(dni.mes),
		year: <number>parseInt(dni.year),
	})

	onMounted(async () => {
		isLoading.value = true
		employ.value = await BuscarBydni(dni.dni)
		regis.value = await buscarRegistros(
			dni.dni,
			parseInt(dni.mes),
			parseInt(dni.year)
		)
		isLoading.value = false
	})

	const siguiente = () => {
		if (dateInfo.value.mes == 12) {
			dateInfo.value.mes = 1
			dateInfo.value.year = dateInfo.value.year + 1
		} else {
			dateInfo.value.mes = dateInfo.value.mes + 1
		}
	}

	const anterior = () => {
		if (dateInfo.value.mes == 1) {
			dateInfo.value.mes = 12
			dateInfo.value.year = dateInfo.value.year - 1
		} else {
			dateInfo.value.mes = dateInfo.value.mes - 1
		}
	}

	watch(dateInfo.value, async (r, x) => {
		try {
			isLoading.value = true
			regis.value = await buscarRegistros(
				dni.dni,
				dateInfo.value.mes,
				parseInt(dateInfo.value.year)
			)
			await router.replace({
				params: { dni: dni.dni, mes: parseInt(r.mes), year: r.year },
			})
			isLoading.value = false
		} catch (error) {
			console.log(error)
			isLoading.value = false
		}
	})
</script>

<style lang="scss" scoped>
	.page-body {
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
</style>
