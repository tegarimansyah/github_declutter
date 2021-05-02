<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white overflow-hidden sm:rounded-t-md">
    <ul class="divide-y divide-gray-200">
      <li>
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="min-w-0 flex-1 flex items-center">
              <div class="flex-shrink-0">
                <img class="h-12 w-12 rounded-t-lg" :src="userProfile.imageUrl" alt="" />
              </div>
              <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p class="text-sm font-medium text-indigo-600 truncate">
                  <a :href="userProfile.href">
                      {{ userProfile.name }} ({{ userProfile.username }})
                  </a>
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500">
                    <span class="truncate">{{ userProfile.numRepos }} Repo(s)</span>
                  </p>
                </div>
                <div class="hidden md:block">
                  <div>
                    <p class="text-sm text-gray-900">
                      Join at {{ ' ' }}
                      <time :datetime="split_date(userProfile.dateJoin)">{{ split_date(userProfile.dateJoin) }}</time>,
                      Last Activity at {{ ' ' }}
                      <time :datetime="split_date(userProfile.dateLastActivity)">{{ split_date(userProfile.dateLastActivity) }}</time>.
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500">
                    <a :href="userProfile.blogUrl">
                      {{ userProfile.blogUrl }}
                    </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: ['userProfile'],
  methods: {
      split_date(datestr) {
          return datestr.split("T")[0]

      }
  }
}
</script>