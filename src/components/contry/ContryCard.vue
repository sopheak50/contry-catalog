<template>
  <div class="my-2 px-2">
    <div
      v-on:click="popUpModal(true)"
      class="overflow-hidden cursor-pointer border border-gray-100 rounded-lg shadow-sm"
    >
      <img alt="Placeholder" class="block h-40 object-contain w-full" :src="contry.flags.png" />

      <div class="p-2 md:p-4">
        <div class="font-bold truncate">
          {{ contry.name.official }}
        </div>
        <p>{{ contry.cca2 }}</p>
        <p>{{ contry.cca3 }}</p>
      </div>
    </div>
  </div>

  <div
    v-if="isModalVisible"
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <img alt="Flag" class="block h-auto object-contain w-full" :src="contry.flags.png" />
          <div class="bg-white p-4">
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h1 class="text-lg font-bold text-gray-500">
                {{ contry.name.official }}
              </h1>
              <p class="text-sm text-gray-500">
                <span class="font-bold"> IDD: </span>
                <span
                  v-for="(suff, index) in contry.idd.suffixes"
                  v-bind:key="contry.idd.root + suff"
                >
                  {{ contry.idd.root + suff
                  }}{{ index < contry.idd.suffixes.length - 1 ? ', ' : '' }}
                </span>
              </p>
              <p class="text-sm text-gray-500">
                <span class="font-bold"> CCA2:</span> {{ contry.cca2 }}
              </p>
              <p class="text-sm text-gray-500">
                <span class="font-bold"> CCA3:</span> {{ contry.cca3 }}
              </p>
              <p class="text-sm text-gray-500">
                <span class="font-bold"> Alternative Spelling: </span>
                <span v-for="(spelling, index) in contry.altSpellings" v-bind:key="spelling"
                  >{{ spelling }}{{ index < contry.altSpellings.length - 1 ? ', ' : '' }}</span
                >
              </p>
              <p class="text-sm text-gray-500">
                <span class="font-bold"> Native Name:</span> {{ nativeName }}
              </p>
            </div>
          </div>
          <div class="bg-gray-50 px-4 w-full py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              v-on:click="popUpModal(false)"
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IContry } from '../../interfaces/contry'
import { ref } from 'vue'
const isModalVisible = ref(false)
const prop = defineProps(['contry'])
const contry: IContry = prop.contry
const nativeName = ref('none')

function popUpModal(isOpen?: boolean) {
  contry.flags.png = getBiggerImage(contry.flags.png)
  let nNames = objectToMap(contry.name.nativeName)
  nNames.forEach((value) => {
    nativeName.value = value.official
    return
  })
  isModalVisible.value = isOpen ?? !isModalVisible.value
}

function getBiggerImage(imageUrl: string) {
  if (imageUrl.includes('w320')) {
    return imageUrl.replace('w320', 'w1280')
  }
  return imageUrl
}

function objectToMap<K, V>(object: Record<string, V>): Map<K, V> {
  const map = new Map()
  for (const key of Object.keys(object)) {
    map.set(key, object[key])
  }
  return map
}
</script>
@/interfaces/country@/interfaces/contry