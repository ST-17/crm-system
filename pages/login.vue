<script setup lang="ts">
import { account } from "~/lib/appwrite";
import { v4 as uuid } from "uuid";

const INITIAL_ERRORS = {
  email: "",
  password: "",
  name: "",
};

useHead({
  title: "Login | CRM System",
});

const email = ref("");
const password = ref("");
const name = ref("");

const loadingStore = useLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const errors = ref({ ...INITIAL_ERRORS });
const errorText = ref("");

const isLoginCard = ref(true);
const isAuthLoading = ref(false);

const validateFields = (fields: {
  email: string;
  password: string;
  name?: string;
}) => {
  const newErrors = { ...INITIAL_ERRORS };
  if (!fields.email.trim()) newErrors.email = "Must be filled!";
  if (!fields.password.trim()) newErrors.password = "Must be filled!";
  if (fields.name !== undefined && !fields.name.trim())
    newErrors.name = "Must be filled!";
  return newErrors;
};

const parseError = (error: any): Partial<typeof INITIAL_ERRORS> => {
  if (error?.message.includes("`email`")) {
    const msg = error?.message.split(": ");
    return { email: msg[1] ?? "Invalid Email" };
  }
  if (error?.message.includes("`password`")) {
    const msg = error?.message.split(": ");
    return { password: msg[1] ?? "Invalid Password" };
  }
  return {};
};

const login = async () => {
  errorText.value = "";
  errors.value = validateFields({
    email: email.value,
    password: password.value,
  });
  if (Object.values(errors.value).some((val) => val)) return;

  isAuthLoading.value = true;
  try {
    await account.createEmailPasswordSession(email.value, password.value);
    loadingStore.set(true);
    const response = await account.get();

    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status,
      });
      await router.push("/");
    }

    resetForm();
  } catch (error) {
    errors.value = { ...errors.value, ...parseError(error) };
    if (!Object.values(errors.value).some((val) => val)) {
      errorText.value = error?.message ?? "Invalid credentials";
    }
  } finally {
    isAuthLoading.value = false;
    loadingStore.set(false);
  }
};

const register = async () => {
  errorText.value = "";
  errors.value = validateFields({
    email: email.value,
    password: password.value,
    name: name.value,
  });
  if (Object.values(errors.value).some((val) => val)) return;

  isAuthLoading.value = true;
  try {
    await account.create(uuid(), email.value, password.value, name.value);
    await login();
  } catch (error) {
    errors.value = { ...errors.value, ...parseError(error) };
    if (!Object.values(errors.value).some((val) => val)) {
      errorText.value = error?.message ?? "Invalid credentials";
    }
  } finally {
    isAuthLoading.value = false;
  }
};

const resetForm = () => {
  email.value = "";
  password.value = "";
  name.value = "";
};

const toggleAuthCard = () => {
  errors.value = { ...INITIAL_ERRORS };
  errorText.value = "";
  isLoginCard.value = !isLoginCard.value;
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">
        {{ isLoginCard ? "Login" : "Register" }}
      </h1>

      <form>
        <div class="flex flex-col gap-3 mb-3">
          <UiInput
            v-model="email"
            placeholder="Email"
            type="email"
            :invalid="errors.email"
          />
          <UiInput
            v-model="password"
            placeholder="Password"
            type="password"
            :invalid="errors.password"
          />
          <UiInput
            v-if="!isLoginCard"
            v-model="name"
            placeholder="Name"
            :invalid="errors.name"
          />
        </div>

        <span v-if="!!errorText" class="text-xs text-red-500">{{
          errorText
        }}</span>

        <div class="flex items-center justify-center gap-5">
          <UiButton v-if="isLoginCard" type="button" @click="login">{{
            isAuthLoading ? "Logging..." : "Login"
          }}</UiButton>
          <UiButton v-else type="button" @click="register">{{
            isAuthLoading ? "Registering..." : "Register"
          }}</UiButton>
        </div>

        <p v-if="isLoginCard" class="text-center mt-5">
          Don't have an account?
          <span
            class="text-blue-500 cursor-pointer underline"
            @click="toggleAuthCard"
            >Register here</span
          >
        </p>
        <p v-else class="text-center mt-5">
          Already have an account?
          <span
            class="text-blue-500 cursor-pointer underline"
            @click="toggleAuthCard"
            >Sign in</span
          >
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
