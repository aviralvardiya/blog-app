import { atom } from "recoil";

export const userInfoAtom = atom({
  key: "userInfoAtom",
  default: {
    id:"",
    name:"",
    email:""
  },
});