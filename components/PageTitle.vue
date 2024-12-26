<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  label?: string;
}>();
</script>

<template>
  <h1 class="font-bold text-2xl mb-10">{{ label ?? ''}}</h1>
</template>

<style scoped lang="scss"></style>
