<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from "~/app.constants";
import { DB, storage } from "~/lib/appwrite";
import type { ICustomer } from "~/types/deals.types";
import { useQueryClient } from "@tanstack/vue-query";

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

useHead({
  title: "Edit Customer | CRM System",
});

const route = useRoute();

interface ICustomerFormState
  extends Pick<ICustomer, "avatar_url" | "email" | "name" | "from_source"> {}

const { handleSubmit, defineField, setFieldValue, setValues, values } =
  useForm<ICustomerFormState>();

const customerId = route.params.id as string;
const { data, isSuccess, isLoading } = useQuery({
  queryKey: ["get customer", customerId],
  queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),
});
const queryClient = useQueryClient();

watch(isSuccess, () => {
  const initialData = data.value as unknown as ICustomerFormState;
  setValues({
    email: initialData.email,
    avatar_url: initialData.avatar_url,
    from_source: initialData.from_source || "",
    name: initialData.name,
  });
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [fromSource, fromSourceAttrs] = defineField("from_source");

const { mutate, isPending } = useMutation({
  mutationKey: ["update customer", customerId],
  mutationFn: (data: ICustomerFormState) =>
    DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data),
});

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
  mutationKey: ["upload image"],
  mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
  onSuccess(data) {
    const response = storage.getFileDownload(STORAGE_ID, data.$id);
    setFieldValue("avatar_url", response);
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});

onUnmounted(() => {
  queryClient.removeQueries({
    queryKey: ["get customer", customerId],
    exact: true,
  });
});
</script>

<template>
  <div class="p-10">
    <div v-if="isLoading" class="w-full mt-12 flex items-center justify-center">
      <Icon name="tabler:loader" class="spin" size="55" />
    </div>
    <div v-else>
      <page-title :label="(data as unknown as ICustomerFormState)?.name" />
      <form @submit="onSubmit" class="form">
        <UiInput
          placeholder="Name"
          v-model="name"
          v-bind="nameAttrs"
          type="text"
          class="input"
        />

        <UiInput
          placeholder="Email"
          v-model="email"
          v-bind="emailAttrs"
          type="text"
          class="input"
        />
        <UiInput
          placeholder="From?"
          v-model="fromSource"
          v-bind="fromSourceAttrs"
          type="text"
          class="input"
        />

        <img
          v-if="values.avatar_url || isUploadImagePending"
          :src="values.avatar_url"
          alt=""
          width="50"
          height="50"
          class="rounded-full my-4"
        />
        <div class="grid w-full max-w-sm items-center gap-1.5 input">
          <label>
            <div class="text-sm mb-2">Logo</div>
            <UiInput
              type="file"
              :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
              :disabled="isUploadImagePending"
            />
          </label>
        </div>

        <UiButton :disabled="isPending" variant="secondary" class="mt-3">
          {{ isPending ? "Загрузка..." : "Сохранить" }}
        </UiButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-4 placeholder:text-[#748092] focus:border-border transition-colors;
}

.spin {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
