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
							<button
								class="btn btn-pill bg-primary-lt"
								data-bs-toggle="modal"
								data-bs-target="#staticBackdropD"
							>
								Añadir
							</button>
							<ModalAdd
								:dni="employ?.dni == null ? 'cargando' : employ?.dni"
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
										: new Date(`${dateInfo.year}-${dateInfo.mes}-1`).getDay() -
										  1"
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
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { onMounted, ref, watch, onUnmounted } from 'vue'
	import { router } from '../../routers'
	import { BuscarBydni } from '../../../app/employ'
	import { getMonthName } from '../../../app/asistencia'
	import Loading from '../../components/loading/loading.vue'
	import CardEmploy from '../../components/calendario/employ.vue'
	import { Empleado } from '../../../app/models/empleado'
	import CardDia from '../../components/calendario/dia.vue'
	import { calendarStore } from '../../store/asistencia'
	import ModalAdd from '../../components/modals/doc.vue'

	import moment from 'moment'

	const isLoading = ref(false)
	const dni = router.currentRoute.value.params as any
	const employ = ref<Empleado>()

	const dateInfo = ref<any>({
		mes: <number>parseInt(dni.mes),
		year: <number>parseInt(dni.year),
	})

	const calstore = calendarStore()

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
