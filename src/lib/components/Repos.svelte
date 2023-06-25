<script lang="ts">
	import { onMount } from 'svelte';
	import { userStore, fetchingRepoStore, repoStore, currentRepoStore } from '$lib/utils/store';
	import { clsx } from 'clsx';

	import { github } from '$lib/utils/github';
	import type { Repo } from '$lib/types/Repos';

	let onlyMyRepo = false;
	let onlyPublicRepo = false;
	let filteredRepos: Array<Repo> = [];

	onMount(async () => {
		const perPage = 100; // Number of repositories per page
		let page = 1; // Initial page number

		while (true) {
			try {
				const response = await github.get(`/user/repos`, {
					params: {
						page,
						per_page: perPage
					}
				});

				const repos = response.data;
				repoStore.update((n) => n.concat(repos));
				userStore.update((n) => ({ ...n, total_repos: n.total_repos + repos.length }));
				filteredRepos = $repoStore;

				if (repos.length < perPage) {
					// Last page reached, break the loop
					fetchingRepoStore.set(false);
					break;
				}

				page++;
			} catch (error) {
				// Handle error
				alert(error);
				break;
			}
		}
	});

	function updateRepoList() {
		filteredRepos = $repoStore;

		// Apply filters if onlyMyRepo is true
		if (onlyMyRepo) {
			const username = $userStore.login; // Replace with your actual username
			filteredRepos = filteredRepos.filter((repo) => repo.owner.login === username);
		}

		// Apply filters if onlyPublicRepo is true
		if (onlyPublicRepo) {
			filteredRepos = filteredRepos.filter((repo) => !repo.private);
		}
    userStore.update((n) => ({ ...n, total_repos: filteredRepos.length }));
	}
</script>

<!-- Toggle -->
<div class="form-control flex-row gap-5 mt-5">
	<label class="label cursor-pointer justify-start gap-2">
		<input type="checkbox" class="toggle" bind:checked={onlyMyRepo} on:change={updateRepoList} />
		<span class={clsx('label-text', onlyMyRepo ? 'font-bold' : 'text-gray-500')}>Only My Repo</span>
	</label>
	<label class="label cursor-pointer justify-start gap-2">
		<input type="checkbox" class="toggle" bind:checked={onlyPublicRepo} on:change={updateRepoList} />
		<span class={clsx('label-text', onlyPublicRepo ? 'font-bold' : 'text-gray-500')}>Only Public Repo</span>
	</label>
</div>

<!-- Table -->
<div class="overflow-x-auto">
	<table class="table table-xs table-pin-rows">
		<!-- head -->
		<thead>
			<tr>
				<th />
				<th>id</th>
				<th>Repo Name</th>
				<th>Is Private?</th>
				<th>Description</th>
				<th>Last Update</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each filteredRepos as row, i}
				<!-- row 1 -->
				<tr class="hover">
					<th>{i + 1}</th>
					<td>{row.id}</td>
					<td>{row.full_name}</td>
					<td>{row.private}</td>
					<td><span class="font-bold">{row.language}</span> | {row.description}</td>
					<td>{row.updated_at}</td>
					<td>Delete</td>
				</tr>
			{:else}
				<tr>
					<td colspan="100" class="text-center font-bold"> No row found</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
