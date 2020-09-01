import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{ 
		car: [] , 
		all_money: 114514 , // 购物车总价
		all_select: true
	},
	getters: {
		carList (state) {
			if (state.all_select) {
				state.car.forEach((item)=>{
					item.selected = true
				})
			}
			uni.setStorage({
				key: "car",
				data: JSON.stringify(state.car)
			})
			return state.car
		},
		allMoney(state){
			let all_money = 0
			state.car.forEach((item)=>{
				if(item.selected) {
					all_money+=item.num*item.sellPrice
				}
			})
			return state.all_money = all_money
		},
		allSelect(state){
			return state.all_select
		}
	},
	mutations: {
		ADDGOODS (state, data) {
			let datas = {
				title: data.title,
				img: data.img,
				num: 1,
				sellPrice: data.sell_price,
				marketPrice: data.market_price,
				selected: true,
				id: data.id
			}
			let index = -1
			index = state.car.findIndex(item=>{
				return item.id == data.id
			})
			if (index == -1) {
				state.car.push(datas)
			} else {
				state.car[index].num++
			}
			console.log(state.car)
			uni.showToast({
				title: '添加成功'
			})
		},
		ADDNUM (state, id) {
			let index = state.car.findIndex(item=>{
				return item.id == id
			})
			return state.car[index].num++
		},
		JIANNUM (state, id) {
			let index = state.car.findIndex(item=>{
				return item.id == id
			})
			if (state.car[index].num <= 1) {
				return state.car[index].num = 1
			} else {
				return state.car[index].num--
			}
		},
		SELECT (state,id) {
			let index = state.car.findIndex(item=>{
				return item.id == id
			})
			state.car[index].selected = !state.car[index].selected
			let flag = state.car.some((item)=>{
				return item.selected == false
			})
			if(!flag){
				state.all_select = true
			} else {
				state.all_select = false
			}
		},
		SELECTALL (state) {
			state.all_select=!state.all_select
			if(state.all_select){
					state.car.forEach((item)=>{
							item.selected=true
					})
			}else{
					state.car.forEach((item)=>{
							item.selected=false
					})
			}
		},
		DELETE (state) {
			let flag = state.car.some((item)=>{
				return item.selected == true
			})
			if(!flag){
				uni.showToast({
					title: '请选择至少一个商品！'
				})
			} else {
				uni.showModal({
					title: '确认',
					content: '是否删除选定商品？',
					success: function (res) {
						if (res.confirm) {
							var list = [];
							state.car.forEach((item, index)=>{
								if(!item.selected){
									list.push(item)
								}
							})
							return state.car = list
						}
					}
				})
			}
		}
	},
	actions: {
		addGoods({commit},data){
		  commit('ADDGOODS',data)
		},
		addNum({commit},id){
				commit('ADDNUM',id)
		},
		jianNum({commit},id){
				commit('JIANNUM',id)
		},
		select({commit},id){
				commit('SELECT',id)
		},
		selectAll({commit}){
		    commit('SELECTALL')
		},
		del({commit}){
		    commit('DELETE')
		}
	}
})
export default store