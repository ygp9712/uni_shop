<template>
	<view class="news_detail">
		<text class="title">{{detail.title}}</text>
		<view class="info">
			<text>发表时间：{{detail.add_time | formatDate}}</text>
			<text>浏览：{{detail.click}}</text>
		</view>
		<view class="content">
			<!-- 小程序语法无法识别HTML，需要借助富文本组件 -->
			<rich-text :nodes="detail.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				detail: {}
			};
		},
		methods: {
			async getNewsDetail (id) {
				const res = await this.$myRequest({
					url: `/api/getnew/${id}`
				})
				this.detail = res.data.message[0]
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getNewsDetail(this.id)
		}
	}
</script>

<style lang="scss" scoped>
.news_detail {
	font-size: 30rpx;
	margin: 20rpx 40rpx;
	.title {
		padding: 20rpx 0;
		display: inline-block;
		text-align: center;
		width: 670rpx;
	}
	.info {
		display: flex;
		justify-content: space-between;
	}
}
</style>
