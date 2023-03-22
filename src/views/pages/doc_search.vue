<template>
	<div class="page-body">
		<div class="container-xl">
			<div class="card card-lg">
				<div class="card-body">
					<div class="row">
						<div class="col-6">
							<p class="h3">Municipalidad de Villa El Salvador</p>
							<address>
								Cruce De Av. Revolución Con Av. Vallejo,<br />
								Villa El Salvador, 42, Peru, Villa El Salvador, Peru 2765
							</address>
						</div>
						<div class="col-6 text-end">
							<p class="h3">{{ doc['tipo'] }}</p>
							<address>
								{{ doc['fecha'] }} <br />
								{{ doc['docId'] }}
							</address>
						</div>
						<div class="col-12 my-5">
							<h1>{{ doc['nombre'] }}</h1>
						</div>
					</div>
					<table class="table table-transparent table-responsive">
						<thead>
							<tr>
								<th class="text-center" style="width: 1%"></th>
								<th>Nombre</th>
								<th class="text-center" style="width: 8%">Asunto</th>
								<th class="text-center" style="width: 15%">Fecha</th>
								<th class="text-end" style="width: 1%">Id</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(y, x) in detalles">
								<td class="text-center">{{ x + 1 }}</td>
								<td>
									<p class="strong mb-1">{{ y['nombre'] }}</p>
									<div class="text-muted">{{ y['descripcion'] }}</div>
								</td>
								<td class="text-center">{{ y['asunto'] }}</td>
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
								<td class="text-end">{{ y['idDetalle'] }}</td>
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
