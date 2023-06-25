<script lang="ts">
	import { userStore, fetchingRepoStore } from '$lib/utils/store';

	function split_date(datestr: string | undefined) {
		if (datestr !== undefined) {
			return datestr.split('T')[0];
		} else {
			return 'undefined';
		}
	}
</script>

<div class="flex items-center">
	<div class="min-w-0 flex-1 flex items-center">
		<div class="flex-shrink-0">
			<img class="h-12 w-12 rounded-t-lg" src={$userStore.avatar_url} alt="" />
		</div>
		<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
			<div>
				<p class="text-sm font-medium text-indigo-600 truncate">
					<a href={$userStore.html_url}>
						{$userStore.name}
						({$userStore.login})
					</a>
				</p>
				<p class="mt-2 flex items-center text-sm text-gray-500">
					<span class="truncate">{$userStore.total_repos} Repo(s)</span>
					{#if $fetchingRepoStore === true}
						<span class="ml-1"> - Fetching in progress to get private repo count</span>
					{/if}
				</p>
			</div>
			<div class="hidden md:block">
				<div>
					<p class="text-sm text-gray-900">
						Join at
						<time datetime={split_date($userStore.created_at)}>{split_date($userStore.created_at)}</time>, Last Activity
						at
						<time datetime={split_date($userStore.updated_at)}>{split_date($userStore.updated_at)}</time>.
					</p>
					<p class="mt-2 flex items-center text-sm text-gray-500">
						<a href={$userStore.blog}>
							{$userStore.blog}
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
