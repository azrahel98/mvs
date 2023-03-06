<template>
	<div class="main">
		<div class="info">
			<div class="input-group nombre">
				<span class="input-group-text"><user-icon /></span>
				<h4>{{ itemd.nombre }}</h4>
			</div>
			<div class="input-group">
				<select
					class="form-select"
					aria-label="Default select example"
					v-model="itemd.asunto"
					disabled
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
			<div class="input-group">
				<span class="input-group-text"><calendar-icon /></span>
				<input
					type="text"
					class="form-control"
					placeholder="referencia"
					v-model="itemd.referencia"
					disabled
				/>
			</div>
		</div>
		<div class="detalles">
			<div class="input-group id">
				<span class="input-group-text"><barcode-icon size="20" /></span>
				<input
					type="text"
					class="form-control codigo"
					placeholder="codigo"
					v-model="itemd.idDetalle"
					disabled
				/>
			</div>
			<div class="input-group" v-if="itemd.fecha !== 'Invalid date'">
				<span class="input-group-text"><calendar-icon /></span>
				<input
					type="date"
					class="form-control"
					v-model="itemd.fecha"
					disabled
				/>
			</div>
			<div class="input-group gap-2 align-items-center" v-else>
				<input
					type="date"
					class="form-control"
					v-model="itemd.inicio"
					aria-label="Text input with 2 dropdown buttons"
				/>
				<h5>a</h5>
				<input
					type="date"
					v-model="itemd.fin"
					class="form-control"
					aria-label="Text input with 2 dropdown buttons"
				/>
			</div>

			<div class="input-group flex-nowrap">
				<span class="input-group-text"><calendar-icon /></span>
				<div class="input-group">
					<textarea
						class="form-control"
						aria-label="With textarea"
						required
						v-model="itemd.descripcion"
						disabled
					></textarea>
				</div>
			</div>
		</div>
		<div class="acciones">
			<button type="button" class="btn btn-sm btn-outline-warning">
				<pencil-icon />
			</button>
			<button type="button" class="btn btn-sm btn-outline-danger">
				<trash-icon />
			</button>
			<button type="button" class="btn btn-sm btn-outline-primary">
				<device-floppy-icon />
			</button>
		</div>
		<!-- <div class="info-item">
			<div class="input-group">
				<span class="input-group-text"><barcode-icon size="20" /></span>
				<input
					type="text"
					class="form-control codigo"
					placeholder="codigo"
					v-model="itemd.idDetalle"
					disabled
				/>
			</div>
			<div class="input-group">
				<span class="input-group-text"><user-icon /></span>
				<h4 class="nombre">{{ itemd.nombre }}</h4>
			</div>
			<div class="input-group">
				<span class="input-group-text"><calendar-icon /></span>
				<input
					type="text"
					class="form-control"
					placeholder="referencia"
					v-model="itemd.referencia"
					disabled
				/>
			</div>

			<div class="input-group mb-3">
				<select
					class="form-select"
					aria-label="Default select example"
					v-model="itemd.asunto"
					disabled
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
		</div>
		<div class="detail-item">
			<div class="input-group">
				<span class="input-group-text"><calendar-icon /></span>
				<input
					type="date"
					class="form-control"
					v-model="itemd.fecha"
					disabled
				/>
			</div>

			<div class="input-group flex-nowrap">
				<span class="input-group-text"><calendar-icon /></span>
				<div class="input-group">
					<textarea
						class="form-control"
						aria-label="With textarea"
						required
						v-model="itemd.descripcion"
						disabled
					></textarea>
				</div>
			</div>
		</div>
		<div class="actions bg-red">
			<h1>s</h1>
		</div> -->
	</div>
</template>

<script lang="ts" setup>
	import moment from 'moment'
	import { reactive } from 'vue'
	import { DetalleDocumentosWithName } from '../../../app/models/documentos'

	const prop = defineProps({
		item: { type: Object, required: true },
	})
	const itemd = reactive<DetalleDocumentosWithName>({
		descripcion: prop.item.descripcion,
		fecha: prop.item.fecha,
		referencia: prop.item.referencia,
		asunto: prop.item.asunto,
		inicio: moment(prop.item.inicio).add({ day: 1 }).format('YYYY-MM-DD'),
		fin: moment(prop.item.fin).add({ day: 1 }).format('YYYY-MM-DD'),
		nombre: prop.item.nombre,
		activo: prop.item.activo,
		idDetalle: prop.item.idDetalle,
	})
</script>

<style lang="scss" scoped>
	.main {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: 1fr 1fr;
		.info,
		.detalles {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			align-items: center;
			align-content: center;
			justify-items: center;
			align-self: center;
		}
		.input-group {
			width: min-content;
			flex-wrap: nowrap;
			select,
			input,
			textarea {
				width: max-content;
			}
		}
		.info {
			.nombre {
				align-items: flex-start;
				gap: 1vh;
				padding: 0;
				margin: 0;
				flex-wrap: nowrap;
				width: min-content;
				span,
				h4 {
					width: min-content;
				}
				span {
					height: min-content;
				}
			}
		}
		.detalles {
			gap: 2vh;
			grid-row: 2 / 3;
			.id {
				input {
					padding: 0;
					margin: 0;
					text-align: center;
					width: 8vh;
				}
			}
		}
		.acciones {
			grid-column: -1 / -1;
			grid-row: -3 / 3;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			align-content: center;
		}
	}
</style>
