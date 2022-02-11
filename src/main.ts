import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import vuetify from "./plugins/vuetify"
import { firestorePlugin } from "vuefire"
import VueCurrencyFilter from "vue-currency-filter"

Vue.use(firestorePlugin)
Vue.use(VueCurrencyFilter, {
  symbol: "$",
  thousandsSeparator: ".",
  fractionCount: 2,
  fractionSeparator: ",",
  symbolPosition: "front",
  symbolSpacing: true,
  avoidEmptyDecimals: undefined,
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
