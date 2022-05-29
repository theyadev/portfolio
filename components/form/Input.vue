<script setup lang="ts">
type Props = {
    disabled: boolean;
    value: any;
    type: string;
    placeholder: string;
    required:boolean;
    name: string,
}

const props = defineProps<Props>()
const emit = defineEmits(["update"])

function updateValue(e) {
    emit("update", e.target.value)
}
</script>


<template>
  <input
    class="focus-visible:outline-none bg-white px-4 py-2 text-black rounded disabled:cursor-default disabled:pointer-events-none disabled:text-gray-500 peer"
    :placeholder="placeholder"
    :type="type"
    :id="name"
    :name="name"
    :required="required"
    :value="props.value"
    :disabled="props.disabled"
    @input="updateValue"
  />
</template>
