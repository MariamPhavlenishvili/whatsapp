import { Message } from "@/interfaces/messages.interface";
import { Users } from "@/interfaces/users.interface";

export const generateId = (arr: Message[] | Users[]) => {
  return (arr.length + 1).toString();
};
