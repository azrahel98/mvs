<template>
	<div class="page-body">
		<div class="container-xl">
			<div class="card card-lg">
				<div class="card-body">
					<div class="row p-0 m-0 justify-content-between gap-0">
						<div class="col-6">
							<p class="h3">Municipalidad de Villa El Salvador</p>
						</div>
						<div class="col-6 text-end">
							<p class="h3"># {{ doc['nombre'] }}</p>
							<address>
								<calendar-icon /> {{ doc['fecha'] }} <br />
								{{ doc['docId'] }}
							</address>
						</div>
						<div class="col-12">
							<h1>{{ doc['tipo'] }}</h1>
						</div>
					</div>
					<table class="table table-transparent table-responsive">
						<thead>
							<tr>
								<th>Nombre</th>
								<th class="text-center">Asunto</th>
								<th class="text-center">Fecha</th>
								<th class="text-center">Id</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="y in detalles">
								<td style="width: 20%">
									<p class="strong mb-1">
										{{ y['nombre'] }}
										<span
											class="status-dot"
											:class="[y['activo'] == 0 ? 'bg-green' : 'bg-danger']"
										/>
									</p>
									<div class="text-muted">{{ y['descripcion'] }}</div>
								</td>
								<td class="text-center text-break" style="width: 15%">
									{{ y['asunto'] }}
								</td>
								<td
									class="text-center"
									v-if="moment(y['fecha']).isValid()"
									style="width: 15%"
								>
									{{ y['fecha'] }}
								</td>
								<td class="text-center" v-else>
									<p class="text-muted p-0 m-0">
										{{
											moment(y['inicio']).add({ day: 1 }).format('YYYY-MM-DD')
										}}
									</p>
									<p class="p-0 m-0">a</p>

									<div class="text-muted p-0 m-0">
										{{ moment(y['fin']).add({ day: 1 }).format('YYYY-MM-DD') }}
									</div>
								</td>
								<td class="text-center" style="width: 15%">
									{{ y['idDetalle'] }}
								</td>
								<td style="width: 5%">
									<button
										v-if="admin.admin"
										v-show="y['activo'] == 0"
										class="btn rounded bg-danger-lt text-twitter"
										@click="anular(y)"
									>
										Anular
									</button>
									<button
										v-if="admin.admin"
										class="btn rounded bg-danger-lt text-youtube"
										@click="eliminar(y)"
									>
										<trash-icon />
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue'
	import { router } from '../../routers'
	import {
		BuscarById,
		buscardDetallesDocumentos,
		AnularById,
		EliminarDetalleById,
	} from '../../../app/documentos'
	import moment from 'moment'
	import { adminStore } from '../../store/user'

	const doc = ref<any>({})
	const detalles = ref<Array<any>>([])
	const admin = adminStore()

	onMounted(async () => {
		doc.value = await BuscarById(router.currentRoute.value.params.id as string)

		detalles.value = await buscardDetallesDocumentos(
			router.currentRoute.value.params.id as any
		)
	})

	const anular = (y: any) => {
		AnularById(y['idDetalle'])
		y['activo'] = 1
	}
	const eliminar = async (y: any) => {
		await EliminarDetalleById(y['idDetalle'])
	}
</script>
