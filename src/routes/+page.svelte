<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Info from '$lib/components/Info.svelte';
	import Auth from '$lib/components/Auth.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import Repos from '$lib/components/Repos.svelte';

	import { userStore } from '$lib/utils/store';
</script>

<div>
	<Navbar />

	<main class="max-w-7xl min-h-screen mx-auto py-6 sm:px-6 lg:px-8">
		{#if Object.keys($userStore).length === 0}
			<Info />
			<Auth />


		{:else}
			<Profile />
			<Repos />

		{/if}
	</main>
</div>
