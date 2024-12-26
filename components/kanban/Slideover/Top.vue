<script setup lang="ts">
import dayjs from "dayjs";
import { convertCurrency } from "~/helpers/convertCurrency";
import { useDealSlideStore } from "~/store/deal-slide.store";

const dealSlideStore = useDealSlideStore();
</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-base mb-4">About deal</div>
    <KanbanSlideoverLabel labelText="Name"
      ><h2>{{ dealSlideStore.card?.name }}</h2></KanbanSlideoverLabel
    >
    <KanbanSlideoverLabel labelText="Price">{{
      convertCurrency(dealSlideStore.card?.price || 0)
    }}</KanbanSlideoverLabel>
    <KanbanSlideoverLabel labelText="Status">
      <UiBagde variant="outline">{{ dealSlideStore.card?.status }}</UiBagde>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel labelText="Client">
      {{ dealSlideStore.card?.companyName }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel labelText="Created date">
      {{ dayjs(dealSlideStore.card?.$createdAt).format("DD MMMM YYYY") }}
    </KanbanSlideoverLabel>
  </div>
</template>

<style scoped lang="scss"></style>
