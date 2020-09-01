<template>
	<view class="home">
		<swiper indicator-dots circular>
			<swiper-item v-for="(item, index) in swipers" :key="index">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<view class="nav">
			<view class="nav_item" v-for="(item, index) in navs" :key="index" @click="navItemClick(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.text}}</text>
			</view>
		</view>
	    <view class="hot_goods">
			<view class="title">
				推荐商品
			</view>
			<goods-list @goodsItemClick="goGoodsDetail" :goods="goods"></goods-list>
		</view>
	</view>
</template>

<script>
	import goodsList from "../../components/goods-list.vue"
	export default {
		data() {
			return {
				swipers: [],
				goods: [],
				navs: [
					{
						icon: 'iconfont icon-ziyuan',
						text: '黑马超市',
						path: '/pages/goods/goods'
					},
					{
						icon: 'iconfont icon-guanyuwomen',
						text: '联系我们',
						path: '/pages/contact/contact'
					},
					{
						icon: 'iconfont icon-tupian',
						text: '社区图片',
						path: '/pages/pics/pics'
					},
					{
						icon: 'iconfont icon-shipin',
						text: '学习视频',
						path: '/pages/videos/videos'
					}
				]
			}
		},
		components: {
			"goods-list": goodsList
		},
		onLoad() {
			this.getSwipers()
			this.getHotGoods()
		},
		methods: {
      async getSwipers () {
			  const res = await this.$myRequest({
				  methods: 'GET',
				  url: '/api/getlunbo'
			  })
			  this.swipers = res.data.message
			  console.log(this.swipers)
		  },
			async getHotGoods () {
				const res = await this.$myRequest({
					url: '/api/getgoods?pageindex=1'
				})
				this.goods = res.data.message
			},
			// 网页跳转导航
			navItemClick (url) {
				uni.navigateTo({
					url: url
				})
			},
			goGoodsDetail (id) {
				uni.navigateTo({
					url: `../goods_detail/goods_detail?id=${id}`
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
  .home{
    swiper {
	    width: 750rpx;
		  height: 380rpx;
      image{
			  height: 100%;
			  width: 100%;
		}
	}
  .nav {
	  display: flex;
	  .nav_item {
		  width: 25%;
		  text-align: center;
		  view {
			  height: 120rpx;
			  width: 120rpx;
			  background: $shop-color;
			  border-radius: 50%;
			  margin: 10px auto;
			  line-height: 120rpx;
			  color: white;
			  font-size: 50rpx;
		  }
		  .icon-tupian {
			  font-size: 45rpx;
		  }
		  text {
			  font-size: 30rpx;
		  }
	  }
    }
	.hot_goods {
		margin-top: 10px;
		background: #eee;
		overflow: hidden;
		.title {
			height: 50px;
			line-height: 50px;
			color: $shop-color;
			text-align: center;
			letter-spacing: 20px;
			background-color: white;
			margin: 5px 0;
		}
	}
 }
</style>
