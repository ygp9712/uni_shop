<template>
	<view class="goods_detail">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in swiperImgs" :key="index">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		<view class="box1">
			<view class="price">
				<text>￥{{detail.sell_price}}</text>
				<text>￥{{detail.market_price}}</text>
			</view>
			<view class="goods_name">
				{{detail.title}}
			</view>
		</view>
		<view class="line"></view>
		<view class="box2">
			<view>货号：{{detail.goods_no}}</view>
			<view>库存：{{detail.stock_quantity}}</view>
		</view>
		<view class="line"></view>
		<view class="box3">
			<view class="title">详情介绍</view>
			<rich-text class="content" :nodes="desc.content"></rich-text>
		</view>
		<view class="goods_nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import uniGoodsNav from '../../components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {
			uniGoodsNav
		},
		data() {
			return {
				options: [{
						icon: 'cart',
						text: '购物车',
				}],
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
				],
				id: 0,
				swiperImgs: [],
				detail: [],
				desc: ''
			};
		},
		methods: {
			...mapActions(['addGoods']),
			async getSwiper () {
				const res = await this.$myRequest({
					url: `/api/getthumimages/${this.id}`
				})
				this.swiperImgs = res.data.message
			},
			async getDetailInfo () {
				const res = await this.$myRequest({
					url: `/api/goods/getinfo/${this.id}`
				})
				this.detail = res.data.message[0]
			},
			async getDetailDesc () {
				const res = await this.$myRequest({
					url: `/api/goods/getdesc/${this.id}`
				})
				this.desc = res.data.message[0]
			},
			onClick (e) {
				uni.reLaunch({
					url: '../cart/cart'
				})
			},
			buttonClick (e) {
				if (e.index === 0) { // 添加购物车
				  this.detail.img =  this.swiperImgs[0].src
					this.addGoods(this.detail)
					this.options[0].info++
				}
			}
		},
		onLoad (options) {
			this.id = options.id
			this.getSwiper()
			this.getDetailInfo()
			this.getDetailDesc()
		}
	}
</script>

<style lang="scss" scoped>
.goods_detail {
	swiper {
		height: 700rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.box1 {
		padding: 10px;
		.price {
			font-size: 38rpx;
			line-height: 80rpx;
			color: $shop-color;
			text:nth-child(2){
				color: #ccc;
				font-size: 30rpx;
				text-decoration: line-through;
				margin-left: 20rpx;
			}
		}
		.goods_name{
			font-size: 32rpx;
			line-height: 60rpx;
		}
	}
	.box2 {
		padding: 0 10px;
		font-size: 32rpx;
		line-height: 70rpx;
	}
	.box3 {
		padding-bottom: 50px;
		.title {
			font-size: 36rpx;
			padding-left: 10px;
			border-bottom: 1px solid #eee;
			line-height: 80rpx;
		}
		.content {
			padding: 10px;
			font-size: 29rpx;
			color: #333;
			line-height: 50rpx;
		}
	}
}

.line {
	height:15rpx;
	width: 750rpx;
	background-color: #eee;
}
.goods_nav {
	width: 750rpx;
	position: fixed;
	bottom: 0;
}

</style>
