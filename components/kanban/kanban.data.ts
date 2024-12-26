import { EnumStatus } from "~/types/deals.types";
import type { IColumn } from "~/types/kanban.types";

export const KANBAN_DATA: IColumn[] = [
  {
    id: EnumStatus.todo,
    name: "Todo",
    items: [],
  },
  {
    id: EnumStatus["to-be-agreed"],
    name: "To be agreed",
    items: [],
  },
  {
    id: EnumStatus["in-progress"],
    name: "In progress",
    items: [],
  },
  {
    id: EnumStatus["produced"],
    name: "Produced",
    items: [],
  },
  {
    id: EnumStatus["done"],
    name: "Done",
    items: [],
  },
];
