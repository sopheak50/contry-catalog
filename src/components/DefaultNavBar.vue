<template>
  <nav
    class="fixed w-full z-10 flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-500 mb-3"
  >
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div
        class="w-30 relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start"
      >
        <p
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
        >
          contry catalog
        </p>
      </div>
      <ul class="flex flex-col sm:flex-row sm:flex-row list-none ml-auto">
        <li class="nav-item">
          <RouterLink
            to="/"
            class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
            ><span class="ml-2">Home</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
