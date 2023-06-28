import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store'
import type { UserType } from "$lib/types/User"
import type { Repo } from '$lib/types/Repos';


export const userStore: Writable<Partial<UserType>> = writable({})
export const patStore = writable("")
export const fetchingRepoStore = writable(true)
export const repoStore: Writable<Array<Repo>> = writable([])