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
								<td>
									<p class="strong mb-1">{{ y['nombre'] }}</p>
									<div class="text-muted">{{ y['descripcion'] }}</div>
								</td>
								<td class="text-center text-break">{{ y['asunto'] }}</td>
								<td class="text-center" v-if="moment(y['fecha']).isValid()">
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
								<td class="text-center">{{ y['idDetalle'] }}</td>
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
	} from '../../../app/documentos'
	import { Documento } from '../../../app/models/documentos'
	import moment from 'moment'

	const doc = ref<any>({})
	const detalles = ref<Array<any>>([])

	onMounted(async () => {
		doc.value = await BuscarById(router.currentRoute.value.params.id as string)

		detalles.value = await buscardDetallesDocumentos(
			router.currentRoute.value.params.id as any
		)
	})
</script>
