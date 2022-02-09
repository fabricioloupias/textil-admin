<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-data-table :headers="headers" :items="cortes" :items-per-page="15">
          <template v-slot:item.costoTotal="{ item }">{{ costoTotal(item) }}</template>
          <template v-slot:item.faltanteAPagarTaller="{ item }">{{ faltanteAPagarTaller(item) }}</template>
          <template v-slot:item.gananciaUnidadNeta="{ item }">{{ gananciaUnidadNeta(item) }}</template>
          <template v-slot:item.gananciaTotalNeta="{ item }">{{ gananciaTotalNeta(item) }}</template>
          <template
            v-slot:item.faltanteCobroGananciaTotalNeta="{ item }"
          >{{ faltanteCobroGananciaTotalNeta(item) }}</template>
          <template v-slot:item.sumaCosto_NetoUnidad="{ item }">{{ sumaCosto_NetoUnidad(item) }}</template>
          <template
            v-slot:item.faltanteCobroSumaCosto_Neto="{ item }"
          >{{ faltanteCobroSumaCosto_Neto(item) }}</template>
          <template v-slot:item.sumaCostoTotal_Neto="{ item }">{{ sumaCostoTotal_Neto(item) }}</template>
          <template
            v-slot:item.descPrecioUnidadCliente_Impuesto="{ item }"
          >{{ descPrecioUnidadCliente_Impuesto(item) }}</template>
          <template v-slot:item.gananciaUTNUnidad="{ item }">{{ gananciaUTNUnidad(item) }}</template>
          <template v-slot:item.gananciaUTNTotal="{ item }">{{ gananciaUTNTotal(item) }}</template>
          <template v-slot:item.diasProduccion="{ item }">{{ diasProduccion(item) }}</template>
          <template v-slot:item.ubicacionTaller="{ item }"></template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Corte } from "@/domain/Corte"
import Vue from "vue"

