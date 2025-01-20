<script setup>
import RowItem from './RowItem.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['change'])

const markDirty = (id, key, value) => {
  emit('change', id, key, value)
}
</script>

<template>
  <ul class="divide-y-2 overflow-hidden rounded-md">
    <RowItem @change="markDirty" :client="client" v-for="client in props.data" :key="client.id" />
  </ul>
</template>
