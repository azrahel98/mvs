<template>
	<div
		class="modal fade"
		id="staticBackdropD"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="staticBackdropLabel">
						{{ prop.nombre }}
					</h1>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<div class="main">
						<div class="input-group mb-3">
							<span class="input-group-text" id="basic-addon1">@</span>
							<input
								type="text"
								class="form-control"
								placeholder="Doc Nombre"
								v-model="documento.nombre"
								:disabled="disableDoc"
							/>
						</div>
						<div class="document-detail">
							<div class="input-group mb-3">
								<select
									class="form-select"
									aria-label="Default select example"
									v-model="documento.tipo"
									:disabled="disableDoc"
								>
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
							<div class="input-group mb-3">
								<span class="input-group-text" id="basic-addon1">@</span>
								<input
									type="date"
									class="form-control"
									aria-describedby="basic-addon1"
									v-model="documento.fecha"
									:disabled="disableDoc"
								/>
							</div>
						</div>
						<br />
					</div>
					<div class="lista">
						<ItemDoc />
					</div>
					<div class="result">
						<ul>
							<div v-for="(x, i) in store.list" class="list">
								<li>{{ x }}</li>
								<button
									type="submit"
									class="btn btn-danger text-center mt-1 btn-sm"
									@click="quitarItem(i)"
								>
									<span class="material-icons-outlined"> remove_circle </span>
								</button>
							</div>
						</ul>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal">
						<span class="material-icons-outlined"> close_fullscreen </span>
					</button>
					<button type="button" class="btn btn-info" @click="buscar">
						<span class="material-icons-outlined"> travel_explore </span>
					</button>
					<button type="button" class="btn btn-primary" @click="save">
						<span class="material-icons-outlined"> save </span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import {
		onMounted,
		reactive,
		watchEffect,
		ref,
		watch,
		onUnmounted,
	} from 'vue'
	import ItemDoc from '../modals/item/item.vue'
	import { Documento } from '../../../app/models/documentos'
	import { buscarDoc, Guardar } from '../../../app/documentos'
	import moment from 'moment'
	import 'vue3-toastify/dist/index.css'
	import { toast } from 'vue3-toastify'

	import { userDocsUpload } from '../../store/doc'

	const prop = defineProps({
		dni: { type: String, required: true },
		nombre: { type: String, required: true },
	})

	const disableDoc = ref<any>(false)

	const store = userDocsUpload()

	onMounted(() => {
		store.dni = prop.dni as string
	})
	onUnmounted(() => {
		store.$reset()
	})
	watch(prop, (_x, _xs) => {
		disableDoc.value = false
		documento.docId = null
		documento.fecha = moment().format('YYYY-MM-DD')
		documento.tipo = 'MEMORANDO'
		documento.nombre = ''
	})

	const documento = reactive<Documento>({
		docId: null,
		fecha: moment().format('YYYY-MM-DD'),
		tipo: 'MEMORANDO',
		nombre: '',
	})

	watchEffect(() => {
		store.document = {
			nombre: documento.nombre,
			tipo: documento.tipo,
			fecha: documento.fecha,
			docId: documento.docId,
		}
	})

	const quitarItem = (index: number) => {
		store.removeDoc(index)
	}

	const buscar = async () => {
		try {
			disableDoc.value = true
			if (documento.nombre) {
				var searchres = await buscarDoc(documento.nombre)
				documento.docId = searchres.docId
				documento.tipo = searchres.tipo
				documento.fecha = moment(searchres.fecha).format('YYYY-MM-DD')
			} else {
				console.log(documento)
			}
		} catch (error) {
			disableDoc.value = false
			toast((error as any).error.message)
		}
	}

	const save = async () => {
		await Guardar(store.document, store.list)
	}
</script>

<style lang="scss" scoped>
	.main {
		display: grid;
		grid-template-rows: min-content 1fr 1fr;
		.document-detail {
			display: flex;
			gap: 2vh;
		}
	}
	.lista {
		display: flex;
		flex-direction: column;
		gap: 5vh;
	}
	.result {
		padding-top: 4vh;
		.list {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.modal-footer {
		display: flex;
		gap: 2vh;
		button {
			margin: 0;
			padding: 0;
			height: min-content;
			border-radius: 10px;
			padding: 4px;
			span {
				height: min-content;
				vertical-align: sub;
			}
		}
	}
</style>
