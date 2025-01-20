import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { clients as clientsData } from '../model/mock-clients.data.js'

export const useClientsStore = defineStore('clients', () => {
  const clients = reactive(structuredClone(clientsData))

  return {
    clients,
  }
})
