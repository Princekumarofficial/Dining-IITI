export interface Caterer {
  id: number;
  name: string;
}

export interface Allocation {
  id: number;
  student_id: string;
  email: number;
  caterer: Caterer;
}

export interface Student {
  id: number;
  email: string;
  name: string;
}

export interface MessCard {
  id: string;
  allocation: {
    id: number;
    student_id: string;
    email: number;
    caterer: {
      id: number;
      name: string;
    };
  };
  student: {
    id: number;
    email: string;
    name: string;
    photo: string;
  };
  qr_code: string;
}

export interface QRVerifyApiResponse {
  success: boolean;
  detail: string;
  mess_card: MessCard;
  timestamp?: Date;
}