export default Vue.extend({
  name: "Home",

  components: {},

  data: () => ({
    impuesto: 0.95,
    headers: [
      {
        text: "Taller",
        align: "start",
        sortable: false,
        divider: false,
        value: "taller",
      },
      {
        text: "Orden/Remito",
        align: "start",
        sortable: false,
        divider: false,
        value: "id",
      },
      {
        text: "Prenda",
        align: "start",
        sortable: false,
        divider: false,
        value: "prenda",
        width: 140
      },
      {
        text: "Cantidad prendas",
        align: "start",
        sortable: false,
        divider: false,
        value: "totalPrendas",
      },
      {
        text: "Costo por unidad",
        align: "start",
        sortable: false,
        divider: false,
        value: "costoPorUnidad",
        width: 90
      },
      {
        text: "Costo total",
        align: "start",
        sortable: false,
        divider: false,
        value: "costoTotal",
      },
      {
        text: "Pagado a taller",
        align: "start",
        sortable: false,
        divider: false,
        value: "pagadoATaller",
      },
      {
        text: "Faltante a pagar a taller",
        align: "start",
        sortable: false,
        divider: false,
        value: "faltanteAPagarTaller",
        width: 120,
      },
      {
        text: "Ganancia por unidad neta",
        align: "start",
        sortable: false,
        divider: false,
        value: "gananciaUnidadNeta",
        width: 120
      },
      {
        text: "Ganancia total neta",
        align: "start",
        sortable: false,
        divider: false,
        value: "gananciaTotalNeta",
      },
      {
        text: "Adelanto ganancia neta",
        align: "start",
        sortable: false,
        divider: false,
        value: "adelantoGananciaNeta",
      },
      {
        text: "Faltante a cobrar ganancia total neta propia",
        align: "start",
        sortable: false,
        divider: false,
        value: "faltanteCobroGananciaTotalNeta",
      },
      {
        text: "Costo + neto por unidad",
        align: "start",
        sortable: false,
        divider: false,
        value: "sumaCosto_NetoUnidad",
      },
      {
        text: "Faltante a cobrar | Costo + neto propio",
        align: "start",
        sortable: false,
        divider: false,
        value: "faltanteCobroSumaCosto_Neto",
      },
      {
        text: "Costo total + neto propio",
        align: "start",
        sortable: false,
        divider: false,
        value: "sumaCostoTotal_Neto",
      },
      {
        text: "Precio por unidad a cliente",
        align: "start",
        sortable: false,
        divider: false,
        value: "precioUnidadCliente",
      },
      {
        text: "Precio por unidad a cliente sin impuesto",
        align: "start",
        sortable: false,
        divider: false,
        value: "descPrecioUnidadCliente_Impuesto",
      },
      {
        text: "Ganancia UTN total por unidad",
        align: "start",
        sortable: false,
        divider: false,
        value: "gananciaUTNUnidad",
      },
      {
        text: "Ganancia UTN total por unidad",
        align: "start",
        sortable: false,
        divider: false,
        value: "gananciaUTNTotal",
      },
      {
        text: "Fecha enviado",
        align: "start",
        sortable: false,
        divider: false,
        value: "fechaEnviado",
      },
      {
        text: "Fecha entregado",
        align: "start",
        sortable: false,
        divider: false,
        value: "fechaEntregado",
      },
      {
        text: "Fecha estimada de entrega",
        align: "start",
        sortable: false,
        divider: false,
        value: "fechaEstimadoEntrega",
      },
      {
        text: "Dias de producción",
        align: "start",
        sortable: false,
        divider: false,
        value: "diasProduccion",
      },
      {
        text: "Marca",
        align: "start",
        sortable: false,
        divider: false,
        value: "marcaPrenda",
      },
      {
        text: "Contacto",
        align: "start",
        sortable: false,
        divider: false,
        value: "contactoTaller",
      },
      {
        text: "Barrio",
        align: "start",
        sortable: false,
        divider: false,
        value: "barrioTaller",
      },
      {
        text: "Ubicación",
        align: "start",
        sortable: false,
        divider: false,
        value: "ubicacionTaller",
      },
    ],
    cortes: [
      {
        taller: "Maria",
        id: "284690",
        prenda: "Buzo diss negro",
        totalPrendas: 252,
        costoPorUnidad: 150,
        pagadoATaller: 0,
        adelantoGananciaNeta: 0,
        precioUnidadCliente: 320,
        fechaEnviado: "01/26/2022",
        fechaEntregado: "01/28/2022",
        fechaEstimadoEntrega: null,
        marcaPrenda: "Kevingston",
        contactoTaller: "1121935210",
        barrioTaller: "Villa Celina",
        ubicacionTaller: "https://goo.gl/maps/cJVH5AnVmHzD7Vcw8"
      },
    ],
  }),
  methods: {
    // un getter computado
    costoTotal: function (corte: Corte) {
      return corte.costoPorUnidad * corte.totalPrendas;
    },
    faltanteAPagarTaller: function (corte: Corte) {
      return this.costoTotal(corte) - corte.pagadoATaller;
    },
    gananciaUnidadNeta: function (corte: Corte) {
      return this.gananciaUTNUnidad(corte) / 2;
    },
    gananciaTotalNeta: function (corte: Corte) {
      return this.gananciaUTNTotal(corte) / 2;
    },
    faltanteCobroGananciaTotalNeta: function (corte: Corte) {
      return this.gananciaTotalNeta(corte) - corte.adelantoGananciaNeta;
    },
    sumaCosto_NetoUnidad: function (corte: Corte) {
      return corte.costoPorUnidad + this.gananciaUnidadNeta(corte);
    },
    faltanteCobroSumaCosto_Neto: function (corte: Corte) {
      return this.faltanteAPagarTaller(corte) + this.faltanteCobroGananciaTotalNeta(corte);
    },
    sumaCostoTotal_Neto: function (corte: Corte) {
      return this.costoTotal(corte) + this.gananciaTotalNeta(corte);
    },
    descPrecioUnidadCliente_Impuesto: function (corte: Corte) {
      return corte.precioUnidadCliente * this.impuesto;
    },
    gananciaUTNUnidad: function (corte: Corte) {
      return this.descPrecioUnidadCliente_Impuesto(corte) - corte.costoPorUnidad;
    },
    gananciaUTNTotal: function (corte: Corte) {
      return this.gananciaUTNUnidad(corte) * corte.totalPrendas;
    },
    diasProduccion: function (corte: Corte) {
      if (corte.fechaEntregado) {
        const difference = new Date(corte.fechaEntregado).getTime() - new Date(corte.fechaEnviado).getTime();
        return Math.ceil(difference / (1000 * 3600 * 24))
      }
      return null;
    },
  }
})
</script>
