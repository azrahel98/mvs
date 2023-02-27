<template>
	<div class="detalles">
		<form class="item" @submit.prevent="add">
			<div class="referencia">
				<div class="input-group mb-3">
					<select
						class="form-select"
						aria-label="Default select example"
						v-model="documentdetalle.asunto"
					>
						<option selected value="DF">DF</option>
						<option value="HORASEXTRAS">HORASEXTRAS</option>
						<option value="ONOMASTICO">ONOMASTICO</option>
						<option value="JUSTIFICADO">JUSTIFICADO</option>
						<option value="OMISION">OMISION</option>
						<option value="LICENCIA">LICENCIA</option>
						<option value="SANCION">SANCION</option>
						<option value="DFXHEL">DFXHEL</option>
						<option value="AC">AC</option>
						<option value="DM">DM</option>
						<option value="OTROS">OTROS</option>
					</select>
				</div>
				<div class="input-group mb-3">
					<span class="input-group-text">@</span>
					<input
						type="text"
						class="form-control"
						placeholder="Referencia"
						v-model="documentdetalle.referencia"
						aria-label="Referencia"
						required
					/>
				</div>
			</div>
			<div class="input-group mb-3">
				<div class="input-group-text">
					<input
						class="form-check-input mt-0"
						type="checkbox"
						v-model="isrange"
						aria-label="Checkbox for following text input"
					/>
				</div>
				<input
					type="date"
					class="form-control"
					v-model="documentdetalle.fecha"
					aria-label="Text input with checkbox"
					:disabled="!isrange"
				/>
			</div>
			<div class="descripcion">
				<div
					class="input-group mb-3"
					v-if="!isrange && store.document.tipo !== 'PAPELETA'"
				>
					<v-date-picker v-model="daterange" mode="date" is-range>
					</v-date-picker>
				</div>
				<div class="input-group">
					<textarea
						class="form-control"
						aria-label="With textarea"
						v-model="documentdetalle.descripcion"
						required
					></textarea>
				</div>
			</div>
			<div class="buttons">
				<button type="submit" class="btn btn-primary text-center mt-1">
					<span class="material-icons-outlined"> add_circle </span>
				</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts" setup>
	import moment from 'moment'
	import { ref, watchEffect } from 'vue'
	import { DetalleDocumentos } from '../../../../app/models/documentos'
	import { userDocsUpload } from '../../../store/doc'
	const store = userDocsUpload()

	const isrange = ref(true)
	const daterange = ref<any>(null)

	const documentdetalle = ref<DetalleDocumentos>({
		descripcion: '',
		fecha: null,
		referencia: null,
		asunto: 'DF',
		dni: store.dni,
		inicio: null,
		fin: null,
	})

	watchEffect(() => {
		documentdetalle.value.fecha = store.document.fecha as Date
	})

	const add = () => {
		if (!isrange.value) {
			documentdetalle.value.inicio = moment(daterange.value.start).format(
				'YYYY-MM-DD'
			)
			documentdetalle.value.fin = moment(daterange.value.end).format(
				'YYYY-MM-DD'
			)
			documentdetalle.value.fecha = null
		}
		documentdetalle.value.dni = store.dni
		store.addDoc(documentdetalle.value)
		documentdetalle.value = {
			descripcion: '',
			fecha: null,
			referencia: null,
			asunto: 'JUSTIFICADO',
			dni: store.dni,
			inicio: null,
			fin: null,
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		display: grid;
		justify-content: center;
		align-items: center;
		.referencia,
		.descripcion {
			display: flex;
			gap: 1vh;
		}
		.buttons {
			display: flex;
			gap: 2vh;
			justify-content: center;

			button {
				width: min-content;
				padding: 0;
				span {
					vertical-align: sub;
					padding: 0;
					margin: 0;
				}
			}
		}
	}
</style>
