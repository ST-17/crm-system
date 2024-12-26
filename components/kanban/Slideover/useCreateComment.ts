import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";
import { COLLECTION_COMMENTS, DB_ID } from "~/app.constants";
import { DB } from "~/lib/appwrite";

export function useCreateComment({ refetch }: { refetch: () => void }) {
  const store = useDealSlideStore();
  const commentRef = ref<string>();
  const isCommentLoading = ref(false);

  const { mutate } = useMutation({
    mutationKey: ["add comments", commentRef.value],
    mutationFn: () => {
      isCommentLoading.value = true;
      return DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
        text: commentRef.value,
        deal: store.card?.id,
      });
    },
    onSuccess: async () => {
      await refetch();
			isCommentLoading.value = false;
      commentRef.value = "";
    },
  });

  const writeComment = () => {
    if (!commentRef.value) return;
    mutate();
  };

  return {
    writeComment,
    commentRef,
		isCommentLoading
  };
}
