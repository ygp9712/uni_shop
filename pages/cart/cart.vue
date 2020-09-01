<template>
	<view class="cart">
		<view class="edit_area">
			<view v-if="!del_flag" class="edit_btn" @click="onEdit">编辑</view>
			<view v-else="del_flag" class="edit_btn after" @click="onEdit">取消</view>
		</view>
		<view class="goods_list">
			<view class="goods_item" v-for="(item, index) in carList" :key="index">
				<radio color="#b50e03" :checked="item.selected" @click="select(item.id)"></radio>
				<image class="thumb" :src="item.img"></image>
			  <view class="goods_data">
					<view class="title">
						{{item.title}}
					</view>
					<view class="price">
						<text>￥{{item.sellPrice}}</text>
						<text>￥{{item.marketPrice}}</text>
					</view>
					<view class="adjust">
						<image class="minus" @click="jianNum(item.id)" src="../../static/icons/jianhao.jpg"></image>
						<text class="num">{{item.num}}</text>
						<image class="add" @click="addNum(item.id)" src="../../static/icons/jiahao.jpeg"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="left">
				<view class="all_select">
					<radio color="#b50e03" :checked="allSelect" @click="selectAll()"></radio>
					<text>全选</text>
				</view>
				<view class="all_num">
					合计：￥{{allMoney}}
				</view>
			</view>
			<view v-if="del_flag" class="right delete" @click="del()">删除</view>
			<view v-else="!del_flag" class="right finish">结算</view>
		</view>
	</view>
</template>

<script>
	import { mapActions ,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				del_flag: false
			};
		},
		methods: {
			...mapActions(['addNum','jianNum','select','selectAll','del']),
			onEdit () {
				this.del_flag = !this.del_flag
			} 
		},
		computed: {
			...mapGetters(['allMoney', 'carList','allSelect'])
		},
		onLoad () {
			uni.getStorage({
				key: "car",
				success (e) {
					console.log(1+e)
				},
				fail (e) {
					console.log('fali')
				}
			})
		}
	}
</script>

<style lang="scss" >
	page,body {
		height: 100%;
		background-color: #f4f4f4;
	}
  .cart {
		height: 100%;
		.goods_list {
			padding-bottom: 200rpx;
			.goods_item {
				display: flex;
				align-items: center;
				background-color: white;
				border-radius: 8px;
				width: 690rpx;
				height: 300rpx;
				margin: 30rpx;
				radio {
					margin: 0 25rpx;
				}
				.thumb {
					width: 140rpx;
					height: 140rpx;
					margin-right: 20rpx;
				}
				.goods_data {
					width: 400rpx;
					.title {
						font-size: 26rpx;
						height: 100rpx;
						word-break: break-all;
						text-overflow: ellipsis;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}
					.price {
						margin: 15rpx 0;
						font-size: 28rpx;
						color: $shop-color;
						text:nth-child(2){
							color: #ccc;
							text-decoration: line-through;
							font-size: 26rpx;
							margin-left: 20rpx;
						}
					}
					.adjust {
						height: 40rpx;
						line-height: 40rpx;
						.num {
							position: relative;
							top: -10rpx;
							height: 40rpx;
							display: inline-block;
							margin: 0 20rpx;
							font-size: 26rpx;
						}
						image {
							display: inline-block;
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
			}
		}
		.bottom {
			display: flex;
			position: fixed;
			bottom: 101rpx;
			width: 750rpx;
			height: 100rpx;
			line-height: 100rpx;
			.left {
				display: flex;
				width: 550rpx;
				background-color: white;
				.all_select {
					font-size: 28rpx;
					width: 200rpx;
					text-align: center;
				}
				.all_num {
					font-size: 34rpx;
					width: 350rpx;
				}
			}
			.right {
				font-size: 32rpx;
				width: 200rpx;
				text-align: center;
			}
			.finish {
				color: white;
				background-color: $shop-color;
			}
			.delete {
				color: $shop-color;
				background-color: #ffdeb0;
			}
		}
		.edit_area {
			position: relative;
			height: 60rpx;
			.edit_btn {
				position: absolute;
				right: 20rpx;
				top: 10rpx;
				border: 1px solid #007AFF;
				font-size: 26rpx;
				width: 150rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				border-radius: 28rpx;
			}
			.after {
				color: $shop-color;
				background-color: #ffdeb0;
				border: 1px solid $shop-color;
			}
		}
	}
</style>
