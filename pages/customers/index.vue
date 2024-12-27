<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_CUSTOMERS, DB_ID } from "~/app.constants";
import { DB } from "~/lib/appwrite";
import type { ICustomer } from "~/types/deals.types";

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: "Customers | CRM System",
});

const customers = ref<ICustomer[]>([])

const { data, isLoading } = useQuery({
  queryKey: ["customers"],
  queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
  select(data) {
    customers.value = data?.documents as unknown as ICustomer[];
  },
});
</script>

<template>
  <div class="p-10">
    <page-title label="Our customers"/>
    <div v-if="isLoading">Loading...</div>

    <UiTable v-else>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-1/4">Logo</UiTableHead>
          <UiTableHead class="w-1/4">Name</UiTableHead>
          <UiTableHead class="w-1/4">Email</UiTableHead>
          <UiTableHead class="w-1/4">Came from</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow v-for="customer in customers" :key="customer.$id">
          <UiTableCell>
            <NuxtLink :href="`/customers/edit/${customer.$id}`">
              <img
                :src="customer.avatar_url"
                :alt="customer.name"
                :style="{width: '50px', height: '50px'}"
                class="rounded-full"
              />
            </NuxtLink>
          </UiTableCell>
          <UiTableCell class="font-medium">
            {{ customer.name }}
          </UiTableCell>
          <UiTableCell>{{ customer.email }}</UiTableCell>
          <UiTableCell>{{ customer.from_source }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </div>
</template>

<style scoped lang="scss"></style>
