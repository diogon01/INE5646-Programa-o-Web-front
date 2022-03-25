import {IBateria} from "./IBateria";

export interface IAeronave {
  id: number;
  model: string,
  weight: number,
  max_payload: number,
  ip_rating: string,
  max_flight_time: number,
  bateria: IBateria

}
