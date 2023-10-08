<script setup lang="ts">
import { ref, watch } from 'vue'
import ContryCard from '@/components/contry/ContryCard.vue'
import ErrorLabel from '@/components/ErrorLabel.vue'
import LoadingSping from '@/components/LoadingSping.vue'
import Fuse from 'fuse.js'
import type { IContry, IPagination } from '@/interfaces/Country'

enum sortDirection {
  Ascending = 'asc',
  Descending = 'desc'
}

let error = ref('')
const loading = ref(true)
let contries = ref<IContry[]>()

const sortDir = ref<sortDirection>(sortDirection.Ascending)
const search = ref('')
const currentContries = ref<IContry[]>()
const displayContries = ref<IContry[]>()
const pagination = ref<IPagination>({
  page: 0,
  pageSize: 25,
  hasNex: false,
  hasPre: false,
  totalItem: 0,
  totalPages: 0
})

fetchData()

function fetchData() {
  fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3,altSpellings,idd')
    .then((res) => res.json())
    .then((data) => {
      loading.value = false
      contries.value = sortContryList(data)
      goToPage(1, contries.value)
    })
    .catch((err) => (error.value = err))
}

function sortContryList(listContry?: IContry[]): IContry[] {
  if (listContry == undefined) return []
  return listContry.sort((c, c1) => {
    const name = c.name.official.toUpperCase()
    const name1 = c1.name.official.toUpperCase()
    const compare = (name: string, name1: string) => {
      if (name > name1) {
        return 1
      }
      if (name < name1) {
        return -1
      }
      return 0
    }
    var result = compare(name, name1)
    if (sortDir.value == sortDirection.Descending && result != 0) {
      return result * -1
    }
    return result
  })
}

function setCurrentItems(listContry?: IContry[]) {
  if (listContry == undefined) return
  const endIndex = pagination.value.page * pagination.value.pageSize
  const startIndex = endIndex - pagination.value.pageSize
  displayContries.value = listContry.slice(startIndex, endIndex)
}

function goToPage(index: number, listContry?: IContry[]) {
  // if no listContry passed, use the current contry list
  currentContries.value = listContry ?? currentContries.value
  if (currentContries.value == undefined) return
  let totalPages = currentContries.value.length / pagination.value.pageSize
  if (currentContries.value.length % pagination.value.pageSize != 0) {
    totalPages = Math.floor(totalPages) + 1
  }
  if (index < 1 && index > totalPages) return
  pagination.value.page = index
  pagination.value.hasNex = index < totalPages
  pagination.value.hasPre = index > 1
  pagination.value.totalItem = currentContries.value.length
  pagination.value.totalPages = totalPages
  setCurrentItems(currentContries.value)
}

watch(search, () => {
  clearTimeout(1000)
  setTimeout(() => {
    if (search.value) {
      const fuse = new Fuse(contries.value!, {
        keys: ['name.official']
      })
      let searchedItems = fuse.search(search.value)
      var result: IContry[] = []
      searchedItems.forEach((country) => {
        result.push(country.item)
      })
      goToPage(1, result)
    } else {
      goToPage(1, contries.value)
    }
  }, 1000)
})

watch(sortDir, () => {
  goToPage(1, sortContryList(contries.value))
})

const isModalVisible = ref(true)
function popUpModal(isOpen?: boolean) {
  console.log('hhaha', isOpen)
  isModalVisible.value = isOpen ?? !isModalVisible.value
}
</script>

<template>
  <div class="container pt-20 mx-auto px-4 md:px-12">
    <ErrorLabel v-if="error" :error="error" />

    <div class="my-3 w-full">
      <input
        v-model="search"
        type="text"
        placeholder="Search contry name..."
        class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border border-2 border-gray-300 shadow outline-none focus:outline-none focus:ring w-full"
      />
    </div>

    <div class="flex w-full">
      <select
        id="countries"
        v-model="sortDir"
        class="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
      >
        <option selected :value="sortDirection.Ascending">Ascending</option>
        <option :value="sortDirection.Descending">Descending</option>
      </select>
      <div class="ml-auto flex pt-2">
        <button
          v-on:click="goToPage(pagination.page - 1)"
          :disabled="!pagination.hasPre"
          :class="{ 'opacity-4 cursor-not-allowed': !pagination.hasPre }"
          class="flex items-center justify-right px-3 h-8 font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </button>
        <h2 class="p-1">{{ pagination.page }}/{{ pagination.totalPages }}</h2>
        <button
          v-on:click="goToPage(pagination.page + 1)"
          :disabled="!pagination.hasNex"
          :class="{ 'opacity-4 cursor-not-allowed': !pagination.hasNex }"
          class="flex items-center justify-center px-3 h-8 ml-3 font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>

    <LoadingSping v-if="loading" />

    <div class="container mb-12 min-h-screen">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">
        <div
          v-for="contry in displayContries"
          v-bind:key="contry.cca3"
          class="w-full mb-4 sm:w-1/2 md:w-1/3 lg:w-1/5"
        >
          <ContryCard :contry="contry"></ContryCard>
        </div>
        <div v-if="displayContries?.length == 0" class="m-auto p-20">
          <h1>No content</h1>
        </div>
      </div>
    </div>

    <!-- Modal -->
  </div>
</template>
@/interfaces/country@/interfaces/contry