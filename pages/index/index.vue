<template>
	<view class='area'>
		<view class='btnBar'>
			<button type="default" class="btnStyle" id='btnHelp' @click="callHelp">帮助</button>
			<button type="default" class="btnStyle" id='btnRecognition' @click="callRecognition">手语</button>
			<button type="default" class="btnStyle" id='btnKeyboard' @click="callKeyboard">打字</button>
		</view>
	</view>
</template>

<script>
	export default {
		onPullDownRefresh: () => {
			uni.stopPullDownRefresh();
			uni.showToast({
				title: "信息刷新成功!"
			})
		},
		data() {
			return {
				
			}
		},
		methods: {
			callHelp: () => {
				console.log("唤起帮助")
			},
			callRecognition: () => {
				console.log("唤起手语识别")
				uni.navigateTo({
					url:"/pages/camera/camera",
					success:()=>{
						console.log("跳转到手语界面");
					},
					fail: (err) => {
						console.log("跳转失败！")
						uni.showToast({
							icon:"error",
							title:"跳转失败，请稍后尝试。"
						})
					}
				})
			},
			callKeyboard: function() {
				uni.navigateTo({
					url: "/pages/talk/talk",
					success: () => {
						console.log("跳转到聊天界面")
					},
					fail: () => {
						uni.showToast({
							title: "跳转失败，请稍后重试！"
						})
					}
				})
			}
		}
	}
</script>

<style>	

	/* 重写样式表 */
	.area {
		width:100%;
		height:100%;
		overflow: hidden;
		
	}
	
	.btnBar {
		/* position:fixed; */
		display: flex;
		width:100%;
		height:20vh;
		bottom:0;
		
	}
	.btnStyle {
		border:none;
		width:50px;
		height:50px;
		border-radius: 50%;
		margin:auto;
		background-color: white;
		line-height: 50px;
		font-size: 14px;
		letter-spacing: -2px;
	}
	
</style>
