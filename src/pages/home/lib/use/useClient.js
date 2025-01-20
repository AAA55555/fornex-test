import { computed, reactive, ref } from 'vue'
import { useClientsStore } from '../../model'

/**
 * @description
 * Provides functions to work with clients data.
 *
 * @returns {{ changedDataClient: Ref<Map<number, { id: number, [key: string]: unknown }>>, isChangedData: ComputedRef<boolean>, saveChanges: () => void, createClient: () => void, updateData: (id: number, key: string, value: unknown) => void }}
 */
export function useClient() {
  const formattedDate = new Date().toISOString().split('T')[0]
  const clientsData = useClientsStore().clients
  const changedDataClient = ref(new Map())

  const updateData = (id, key, value) => {
    if (!changedDataClient.value.has(id)) {
      changedDataClient.value.set(id, { id })
    }
    const changes = changedDataClient.value.get(id)
    changes[key] = value
    changedDataClient.value.set(id, changes)

    const clientIndex = clientsData.findIndex((client) => client.id === id)
    if (clientIndex !== -1) {
      clientsData[clientIndex] = {
        ...clientsData[clientIndex],
        [key]: value,
      }
    }
  }

  const newClient = reactive(new Map())

  const isChangedData = computed(() => newClient.size === 0 && changedDataClient.value.size === 0)

  const saveChanges = () => {
    if (isChangedData.value) return
    console.log(changedDataClient.value)
    const changedClients = Array.from(changedDataClient.value.values()).map((client) => ({
      ...client,
      updatedAt: formattedDate,
    }))

    changedClients.forEach((changedClient) => {
      const clientIndex = clientsData.findIndex((client) => client.id === changedClient.id)
      if (clientIndex !== -1) {
        clientsData[clientIndex] = {
          ...clientsData[clientIndex],
          ...changedClient,
        }
      }
    })

    console.log('Изменённые данные для отправки:', changedClients)
    changedDataClient.value.clear()
    console.log('Обновленные клиенты:', clientsData)
  }

  const createClient = () => {
    const emptyTemplateClient = {
      id: clientsData.length + 1,
      name: '',
      balance: 0,
      createdAt: formattedDate,
      updatedAt: formattedDate,
      archived: false,
      address: {
        country: '',
        index: '',
        street: '',
        office: '',
      },
      contacts: {
        phone: '',
        email: '',
      },
    }
    clientsData.push(emptyTemplateClient)
    newClient.set(emptyTemplateClient.id, emptyTemplateClient)
  }

  return {
    changedDataClient,
    isChangedData,
    saveChanges,
    createClient,
    updateData,
  }
}
