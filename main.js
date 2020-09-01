import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'
import store from './store/index.js'

Vue.prototype.$myRequest = myRequest
Vue.prototype.$store = store

Vue.config.productionTip = false

Vue.filter('formatDate', (date)=>{
	const nDate = new Date(date)
	const year = nDate.getFullYear()
	const month = nDate.getMonth()
	const day = nDate.getDay()
	return `${year}-${month}-${day}`
})

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
