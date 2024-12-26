<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  labelText: string;
}>();
</script>

<template>
  <div class="mb-3">
    <label v-if="props.labelText" class="opacity-75 mb-0.5 block text-xs">
      {{ props.labelText }}
    </label>

    <div class="text-sm"><slot /></div>
  </div>
</template>

<style scoped lang="scss"></style>
