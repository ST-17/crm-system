<script setup lang="ts">
import { useDealSlideStore } from "~/store/deal-slide.store";
import { useComments } from "./useComments";
import { useCreateComment } from "./useCreateComment";
import type { IDeal } from "~/types/deals.types";
import dayjs from "dayjs";

const dealSlideStore = useDealSlideStore();

const { data, refetch, isLoading } = useComments();
const { commentRef, writeComment, isCommentLoading } = useCreateComment({
  refetch,
});

const card = data as unknown as IDeal;
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <UiInput
        placeholder="Leave a comment"
        v-model="commentRef"
        @keyup.enter="writeComment"
        :disabled="isCommentLoading"
      />

        <Icon v-if="isCommentLoading" name="tabler:loader" class="spin" size="25" />
    </div>
    <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />
    <p
      v-else-if="card.comments.length === 0"
      class="text-xs mt-3 ml-3 text-muted-foreground"
    >
      No comments.
    </p>
    <div v-else class="card">
      <div
        v-for="comment in card.comments"
        :key="comment.$id"
        class="flex items-start mt-5"
      >
        <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="25" />
        <div class="border-border bg-black/20 rounded p-3 w-full">
          <div class="mb-2 text-xs">
            {{ dayjs(comment.$createdAt).format("DD MMMM HH:mm") }}
          </div>
          <p class="text-sm">{{ comment.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
