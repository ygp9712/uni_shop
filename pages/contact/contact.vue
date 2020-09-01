<template>
	<view class="contact">
		<image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
	  <view class="info">
			<view @click="phone()">
				联系电话：XXX-XXX-XXXX（ 点击拨打 ）
			</view>
			<view>
				地址：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
			</view>
			<map class="ditu" :scale="scale" :longitude="longitude" :latitude="latitude" :markers="covers"></map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scale: 15,
				longitude: 113.847284,
				latitude: 22.599689,
				covers: [{
					longitude: 113.847284,
					latitude: 22.599689,
					iconPath: '../../static/hmlogo.png',
					width: 30,
					height: 30
				}]
			};
		},
		methods: {
			phone () {
				uni.makePhoneCall({
					phoneNumber: 15999688133
				})
			}
		}
	}
</script>

<style lang="scss">
  .contact {
		.img {
			width: 750rpx;
			height: 320rpx;
		}
		.info {
			padding: 10rpx 20rpx;
			font-size: 30rpx;
			view {
				line-height: 80rpx;
				border-bottom: 1px solid #eee;
			}
		}
		.ditu {
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>
