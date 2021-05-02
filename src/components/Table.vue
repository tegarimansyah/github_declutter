<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div id="control" class="my-5 flex gap-5">
          <Toggle :title="'Only My Repo'" />
          <Toggle :title="'Only Public Repo'" />
        </div>
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Repo Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Is Private?
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(repo, repoIdx) in listRepo" :key="repo" :class="repoIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <a :href="repo.href" class="hover:text-indigo-400">
                  {{ repo.name }}
                  </a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ repo.private }}
                </td>
                <td class="px-6 py-4 whitespace text-sm text-gray-500 wrap max-w-md overflow-x-hidden">
                  <span class="font-bold">{{repo.language }}</span> | {{ repo.description }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ repo.lastUpdate }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button v-on:click="delete_repo(repo, repoIdx)" class="text-indigo-600 hover:bg-black hover:text-white">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import Toggle from './Toggle.vue'
</script>

<script>
export default {
  props: ['listRepo'],
  data() {
    return {
      BASE_URL: import.meta.env.VITE_GITHUB_BASE_URL
    }
  },
  methods: {
    delete_repo(repo, repoIdx) {
      const response = confirm(`Delete ${repo.name}?`)
      if (response) {
        const url = this.BASE_URL + `/repos/${repo.name}`
        console.log(`${repo.name} deleted`)
        // axios.delete(
        //   url, {
        //     auth: {
        //       username: username, // TODO get from vuex state
        //       token: token // TODO get from vuex state
        //     }
        //   }
        // )
        this.listRepo.splice(repoIdx, 1)
      }
    }
  }
}
</script>