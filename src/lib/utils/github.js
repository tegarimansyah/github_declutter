import axios from "axios"
import { get } from 'svelte/store';
import {patStore} from '$lib/utils/store'


const instance = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Accept: "application/vnd.github+json",
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: ""
    }
})

// Function to update the Authorization header with the latest patStore value
function updateAuthorizationHeader() {
    const patValue = get(patStore);
    instance.defaults.headers.Authorization = `Bearer ${patValue}`;
}

// Subscribe to the patStore and update the Authorization header whenever it changes
const unsubscribe = patStore.subscribe(updateAuthorizationHeader);

// Call updateAuthorizationHeader initially to set the initial value
updateAuthorizationHeader();

export const github = instance