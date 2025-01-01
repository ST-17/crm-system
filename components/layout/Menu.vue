<script setup lang="ts">
import { MENU_DATA } from "./menu/menu.data";

const activeMenuClasses = "dark:hover:bg-gray-700 hover:bg-gray-400 hover:shadow";
const disableMenuClasses = "dark:text-gray-600 text-gray-400";
</script>

<template>
  <ul class="flex flex-col gap-2.5">
    <li v-for="item in MENU_DATA" :key="item.url">
      <NuxtLink
        :to="item.disable ? '' : item.url"
        :class="`flex items-center py-1 px-3 rounded-lg w-full transition-all ${
          item.disable ? disableMenuClasses : activeMenuClasses
        }`"
      >
        <Icon :name="item.icon" class="mr-3" />
        <span>{{ item.name }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
