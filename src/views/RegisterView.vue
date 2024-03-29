<template>
	<div class="register">
		<h2 class="title">Register</h2>
		<form class="form" @submit.prevent="register">
			<label class="form-label" for="#email">Email:</label>
			<input
				v-model="email"
				class="form-input"
				type="email"
				id="email"
				required
				placeholder="eve.holt@reqres.in"
			/>
			<label class="form-label" for="#password">Password:</label>
			<input
				v-model="password"
				class="form-input"
				type="password"
				id="password"
				placeholder="pistol"
			/>
			<p v-if="error" class="error">Ooops, something went wrong.</p>
			<input class="form-submit" type="submit" value="Register" />
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegisterService from "@/services/RegisterService";
import Swal from "sweetalert2";

export default defineComponent({
	data() {
		return {
			email: "",
			password: "",
			error: false,
		};
	},
	methods: {
		async register() {
			try {
				const registerService = new RegisterService();
				const response = await registerService.register(
					this.email,
					this.password
				);

				if (response.data.id && response.data.token) {
					await Swal.fire({
						position: "top-end",
						icon: "success",
						title: "Your registration has been saved",
						showConfirmButton: false,
						timer: 1500,
					});
					this.$router.push("/");
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Something went wrong!",
					});
					this.error = true;
				}
			} catch (error) {
				console.error(error);
				Swal.fire({
					icon: "error",
					text: "Something went wrong" + error,
				});
				this.error = true;
			}
		},
	},
});
</script>

<style scoped>
.register {
	padding: 2rem;
}

.title {
	text-align: center;
}

.form {
	margin: 3rem auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 20%;
	min-width: 350px;
	max-width: 100%;
	background: rgba(19, 35, 47, 0.9);
	border-radius: 5px;
	padding: 40px;
	box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}

.form-label {
	margin-top: 2rem;
	color: white;
	margin-bottom: 0.5rem;
}

.form-label:first-of-type {
	margin-top: 0rem;
}

.form-input {
	padding: 10px 15px;
	background: none;
	background-image: none;
	border: 1px solid white;
	color: white;
}

.form-input:focus {
	outline: 0;
	border-color: #1ab188;
}

.form-submit {
	background: #1ab188;
	border: none;
	color: white;
	margin-top: 3rem;
	padding: 1rem 0;
	cursor: pointer;
	transition: background 0.2s;
}

.form-submit:hover {
	background: #0b9185;
}
</style>
