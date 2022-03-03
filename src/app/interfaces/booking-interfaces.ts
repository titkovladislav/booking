export interface BookingElement {
  room: number;
  number: number;
  price: number;
}

export interface ClientI {
  surname: string;
  name: string;
  patronymic: string;
}

export interface RangeI {
  start: string;
  end: string;
}

export interface ApplicationI {
  client: ClientI;
  range: RangeI;
}
