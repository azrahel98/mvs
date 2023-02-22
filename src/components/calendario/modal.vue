<template>
	<div
		class="modal fade"
		:id="`d-${(prop.doc as any).det}`"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-body">
					<div class="card">
						<div class="ribbon ribbon-top bg-yellow">
							<!-- {{ (prop.doc as any).asunto }} -->
							<checkbox-icon />
						</div>
						<div class="card-body">
							<h3 class="card-title">{{ (prop.doc as any).asunto }}</h3>
							<p class="text-muted">
								{{ (prop.doc as any).descripcion }}
							</p>
							<p>{{ (prop.doc as any).referencia }}</p>
							<div v-if="(prop.doc as any).inicio" class="info">
								<div class="badge">
									{{ (prop.doc as any).inicio }}
								</div>
								<div class="badge">
									{{ (prop.doc as any).fin }}
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
	const prop = defineProps({
		doc: { type: Object, required: true },
	})
</script>

<style lang="scss" scoped>
	.info {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
</style>
