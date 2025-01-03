import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import { KANBAN_DATA } from "~/components/kanban/kanban.data";
import { DB } from "~/lib/appwrite";
import type { IDeal } from "~/types/deals.types";
import type { ICard } from "~/types/kanban.types";

export function useKanbanQuery() {
  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
    select: (data) => {
      const newBoard = KANBAN_DATA.map((column) => ({
        ...column,
        items: [] as ICard[],
      }));

      const deals = data.documents as unknown as IDeal[];

      for (const deal of deals) {
        const column = newBoard.find((column) => column.id === deal.status);

        if (column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            id: deal.$id,
            name: deal.name,
            price: deal.price,
            companyName: deal.customer.name,
            status: deal.status,
          });
        }
      }
      console.log(newBoard);
      return newBoard;
    },
  });
}
