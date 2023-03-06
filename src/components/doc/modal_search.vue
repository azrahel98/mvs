<template>
	<div class="modal fade" id="modalsearchdoc" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="row p-2">
					<div class="col">
						<div class="input-group mb-3">
							<span class="input-group-text" id="basic-addon1">@</span>
							<input
								type="text"
								v-on:keyup.enter="buscar"
								class="form-control"
								placeholder="Username"
								aria-label="Username"
								v-model="name"
								aria-describedby="basic-addon1"
							/>
						</div>
					</div>
					<div class="col-12">
						<div class="list-group list-group-flush list-group-hoverable">
							<div
								class="list-group-item"
								v-for="x in result"
								@click="seleccionar(x as any)"
								data-bs-dismiss="modal"
								aria-label="Close"
							>
								<div class="row align-items-center">
									<div class="col-auto">
										<span class="badge bg-azure"></span>
									</div>
									<div class="col text-truncate">
										<a class="text-reset d-block">{{ (x as any).nombre }}</a>
										<div class="d-block text-muted text-truncate mt-n1">
											{{ (x as any).tipo }} - {{ (x as any).fecha }}
										</div>
									</div>
									<div class="col-auto">
										<a href="#" class="list-group-item-actions">
											{{ (x as any).items }}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { buscarDocByName } from '../../../app/documentos'

	const e = defineEmits<{
		(e: 'select', value: object): void
	}>()

	const name = ref()

	const result = ref()

	const buscar = async () => {
		result.value = await buscarDocByName(name.value)
	}

	const seleccionar = (id: object) => {
		e('select', id)
	}
</script>
