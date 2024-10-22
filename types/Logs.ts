import { MessCard } from "./Card";

export interface Log {
  id?: number;
  timestamp?: Date;
  success: boolean;
  detail: string;
  mess_card: MessCard;
}
