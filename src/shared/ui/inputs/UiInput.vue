<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const model = defineModel()
</script>

<template>
  <input
    :type="props.type"
    v-model="model"
    :placeholder
    :required
    class="w-full border border-none bg-transparent px-1 outline-none"
  />
</template>
