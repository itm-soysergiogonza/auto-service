export interface Order {
  id?: number;
  tipo: string;
  descripcion?: string | null;
  fechaOrden: string;
  estado: string;
  placaVehiculo: string | null;
}
