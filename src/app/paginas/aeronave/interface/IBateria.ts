export interface IBateria {
  id: number,
  model: string,
  voltage: number,
  capacity: number,
  energy: number,
  weight: number,
  max_charging_power: number,
  created_at: Date,
  updated_at: Date
}
