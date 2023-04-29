import { atom } from "recoil";

export const User = atom({
  key: "user",
  default: {
    id: null,
    email: "",
    userName: "",
  },
});
