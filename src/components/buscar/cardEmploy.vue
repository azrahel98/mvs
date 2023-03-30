<template>
	<div class="col-md-4 col-sm-4 col-lg-2">
		<div class="card">
			<div class="card-body p-4 text-center">
				<span class="avatar avatar-xl mb-3 avatar-rounded">{{
					formatAPAName(prop.empleado.nombre)
				}}</span>

				<h3 class="m-0 mb-1">
					<RouterLink
						:to="{
							name: 'calendar',
							params: {
								dni: prop.empleado.dni,
								mes: new Date().getMonth() + 1,
								year: new Date().getFullYear(),
							},
						}"
						class="m-0 mb-1"
						><a
							><span
								class="status-dot status-dot-animated bg-red d-block"
								v-if="prop.empleado.activo == 1"
							/>{{ prop.empleado.nombre }}</a
						></RouterLink
					>
				</h3>
				<div class="text-muted">{{ prop.empleado.area }}</div>
			</div>
			<div class="d-flex" v-if="adminstore.admin">
				<a
					class="card-btn"
					data-bs-toggle="modal"
					data-bs-target="#staticBackdropD"
					@click="click"
				>
					<script-plus-icon class="text-muted" />
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { userDocsUpload } from '../../store/doc'
	import { adminStore } from '../../store/user'

	const store = userDocsUpload()
	const adminstore = adminStore()

	const prop = defineProps({
		empleado: { type: Object, required: true },
	})
	const emit = defineEmits<{
		(e: 'change', id: object): void
	}>()

	const click = () => {
		store.document = { docId: null, nombre: '', tipo: '', fecha: '' }
		store.list = []
		store.dni = prop.empleado.dni
		emit('change', prop.empleado)
	}
	function formatAPAName(fullName: string): string {
		var nameArray = fullName.split(' ')
		var firstInitial = nameArray[0].charAt(0).toUpperCase()
		var middleInitial = ''

		if (nameArray.length > 2) {
			middleInitial = nameArray[1].charAt(0).toUpperCase()
		}

		var apaName = firstInitial + middleInitial

		return apaName
	}
</script>
<style lang="scss" scoped></style>
