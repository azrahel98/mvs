<template>
	<div class="container">
		<div class="row">
			<div class="card">
				<div class="card-body">
					<form @submit.prevent="submit">
						<div class="mb-3">
							<label for="userInput" class="form-label">Usuario</label>
							<input
								type="text"
								class="form-control"
								v-bind:class="`${errc.code == 1 ? 'is-invalid' : 'is-valid'}`"
								id="userInput"
								aria-describedby="UserHelp"
								v-model="username"
								required
							/>
							<div id="UserHelp" class="form-text">Coloque el nombre del usuario</div>
						</div>
						<div class="mb-3">
							<label for="exampleInputPassword1" class="form-label">Contraseña</label>
							<input
								type="password"
								class="form-control"
								v-bind:class="`${errc.code == 2 ? 'is-invalid' : ''}`"
								id="exampleInputPassword1"
								v-model="password"
								aria-describedby="passwordHelpBlock"
								required
							/>
						</div>
						<button type="submit" id="liveToastBtn" class="btn btn-outline-primary" :disabled="enableButton">
							Entrar
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive } from 'vue'
	import { login } from '../../app/login'
	import { ErrorCustom } from '../../app/models/error'
	import { router } from '../routers'

	const username = ref<string>()
	const password = ref<string>()
	const enableButton = ref<boolean>(false)

	const errc = reactive<ErrorCustom>({
		code: 0,
		message: '',
	})

	async function submit() {
		try {
			enableButton.value = true
			await login(username.value as string, password.value as string)
			router.push({ path: '/', replace: true })
		} catch (error: any) {
			errc.code = error.code
			errc.message = error.message
			enableButton.value = false
		}
	}
	// localStorage.clear()
</script>

<style lang="scss" scoped>
	.container {
		height: 100vh;
		text-align: center;

		.row {
			height: 100%;
			justify-content: center;
			align-items: center;
			align-content: center;
			.card {
				height: max-content;
				width: min-content;
				.card-body {
					display: flex;
					justify-content: center;
					form {
						width: max-content;
					}
				}
			}
		}
	}
</style>
