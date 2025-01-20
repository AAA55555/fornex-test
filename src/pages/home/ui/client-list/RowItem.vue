<script setup>
import { UiInput, UiSelect } from '@/shared/ui/inputs'

const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
})

const copyData = JSON.parse(JSON.stringify(props.client))

const emit = defineEmits(['change'])

const markDirty = (id, key, value) => {
  emit('change', id, key, value)
}
</script>

<template>
  <li class="py-2">
    <div class="grid grid-cols-6 items-center gap-x-4">
      <UiInput
        v-model="copyData.name"
        @input="markDirty(copyData.id, 'name', copyData.name)"
        placeholder="Имя"
        required
      />
      <UiInput
        type="number"
        v-model="copyData.balance"
        @input="markDirty(copyData.id, 'balance', copyData.balance)"
      />
      <UiSelect
        v-model="copyData.archived"
        @change="markDirty(copyData.id, 'archived', copyData.archived)"
        :options="[
          { value: false, label: 'Рабочий' },
          { value: true, label: 'Архив' },
        ]"
      />
      <div>
        <span
          >{{ props.client?.createdAt }} /<br />
          {{ props.client?.updatedAt }}</span
        >
      </div>
      <div>
        <UiInput
          v-model="copyData.address.country"
          @input="markDirty(copyData.id, 'address', copyData.address)"
          placeholder="Страна"
        />
        <UiInput
          v-model="copyData.address.street"
          @input="markDirty(copyData.id, 'address', copyData.address)"
          placeholder="Улица"
        />
        <UiInput
          v-model="copyData.address.office"
          @input="markDirty(copyData.id, 'address', copyData.address)"
          placeholder="Офис"
        />
        <UiInput
          v-model="copyData.address.index"
          @input="markDirty(copyData.id, 'address', copyData.address)"
          placeholder="Индекс"
        />
      </div>
      <div>
        <UiInput
          type="email"
          placeholder="Email"
          v-model="copyData.contacts.email"
          @input="markDirty(copyData.id, 'contacts', copyData.contacts)"
        />
        <UiInput
          type="phone"
          v-model="copyData.contacts.phone"
          placeholder="Телефон"
          @input="markDirty(copyData.id, 'contacts', copyData.contacts)"
        />
      </div>
    </div>
  </li>
</template>
