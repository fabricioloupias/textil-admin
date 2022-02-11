import { Taller } from "./Taller";

export interface Corte {
    taller: Taller;
    id: string;
    prenda: string;
    totalPrendas: number;
    costoPorUnidad: number;
    pagadoATaller: Pago[];
    adelantoGananciaNeta: Pago[];
    precioUnidadCliente: number;
    fechaEnviado: string | null;
    fechaEntregado: string | null;
    fechaEstimadoEntrega: string | null;
    marcaPrenda: string;
    contactoTaller: string | null;
    barrioTaller: string | null;
    ubicacionTaller: string | null;
    tieneTaller: boolean
}

export interface Pago {
    monto: number;
    fecha: string;
}