<template>
	<view class="news">
	  <news-item @itemClick="goDetail" :list="newsList"></news-item>
	</view>
</template>

<script>
	import newsItem from '../../components/news-item.vue'
	export default {
		components: {
			"news-item": newsItem
		},
		data() {
			return {
				newsList: []
			};
		},
		methods: {
			async getNews () {
				const res = await this.$myRequest({
					url: '/api/getnewslist'
				})
				this.newsList = res.data.message
			},
			goDetail (id) {
				// id为子组件emit时附带的参数
				console.log(id)
				uni.navigateTo({
					url: '/pages/news-detail/news-detail?id=' + id
				})
			}
		},
		onLoad() {
			this.getNews()
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
