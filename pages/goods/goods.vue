<template>
	<view class="goods_list">
		<goods-list @goodsItemClick="goGoodsDetail"  :goods="goods"></goods-list>
		<view class="isOver" v-if="flag">-----没有更多-----</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list.vue'
	export default {
		data() {
			return {
				flag: false,
				pageindex: 1,
				goods: []
			};
		},
		components: { "goods-list": goodsList },
		methods: {
			async getGoodsList (callBack) {
				const res = await this.$myRequest({
					url:`/api/getgoods?pageindex=${this.pageindex}`
				})
				console.log(res)
				this.goods = this.goods.concat(res.data.message)
				callBack && callBack()
				uni.stopPullDownRefresh()
				if (res.data.message.length != 10) {
					this.flag = true
				}
			},
			goGoodsDetail (id) {
				uni.navigateTo({
					url: `../goods_detail/goods_detail?id=${id}`
				})
			}
		},
		onLoad() {
			this.getGoodsList()
		},
		onReachBottom () {
			if (this.flag) return
			this.pageindex++
			this.getGoodsList()
		},
		onPullDownRefresh () {
			this.pageindex = 1
			this.goods = []
			this.flag = false
			setTimeout(()=>{
				this.getGoodsList(()=>{
					uni.stopPullDownRefresh()
				})
			}, 1000)
			
		}
	}
</script>

<style lang="scss">
  .goods_list {
		background: #eee;
	}
	.isOver {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
</style>
