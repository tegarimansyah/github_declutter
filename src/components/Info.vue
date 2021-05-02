<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="rounded-md bg-blue-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <InformationCircleIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
      </div>
      <div class="ml-3 flex-1 ">
        <p class="text-sm text-blue-700">
          Get Personal Access Token here: <a class="hover:text-blue-300" href="https://github.com/settings/tokens">https://github.com/settings/tokens</a>
        </p>
        <p class="text-sm text-blue-700">
          Scope: repo, gist, delete_repo
        </p>
        <p class="mt-3">We are not saving your data. All process is only between your own browser with Github API.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { InformationCircleIcon } from '@heroicons/vue/solid'

export default {
  components: {
    InformationCircleIcon,
  },
}
</script>