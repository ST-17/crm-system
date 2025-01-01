<script setup lang="ts">
import type { IDeal } from "~/types/deals.types";
import { defineProps } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { DB } from "~/lib/appwrite";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import { v4 as uuid } from "uuid";

interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  customer: {
    email: string;
    name: string;
  };
  status: string;
}

const props = defineProps<{
  status: string;
  refetch: () => void;
}>();

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
  initialValues: {
    status: props.status,
  },
});

const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [customerEmail, customerEmailAttrs] = defineField("customer.email");
const [customerName, customerNameAttrs] = defineField("customer.name");

const { mutate, isPending } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: (data: IDealFormState) =>
    DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
  onSuccess: async () => {
    await props.refetch();
    isFormOpen.value = false;
    handleReset();
  },
});

const onSubmit = handleSubmit((values) => {
  mutate({ ...values, price: +values.price });
});

const isFormOpen = ref(false);
</script>

<template>
  <div>
    <div class="text-center mb-2">
      <button
        class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]"
        @click="isFormOpen = !isFormOpen"
      >
        <Icon
          v-if="isFormOpen"
          name="radix-icons:arrow-up"
          class="fade-in-100 fade-out-0"
          size="35"
        />
        <Icon
          v-else
          name="radix-icons:plus-circled"
          class="fade-in-100 fade-out-0"
          size="35"
        />
      </button>
    </div>
    <form v-if="isFormOpen" @submit="onSubmit" class="form">
      <div class="flex flex-col gap-2 mb-2">
        <UiInput
          placeholder="Name"
          v-model="name"
          v-bind="nameAttrs"
          type="text"
          class="input"
        />
        <UiInput
          placeholder="Price"
          v-model="price"
          v-bind="priceAttrs"
          type="text"
          class="input"
        />
        <UiInput
          placeholder="Email"
          v-model="customerEmail"
          v-bind="customerEmailAttrs"
          type="text"
          class="input"
        />
        <UiInput
          placeholder="Company"
          v-model="customerName"
          v-bind="customerNameAttrs"
          type="text"
          class="input"
        />
      </div>

      <button class="btn" :disabled="isPending">
        {{ isPending ? "Adding..." : "Add" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}

.btn {
  @apply text-xs border py-1 px-2 rounded hover:border-[#482c65] transition-colors text-[#aebed5] dark:hover:text-white hover:text-[#161c26];
}

.form {
  @apply mb-3 block;
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }

  90% {
    @apply border-[#a252c83d];
  }

  to {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
