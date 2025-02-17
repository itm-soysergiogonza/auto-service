export interface Order {
  id?: number;
  tipo: string;
  observaciones?: string | null;
  fechaOrden: string;
  estado: string;
  placaVehiculo: string | null;
}
