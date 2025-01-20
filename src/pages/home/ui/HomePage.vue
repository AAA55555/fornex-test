<script setup>
import { UiButton } from '@/shared/ui/button'
import ClientList from './client-list/ClientList.vue'
import { useClientsStore, sortedClients, searchClients, filterArchivedClients } from '../model'
import { useClient } from '../lib/use'
import { computed, ref } from 'vue'
import { UiInput } from '@/shared/ui/inputs'
import { useDebounce } from '@/shared/lib/use/index.js'
import AppCheckbox from '@/pages/home/ui/AppCheckbox.vue'

const clientsStore = useClientsStore().clients
const client = useClient()

const updateClient = client.updateData
const saveChanges = client.saveChanges
const createClient = client.createClient

const isSorted = ref(false)
const hideArchivedClients = ref(false)
const searchEl = ref('')
const filteredClients = ref(clientsStore)

const debouncedSearchClients = useDebounce((query) => {
  const searchedClients = query ? searchClients(clientsStore, query) : clientsStore

  filteredClients.value = filterArchivedClients(searchedClients, hideArchivedClients.value)
}, 300)

const clientsData = computed(() => {
  if (searchEl.value) debouncedSearchClients(searchEl.value)

  const visibleClients = hideArchivedClients.value
    ? filterArchivedClients(filteredClients.value)
    : filteredClients.value

  return isSorted.value ? sortedClients(visibleClients) : visibleClients
})
</script>

<template>
  <div class="container my-10">
    <h1 class="mb-4">Список клиентов с полями</h1>
    <template v-if="Array.isArray(clientsData)">
      <div class="space-y-4">
        <AppCheckbox v-model="isSorted">Сортировать по имени и балансу</AppCheckbox>
        <AppCheckbox v-model="hideArchivedClients">Скрыть архивные</AppCheckbox>
        <label class="inline-block w-4/12">
          <UiInput
            v-model="searchEl"
            placeholder="Поиск"
            type="search"
            class="rounded-md !bg-gray-300 px-3 py-1.5"
          />
        </label>
      </div>
      <template v-if="clientsData">
        <ClientList :data="clientsData" @change="updateClient" />
        <div class="space-x-2">
          <UiButton @click="createClient" class="mt-4">Создать клиента</UiButton>
          <UiButton @click="saveChanges" class="mt-4">Сохранить</UiButton>
        </div>
      </template>
    </template>
    <div v-else>Произошла ошибка</div>
  </div>
</template>
