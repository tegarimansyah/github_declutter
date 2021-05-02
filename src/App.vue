<template>
  <div>
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 class="text-lg leading-6 font-semibold text-gray-900">
          Github Declutter
        </h1>
      </div>
    </header>
    <main>

      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-4 sm:px-0">
          <Info />
          <div class="mb-10">
              <input v-model="username" ref="username" type="text" name="username" id="username" autocomplete="off" class="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 lg:text-lg sm:text-sm border-gray-300 rounded-md mr-5" placeholder="Github Username" />
              <input v-model="token" ref="token" type="password" name="token" id="token" autocomplete="off" class="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 lg:text-lg sm:text-sm border-gray-300 rounded-md mr-5" placeholder="Github Token" />
              <button class="mt-3 p-2 shadow-sm  lg:text-lg sm:text-sm border-gray-500 rounded-md border-2" v-on:click="get_data">Fetch Data</button>
          </div>
          <UserProfile v-if="profile" :userProfile="profile" />

          <Table v-if="listRepo.length > 0" :listRepo="listRepo" />
        </div>
        
      </div>
    </main>
  </div>
  
  
</template>

<script setup>
import Table from './components/Table.vue'
import UserProfile from './components/UserProfile.vue'
import Info from './components/Info.vue'
import axios from 'axios';
</script>

<script>

export default {
  data() {
    return {
      username: '',
      token: '',
      profile: null,
      listRepo: [],
      BASE_URL: import.meta.env.VITE_GITHUB_BASE_URL
    }
  },
  methods: {
    get_data() {
      this.get_profile(this.username, this.token);
      this.get_all_repo(this.username, this.token)
    },
    get_profile(username, password) {
      const url = this.BASE_URL + `/user`
      this.fetch_data(url, {username, password}).then(
        (response) => {
          const data  = response.data
          this.profile = {
              name: data.name,
              username: data.login,
              imageUrl: data.avatar_url,
              href: data.html_url,
              dateJoin: data.created_at,
              dateLastActivity: data.updated_at,
              numRepos: data.public_repos,
              blogUrl: data.blog,
          }
        }
      )
    },
    get_all_repo(username, password, page=1) {
      const url = this.BASE_URL + `/user/repos?per_page=100&sort=updated&direction=asc&username=${username}&page=${page}`
      this.fetch_data(url, {username, password}).then(
        (response) => {
          response.data.forEach(data => {
            this.listRepo.push(
              {
                name: data.full_name,
                href: data.html_url,
                private: data.private,
                description: data.description,
                language: data.language,
                lastUpdate: data.updated_at
              }) // end of push
          });

          console.log(response)

          try {
            console.log(response.headers['link'])
            const next_page = response.headers['link'].match(/&page=(\d+)>; rel="next".*$/)[1]
            this.get_all_repo(username, password, next_page)
          }
          catch {
            console.log(response.headers['link'])
            this.profile.numRepos = this.listRepo.length
            console.log(`Fetching ${this.listRepo.length} Repo(s)`)
          }

        }
      )

    },
    async fetch_data(url, auth) {
      return axios.get(url, {
        auth: auth
      })
    }

  }
}
</script>

<style>
body {
  @apply bg-white;
}
</style>
