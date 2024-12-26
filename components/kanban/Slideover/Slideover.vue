<script setup lang="ts">
import { computed } from "vue";
import { useDealSlideStore } from "~/store/deal-slide.store";

const dealSlideStore = useDealSlideStore();

const isLocalOpen = computed({
  get: () => dealSlideStore.isOpen,
  set: (value: boolean) => (dealSlideStore.isOpen = value),
});
</script>

<template>
  <div>
    <USlideover v-model="isLocalOpen">
      <UCard
        class="flex flex-col flex-1 overflow-y-auto"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-border',
        }"
      >
        <template #header>
          <KanbanSlideoverTop />
        </template>

        <KanbanSlideoverComments />
      </UCard>
    </USlideover>
  </div>
</template>

<style scoped></style>
