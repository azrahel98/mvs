<template>
	<div class="wrapper">
		<header class="navbar navbar-expand-md navbar-light d-print-none">
			<div class="container-xl">
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbar-menu"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<h1
					class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3"
				></h1>
				<div class="navbar-nav flex-row order-md-last">
					<div class="nav-item d-none d-md-flex me-3"></div>
					<a
						@click="toggle('theme-dark')"
						class="nav-link px-0 hide-theme-dark"
						title="Enable dark mode"
					>
						<!-- Download SVG icon from http://tabler-icons.io/i/moon -->
						<moon-icon />
					</a>
					<a
						@click="toggle('theme-light')"
						class="nav-link px-0 hide-theme-light"
						title="Enable light mode"
						data-bs-toggle="tooltip"
						data-bs-placement="bottom"
					>
						<sun-icon />
					</a>
					<!-- <div class="nav-item dropdown d-none d-md-flex me-3">
						<a
							class="nav-link px-0"
							data-bs-toggle="dropdown"
							tabindex="-1"
							aria-label="Show notifications"
						>
							<bell-icon />
							<span class="badge bg-red"></span>
						</a>
						<div
							class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card"
							data-bs-popper="static"
						>
							<div class="card">
								<div class="card-header">
									<h3 class="card-title">Last updates</h3>
								</div>
								<div class="list-group list-group-flush list-group-hoverable">
									<div class="list-group-item">
										<div class="row align-items-center">
											<div class="col-auto">
												<span
													class="status-dot status-dot-animated bg-red d-block"
												></span>
											</div>
											<div class="col text-truncate">
												<a href="#" class="text-body d-block">Example 1</a>
												<div class="d-block text-muted text-truncate mt-n1">
													Change deprecated html tags to text decoration classes
													(#29604)
												</div>
											</div>
											<div class="col-auto">
												<a href="#" class="list-group-item-actions">
													<star-icon />
												</a>
											</div>
										</div>
									</div>
									<div class="list-group-item">
										<div class="row align-items-center">
											<div class="col-auto">
												<span class="status-dot d-block"></span>
											</div>
											<div class="col text-truncate">
												<a href="#" class="text-body d-block">Example 2</a>
												<div class="d-block text-muted text-truncate mt-n1">
													justify-content:between ⇒
													justify-content:space-between (#29734)
												</div>
											</div>
											<div class="col-auto">
												<a href="#" class="list-group-item-actions show">
													<star-icon />
												</a>
											</div>
										</div>
									</div>
									<div class="list-group-item">
										<div class="row align-items-center">
											<div class="col-auto">
												<span class="status-dot d-block"></span>
											</div>
											<div class="col text-truncate">
												<a href="#" class="text-body d-block">Example 3</a>
												<div class="d-block text-muted text-truncate mt-n1">
													Update change-version.js (#29736)
												</div>
											</div>
											<div class="col-auto">
												<a href="#" class="list-group-item-actions">
													<star-icon />
												</a>
											</div>
										</div>
									</div>
									<div class="list-group-item">
										<div class="row align-items-center">
											<div class="col-auto">
												<span
													class="status-dot status-dot-animated bg-green d-block"
												></span>
											</div>
											<div class="col text-truncate">
												<a href="#" class="text-body d-block">Example 4</a>
												<div class="d-block text-muted text-truncate mt-n1">
													Regenerate package-lock.json (#29730)
												</div>
											</div>
											<div class="col-auto">
												<a href="#" class="list-group-item-actions">
													<star-icon />
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> -->
					<div class="nav-item dropdown">
						<a
							href="#"
							class="nav-link d-flex lh-1 text-reset p-0"
							data-bs-toggle="dropdown"
							aria-label="Open user menu"
						>
							<span
								class="avatar avatar-sm"
								style="
									background-image: url('https://lh3.googleusercontent.com/ogw/AAEL6shUBhFfipCKFCI3_VV4hvX24JYI72esj2oCFzl-DA=s32-c-mo');
								"
							></span>
							<div class="d-none d-xl-block ps-2">
								<div>Azrael</div>
								<div class="mt-1 small text-muted">olaf</div>
							</div>
						</a>
						<div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
							<a @click="salir" class="dropdown-item">salir</a>
						</div>
					</div>
				</div>
			</div>
		</header>
		<header class="navbar-expand-md">
			<div class="collapse navbar-collapse" id="navbar-menu">
				<div class="navbar navbar-light">
					<div class="container-xl">
						<ul class="navbar-nav">
							<RouterLink to="/" tag="li" class="nav-item">
								<a class="nav-link">
									<home-2-icon />
									<span class="nav-link-title"> Inicio </span>
								</a>
							</RouterLink>
							<RouterLink to="/buscar" tag="li" class="nav-item">
								<a class="nav-link">
									<user-search-icon />
									<span class="nav-link-title"> Buscar </span>
								</a>
							</RouterLink>
						</ul>
					</div>
				</div>
			</div>
		</header>
		<div class="page-wrapper">
			<RouterView></RouterView>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { salir } from '../../app/login'
	const toggle = (theme: string) => {
		document.body.className = ''
		document.body.classList.toggle(theme)
	}
</script>

<style lang="scss" scoped>
	.page-wrapper {
		padding: 0;
		margin: 0;
	}

	a {
		text-decoration: none;
	}
	.nav-link {
		gap: 1.25vh;
	}
</style>
