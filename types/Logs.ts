import { MessCard } from "./Card";

export interface Student {
  id: number;
  email: string;
  name?: string;
  photo?: string;
}

export interface Log {
  id?: number;
  timestamp?: Date;
  success: boolean;
  detail: string;
  mess_card: MessCard;
  student: Student;
}
