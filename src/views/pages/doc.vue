<template>
	<div>
		<div class="container-xl">
			<div class="page-header d-print-none">
				<div class="row">
					<div class="col-auto">
						<h2 class="page-title">Documentos</h2>
					</div>
					<div class="col-auto">
						<div class="d-flex gap-4">
							<div class="input-group">
								<span class="input-group-text"><file-code-icon /></span>
								<input
									type="text"
									class="form-control"
									v-model="dni"
									placeholder="DNI"
									v-on:keyup.enter="buscar"
								/>
							</div>
							<div class="input-group">
								<span class="input-group-text"><file-code-icon /></span>
								<input
									type="text"
									class="form-control"
									placeholder="Nombre"
									v-model="doc"
									v-on:keyup.enter="buscar"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-body">
			<div class="container-xl">
				<div class="row row-cards justify-content-center">
					<cardDoc v-for="x in result" :doc="x" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import cardDoc from '../../components/doc/doc_card.vue'
	import { buscarDocumentosDNI, buscarDocByName } from '../../../app/documentos'

	const dni = ref<string>()
	const doc = ref<string>()

	const result = ref<Array<Object>>([])

	const buscar = async () => {
		try {
			if (dni.value) {
				result.value = await buscarDocumentosDNI(dni.value)
			} else if (doc.value) {
				result.value = (await buscarDocByName(doc.value)) as any
			}
		} catch (error) {
			result.value = []
		}
	}
</script>

<style lang="scss" scoped>
	.row {
		align-content: center;
		justify-content: space-around;
		justify-items: center;
		align-items: center;
	}
</style>

<!-- <template>
	<div>
		<div class="page-header d-print-none">
			<div class="container-xl">
				<div class="row g-2 align-items-center">
					<div class="col">
						<h2 class="page-title">Form elements</h2>
					</div>
				</div>
			</div>
		</div>
		<div class="page-body">
			<div class="container-xl">
				<div class="row row-cards">
					<div class="col-12">
						<div class="card">
							<div class="card-header">
								<h4>Documentos</h4>
							</div>
							<div class="card-body">
								<div class="row justify-content-around row-gap-2">
									<div class="col-xl-6 col-md-6 col-sm-6">
										<div class="input-group mb-3">
											<span class="input-group-text" id="basic-addon1">@</span>
											<input
												type="text"
												class="form-control"
												v-model="documento.nombre"
												placeholder="Doc Nombre"
												aria-label="doc"
												aria-describedby="basic-addon1"
											/>
										</div>
									</div>
									<div class="col-xl-6 col-md-6 col-sm-auto botones">
										<button
											type="button"
											class="btn btn-sm rounded-3 btn-outline-info"
											data-bs-toggle="modal"
											data-bs-target="#modalsearchdoc"
										>
											<search-icon />
										</button>
										<button
											@click="buscar"
											type="button"
											class="btn btn-sm rounded-3 btn-outline-info"
										>
											<list-details-icon />
										</button>

										<modalSearch @select="listenDocId" />
									</div>

									<div class="col-md-2 col-sm-4">
										<div class="input-group flex-nowrap">
											<span class="input-group-text"><barcode-icon /></span>
											<input
												v-model="documento.docId"
												type="text"
												class="form-control"
												placeholder="codigo"
											/>
										</div>
									</div>
									<div class="col-md-4 col-sm-4">
										<div class="input-group flex-nowrap">
											<span class="input-group-text"><calendar-icon /></span>
											<input
												v-model="documento.fecha"
												type="date"
												class="form-control"
												placeholder="fecha"
											/>
										</div>
									</div>
									<div class="col-md-4 col-sm-4">
										<div class="input-group mb-3">
											<select class="form-select" v-model="documento.tipo">
												<option selected value="MEMORANDO">MEMORANDO</option>
												<option value="DOC-ADM">DOC-ADM</option>
												<option value="SOLICITUD">SOLICITUD</option>
												<option value="DESCANSO MEDICO">DM</option>
												<option value="INFORME">INFORME</option>
												<option value="RESOLUCION">RESOLUCION</option>
												<option value="CARTA">CARTA</option>
												<option value="OFICIO">OFICIO</option>
												<option value="RENUNCIA">RENUNCIA</option>
												<option value="PAPELETA">PAPELETA</option>
											</select>
										</div>
									</div>
									<div class="col-12 mt-4 text-center">
										<h1>Detalle</h1>
									</div>
									<div class="col-12">
										<div class="divide-y">
											<ItemsDetalle
												v-if="items.length !== 0"
												v-for="x in items"
												:item="x"
											/>
										</div>
									</div>
								</div>
							</div>
							<div class="card-footer">
								<button type="button" class="btn btn-outline-primary">
									Primary
								</button>
								<button type="button" class="btn btn-outline-secondary">
									Secondary
								</button>
								<button type="button" class="btn btn-outline-success">
									Success
								</button>
								<button type="button" class="btn btn-outline-danger">
									Danger
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref } from 'vue'
	import { buscardDetallesDocumentos } from '../../../app/documentos'
	import { Documento } from '../../../app/models/documentos'
	import modalSearch from '../../components/doc/modal_search.vue'

	import ItemsDetalle from '../../components/doc/items.vue'

	const documento = reactive<Documento>({
		docId: null,
		fecha: null,
		tipo: null,
		nombre: null,
	})
	const items = ref<Array<any>>([])

	const listenDocId = (e: any) => {
		documento.docId = e.docId
		documento.fecha = e.fecha
		documento.nombre = e.nombre
		documento.tipo = e.tipo
	}

	const buscar = async () => {
		if (documento.docId) {
			items.value = []
			items.value = (await buscardDetallesDocumentos(documento.docId)) as any
		}
	}
</script>

<style lang="scss" scoped>
	.botones {
		display: flex;
		height: min-content;
		gap: 1vh;
	}
</style> -->
