<script lang="ts">
	import { userStore, patStore } from '$lib/utils/store';
	import { github } from '$lib/utils/github';
	import { AxiosError } from 'axios';

	let pat = '';

	async function fetchRepos() {
		patStore.set(pat);
		try {
			const response = await github.get('/user');
			userStore.set({ ...response.data, total_repos: 0 });
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response !== undefined) {
					if (error.response.status === 401) {
						alert('Your token is not valid');
					} else {
						alert(`Something went wrong: "${error.message}" with code ${error.response.status}`);
					}
				} else {
					alert(`Something went wrong: ${error.message}`);
				}
			} else {
				alert(error);
			}
		}
	}
</script>

<form class="mt-10" on:submit|preventDefault={fetchRepos}>
	<input
		bind:value={pat}
		type="password"
		placeholder="Github Token"
		class="input input-bordered border-gray-500 w-full max-w-xs mr-4"
	/>
	<button class="btn btn-outline" type="submit">Fetch Data</button>
</form>
