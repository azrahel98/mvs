<template>
	<div class="card">
		<div class="card-header">
			<h3 class="card-title">Funcionarios</h3>
		</div>
		<div class="card-body">
			<div class="row g-3">
				<div class="col-6" v-for="x in prop.usuarios">
					<RouterLink
						:to="{name:'calendar',params:{
							dni:(x as any)['dni'],
							mes:2,
							year:2023
						}}"
						tag="a"
						class="row g-3 align-items-center"
						:replace="true"
					>
						<a class="col-auto">
							<span
								class="avatar"
								:style="`background-image: url(${(x as any)['foto']})`"
							>
								<span class="badge bg-green"></span
							></span>
						</a>
						<div class="col text-truncate">
							<a class="d-block text-truncate text-black">{{
								(x as any)['nombre']
							}}</a>
							<div class="text-muted text-truncate mt-n1">
								{{ (x as any)['Abrev'] }}
							</div>
						</div>
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const prop = defineProps({
		usuarios: { type: Array, required: true },
	})
</script>
