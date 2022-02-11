<template>
  <div>
    <v-row>
      <v-col cols="3">
        <info-card :title="gananciaTotalEnTaller | currency" subtitle="Ganancia total" />
      </v-col>
      <v-col cols="3">
        <info-card
          :title="gananciaNetaAcumulada | currency"
          subtitle="Ganancia neta total acumulada"
        />
      </v-col>
      <v-col cols="3">
        <info-card
          :title="gananciaFaltanteACobrar | currency"
          subtitle="Faltante a cobrar de la ganancia neta"
        />
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">Cortes en taller</v-card-title>
          <v-data-table
            :headers="headersCortesConTaller"
            :items="cortesConTaller"
            :items-per-page="15"
          >
            <template v-slot:item.taller="{ item }">
              {{
                getNombreTaller(item.tallerId)
              }}
            </template>
            <template v-slot:item.costoTotal="{ item }">
              {{
                costoTotal(item) | currency
              }}
            </template>
            <template v-slot:item.faltanteAPagarTaller="{ item }">
              {{
                faltanteAPagarTaller(item) | currency
              }}
            </template>
            <template v-slot:item.pagadoATaller="{ item }">
              {{
                calculatePagadoATaller(item) | currency
              }}
            </template>
            <template v-slot:item.gananciaUnidadNeta="{ item }">
              {{
                gananciaUnidadNeta(item) | currency
              }}
            </template>
            <template v-slot:item.gananciaTotalNeta="{ item }">
              {{
                gananciaTotalNeta(item) | currency
              }}
            </template>
            <template v-slot:item.adelantoGananciaNeta="{ item }">
              {{
                adelantoGananciaNeta(item) | currency
              }}
            </template>
            <template v-slot:item.faltanteCobroGananciaTotalNeta="{ item }">
              {{
                faltanteCobroGananciaTotalNeta(item) | currency
              }}
            </template>
            <template v-slot:item.sumaCosto_NetoUnidad="{ item }">
              {{
                sumaCosto_NetoUnidad(item) | currency
              }}
            </template>
            <template v-slot:item.faltanteCobroSumaCosto_Neto="{ item }">
              {{
                faltanteCobroSumaCosto_Neto(item) | currency
              }}
            </template>
            <template v-slot:item.sumaCostoTotal_Neto="{ item }">
              {{
                sumaCostoTotal_Neto(item) | currency
              }}
            </template>
            <template v-slot:item.descPrecioUnidadCliente_Impuesto="{ item }">
              {{
                descPrecioUnidadCliente_Impuesto(item) | currency
              }}
            </template>
            <template v-slot:item.gananciaUTNUnidad="{ item }">
              {{
                gananciaUTNUnidad(item) | currency
              }}
            </template>
            <template v-slot:item.gananciaUTNTotal="{ item }">
              {{
                gananciaUTNTotal(item) | currency
              }}
            </template>
            <template v-slot:item.diasProduccion="{ item }">
              {{
                diasProduccion(item)
              }}
            </template>
            <template v-slot:item.contactoTaller="{ item }">
              {{
                getContactoTaller(item.tallerId)
              }}
            </template>
            <template v-slot:item.barrioTaller="{ item }">
              {{
                getBarrioTaller(item.tallerId)
              }}
            </template>
            <template v-slot:item.ubicacionTaller="{ item }">
              {{
                getUbicacionTaller(item.tallerId)
              }}
            </template>
            <template v-slot:item.entregasACliente="{ item }">
              {{
                getCantidadPrendasEntregadasACliente(item.entregasACliente)
              }}
            </template>
            <template v-slot:item.diferenciaPrendas="{ item }">
              {{
                item.entregasACliente.length > 0 ? getDiferenciaPrendas(item) : null
              }}
            </template>
            <template v-slot:item.devolucionCosto="{ item }">
              <span
                v-if="item.entregasACliente.length > 0"
              >{{ getDevolucionCostoTotal(item) | currency }}</span>
            </template>
            <template v-slot:item.devolucionGanancia="{ item }">
              <span
                v-if="item.entregasACliente.length > 0"
              >{{ getDevolucionGananciaTotal(item) | currency }}</span>
            </template>
            <template v-slot:item.devolucionTotal="{ item }">
              <span
                v-if="item.entregasACliente.length > 0"
              >{{ getDevolucionTotal(item) | currency }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <!-- Cortes sin taller -->
      <v-col cols="12">
        <v-card v-if="cortesSinTaller.length > 0">
          <v-card-title class="text-h5">Cortes sin taller</v-card-title>
          <v-data-table
            :headers="headersCortesSinTaller"
            :items="cortesSinTaller"
            :items-per-page="15"
          >
            <template v-slot:item.costoTotal="{ item }">
              {{
                costoTotal(item) | currency
              }}
            </template>
            <template v-slot:item.gananciaUnidadNeta="{ item }">
              {{
                gananciaUnidadNeta(item) | currency
              }}
            </template>
            <template v-slot:item.gananciaTotalNeta="{ item }">
              {{
                gananciaTotalNeta(item) | currency
              }}
            </template>
            <template v-slot:item.sumaCosto_NetoUnidad="{ item }">
              {{
                sumaCosto_NetoUnidad(item) | currency
              }}
            </template>
            <template v-slot:item.faltanteCobroSumaCosto_Neto="{ item }">
              {{
                faltanteCobroSumaCosto_Neto(item) | currency
              }}
            </template>
            <template v-slot:item.sumaCostoTotal_Neto="{ item }">
              {{
                sumaCostoTotal_Neto(item) | currency
              }}
            </template>
            <template v-slot:item.descPrecioUnidadCliente_Impuesto="{ item }">
              {{
                descPrecioUnidadCliente_Impuesto(item) | currency
              }}
            </template>
            <template v-slot:item.gananciaUTNUnidad="{ item }">
              {{
                gananciaUTNUnidad(item) | currency
              }}
            </template>
            <template v-slot:item.gananciaUTNTotal="{ item }">
              {{
                gananciaUTNTotal(item) | currency
              }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Corte, Entrega } from "@/domain/Corte"
import InfoCard from "@/components/InfoCard.vue"
import { db } from "@/db"
import { collection, getDocs } from "firebase/firestore/lite"

import Component from "vue-class-component"
import { Taller } from "@/domain/Taller"

@Component({
  components: {
    InfoCard,
  },
})
export default class Home extends Vue {
  impuesto = 0.95
  headersCortesConTaller = [
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
      width: 150,
    },
    {
      text: "Prenda",
      align: "start",
      sortable: false,
      divider: false,
      value: "prenda",
      width: 250,
    },
    {
      text: "Cantidad prendas",
      align: "end",
      sortable: false,
      divider: false,
      value: "totalPrendas",
    },
    {
      text: "Costo por unidad",
      align: "end",
      sortable: false,
      divider: false,
      value: "costoPorUnidad",
      width: 90,
    },
    {
      text: "Costo total",
      align: "end",
      sortable: false,
      divider: false,
      value: "costoTotal",
      width: 170,
    },
    {
      text: "Pagado a taller",
      align: "end",
      sortable: false,
      divider: false,
      value: "pagadoATaller",
      width: 140,
    },
    {
      text: "Faltante a pagar a taller",
      align: "end",
      sortable: false,
      divider: false,
      value: "faltanteAPagarTaller",
      width: 140,
    },
    {
      text: "Ganancia por unidad neta",
      align: "end",
      sortable: false,
      divider: false,
      value: "gananciaUnidadNeta",
      width: 120,
    },
    {
      text: "Ganancia total neta",
      align: "end",
      sortable: false,
      divider: false,
      value: "gananciaTotalNeta",
      width: 150,
    },
    {
      text: "Adelanto ganancia neta",
      align: "end",
      sortable: false,
      divider: false,
      value: "adelantoGananciaNeta",
      width: 150,
    },
    {
      text: "Faltante a cobrar ganancia total neta propia",
      align: "end",
      sortable: false,
      divider: false,
      value: "faltanteCobroGananciaTotalNeta",
      width: 150,
    },
    {
      text: "Costo + neto por unidad",
      align: "end",
      sortable: false,
      divider: false,
      value: "sumaCosto_NetoUnidad",
      width: 120,
    },
    {
      text: "Faltante a cobrar | Costo + neto propio",
      align: "end",
      sortable: false,
      divider: false,
      value: "faltanteCobroSumaCosto_Neto",
      width: 160,
    },
    {
      text: "Costo total + neto propio",
      align: "end",
      sortable: false,
      divider: false,
      value: "sumaCostoTotal_Neto",
      width: 150,
    },
    {
      text: "Precio por unidad a cliente",
      align: "end",
      sortable: false,
      divider: false,
      value: "precioUnidadCliente",
      width: 130,
    },
    {
      text: "Precio por unidad a cliente sin impuesto",
      align: "end",
      sortable: false,
      divider: false,
      value: "descPrecioUnidadCliente_Impuesto",
      width: 150,
    },
    {
      text: "Ganancia UTN total por unidad",
      align: "end",
      sortable: false,
      divider: false,
      value: "gananciaUTNUnidad",
      width: 120,
    },
    {
      text: "Ganancia UTN total por unidad",
      align: "end",
      sortable: false,
      divider: false,
      value: "gananciaUTNTotal",
      width: 150,
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
      align: "end",
      sortable: false,
      divider: false,
      value: "diasProduccion",
      width: 120,
    },
    {
      text: "Prendas entregadas a cliente",
      align: "end",
      sortable: false,
      divider: false,
      value: "entregasACliente",
      width: 120,
    },
    {
      text: "Diferencia de prendas",
      align: "end",
      sortable: false,
      divider: false,
      value: "diferenciaPrendas",
      width: 120,
    },
    {
      text: "Devolucion de costo",
      align: "end",
      sortable: false,
      divider: false,
      value: "devolucionCosto",
      width: 130,
    },
    {
      text: "Devolucion de ganancia",
      align: "end",
      sortable: false,
      divider: false,
      value: "devolucionGanancia",
      width: 130,
    },
    {
      text: "Devolucion total",
      align: "end",
      sortable: false,
      divider: false,
      value: "devolucionTotal",
      width: 130,
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
  ]
  headersCortesSinTaller = [
    {
      text: "Orden/Remito",
      align: "start",
      sortable: false,
      divider: false,
      value: "id",
      width: 150,
    },
    {
      text: "Prenda",
      align: "start",
      sortable: false,
      divider: false,
      value: "prenda",
      width: 250,
    },
    {
      text: "Cantidad prendas",
      align: "end",
      sortable: false,
      divider: false,
      value: "totalPrendas",
    },
    {
      text: "Costo por unidad",
      align: "end",
      sortable: false,
      divider: false,
      value: "costoPorUnidad",
      width: 90,
    },
    {
      text: "Costo total",
      align: "end",
      sortable: false,
      divider: false,
      value: "costoTotal",
      width: 170,
    },
    {
      text: "Ganancia por unidad neta",
      align: "end",
      sortable: false,
      divider: false,
      value: "gananciaUnidadNeta",
      width: 120,
    },
    {
      text: "Ganancia total neta",
      align: "end",
      sortable: false,
      divider: false,
      value: "gananciaTotalNeta",
      width: 120,
    },
    {
      text: "Costo + neto por unidad",
      align: "end",
      sortable: false,
      divider: false,
      value: "sumaCosto_NetoUnidad",
      width: 120,
    },
    {
      text: "Costo total + neto propio",
      align: "end",
      sortable: false,
      divider: false,
      value: "sumaCostoTotal_Neto",
      width: 150,
    },
    {
      text: "Precio por unidad a cliente",
      align: "end",
      sortable: false,
      divider: false,
      value: "precioUnidadCliente",
      width: 130,
    },
    {
      text: "Precio por unidad a cliente sin impuesto",
      align: "end",
      sortable: false,
      divider: false,
      value: "descPrecioUnidadCliente_Impuesto",
      width: 150,
    },
    {
      text: "Ganancia UTN total por unidad",
      align: "end",
      sortable: false,
      divider: false,
      value: "gananciaUTNUnidad",
      width: 120,
    },
    {
      text: "Ganancia UTN total por unidad",
      align: "end",
      sortable: false,
      divider: false,
      value: "gananciaUTNTotal",
      width: 150,
    },
    {
      text: "Marca",
      align: "start",
      sortable: false,
      divider: false,
      value: "marcaPrenda",
    },
  ]
  cortes: Corte[] = []
  talleres: Taller[] = []

  get cortesConTaller(): Corte[] {
    return this.cortes.filter((c) => c.tieneTaller)
  }
  get cortesSinTaller(): Corte[] {
    return this.cortes.filter((c) => !c.tieneTaller)
  }

  get gananciaNetaAcumulada(): number {
    let suma = 0
    this.cortesConTaller.map((c) =>
      c.adelantoGananciaNeta.map((g) => (suma += g.monto))
    )
    return suma
  }

  get gananciaFaltanteACobrar(): number {
    let suma = 0
    this.cortesConTaller.map(
      (c) => (suma += this.faltanteCobroGananciaTotalNeta(c))
    )
    return suma
  }

  get gananciaTotalEnTaller(): number {
    let suma = 0
    this.cortesConTaller.map((c) => (suma += this.gananciaTotalNeta(c)))
    return suma
  }

  mounted(): void {
    const cortesCol = collection(db, "cortes")
    const talleresCol = collection(db, "talleres")

    getDocs(cortesCol).then((snapSnapshot) => {
      this.cortes = snapSnapshot.docs.map((doc) => doc.data() as Corte)
    })

    getDocs(talleresCol).then((snapSnapshot) => {
      snapSnapshot.docs.map((doc) => {
        this.talleres.push({ ...(doc.data() as Taller), id: doc.id })
      })
    })
  }

  getCantidadPrendasEntregadasACliente(entregas: Entrega[]): number {
    console.log(entregas)
    let sum = 0;
    entregas.map(e => sum += e.cantidad);
    return sum;
  }

  getDiferenciaPrendas(corte: Corte): number {
    return this.getCantidadPrendasEntregadasACliente(corte.entregasACliente) - corte.totalPrendas
  }

  getDevolucionCostoTotal(corte: Corte): number {
    return Math.abs(corte.costoPorUnidad * this.getDiferenciaPrendas(corte))
  }

  getDevolucionGananciaTotal(corte: Corte): number {
    return Math.abs(this.gananciaUnidadNeta(corte) * this.getDiferenciaPrendas(corte))
  }

  getDevolucionTotal(corte: Corte): number {
    return this.getDevolucionCostoTotal(corte) + this.getDevolucionGananciaTotal(corte)
  }

  getTallerById(id: string): Taller | undefined {
    return this.talleres.find((t) => t.id == id)
  }

  getNombreTaller(tallerId: string): string | undefined {
    const taller = this.getTallerById(tallerId)
    return taller?.nombre
  }

  getContactoTaller(tallerId: string): string | undefined {
    const taller = this.getTallerById(tallerId)
    return taller?.contactoTaller
  }

  getBarrioTaller(tallerId: string): string | undefined {
    const taller = this.getTallerById(tallerId)
    return taller?.barrioTaller
  }

  getUbicacionTaller(tallerId: string): string | undefined {
    const taller = this.getTallerById(tallerId)
    return taller?.ubicacionTaller
  }

  calculatePagadoATaller(corte: Corte): number {
    let sum = 0
    corte.pagadoATaller.map((p) => (sum += p.monto))
    return sum
  }

  costoTotal(corte: Corte): number {
    return corte.costoPorUnidad * corte.totalPrendas
  }

  faltanteAPagarTaller(corte: Corte): number {
    let totalPagadoATaller = 0
    corte.pagadoATaller.map((p) => (totalPagadoATaller += p.monto))
    return this.costoTotal(corte) - totalPagadoATaller
  }

  gananciaUnidadNeta(corte: Corte): number {
    return this.gananciaUTNUnidad(corte) / 2
  }

  gananciaTotalNeta(corte: Corte): number {
    return this.gananciaUTNTotal(corte) / 2
  }

  faltanteCobroGananciaTotalNeta(corte: Corte): number {
    let sumaAdelanto = 0
    corte.adelantoGananciaNeta.map((g) => (sumaAdelanto += g.monto))

    return this.gananciaTotalNeta(corte) - sumaAdelanto
  }

  adelantoGananciaNeta(corte: Corte): number {
    let sumaAdelanto = 0
    corte.adelantoGananciaNeta.map((g) => (sumaAdelanto += g.monto))
    return sumaAdelanto
  }

  sumaCosto_NetoUnidad(corte: Corte): number {
    return corte.costoPorUnidad + this.gananciaUnidadNeta(corte)
  }
  faltanteCobroSumaCosto_Neto(corte: Corte): number {
    return (
      this.faltanteAPagarTaller(corte) +
      this.faltanteCobroGananciaTotalNeta(corte)
    )
  }
  sumaCostoTotal_Neto(corte: Corte): number {
    return this.costoTotal(corte) + this.gananciaTotalNeta(corte)
  }
  descPrecioUnidadCliente_Impuesto(corte: Corte): number {
    return corte.precioUnidadCliente * this.impuesto
  }
  gananciaUTNUnidad(corte: Corte): number {
    return this.descPrecioUnidadCliente_Impuesto(corte) - corte.costoPorUnidad
  }
  gananciaUTNTotal(corte: Corte): number {
    return this.gananciaUTNUnidad(corte) * corte.totalPrendas
  }
  diasProduccion(corte: Corte): number | null {
    if (corte.fechaEntregado && corte.fechaEnviado) {
      const difference =
        new Date(corte.fechaEntregado).getTime() -
        new Date(corte.fechaEnviado).getTime()
      return Math.ceil(difference / (1000 * 3600 * 24))
    }
    return null
  }
}
</script>
