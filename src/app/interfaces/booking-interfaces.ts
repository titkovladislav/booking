
export interface BookingElementI {
  room: number;
  number: number;
  price: number;
  start: Date;
  end: Date;
}

export interface ApplicationI {
  surname: string;
  name: string;
  start: Date;
  end: Date;
  room: number;
}
