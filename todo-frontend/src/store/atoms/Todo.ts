import { Status } from "@/types/status";
import { atom } from "recoil";

export const Todo = atom({
  key: "todo",
  default: {
    id: 0,
    title: "",
    content: "",
    isStatus: Status.TODO,
    userId: 0,
  },
});
