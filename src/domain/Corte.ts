export interface Corte {
    taller: string;
    id: string;
    prenda: string;
    totalPrendas: number;
    costoPorUnidad: number;
    costoTotal: number;
    pagadoATaller: number;
    faltanteAPagarTaller: number;
    gananciaUnidadNeta: number;
    gananciaTotalNeta: number;
    adelantoGananciaNeta: number;
    faltanteCobroGananciaTotalNeta: number;
    sumaCosto_Neto: number;
    faltanteCobroSumaCosto_Neto: number;
    sumaCostoTotal_Neto: number;
    precioUnidadCliente: number;
    descPrecioUnidadCliente_Impuesto: number;
    gananciaUTNUnidad: number;
    gananciaUTNTotal: number;
    fechaEnviado: string;
    fechaEntregado: string | null;
    fechaEstimadoEntrega: string | null;
    diasProduccion: number;
    marcaPrenda: string;
    contactoTaller: string;
    barrioTaller: string;
    ubicacionTaller: string
}