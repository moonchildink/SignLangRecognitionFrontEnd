<template>
	<view class = 'area'>
		<!-- 注意：可以在camera组件上覆盖cover-view或者cover-image组件 -->
		<view class="cameraArea">
			<camera
			:device-position="devicePosition"
			flash = 'off'
			frame-size = 'medium'
			@stop = 'cameraStopHandler'
			@error = 'cameraErrHandler'
			style = "width:100%;height:40%;"
			></camera>
			<view class = "cameraBtnBar">
				<button @click = 'cameraChange'>切换摄像头</button>
				<button @click = 'cameraStart'>开始录像</button>
				<button @click = 'cameraChangeToType'>KeyBoard</button>
			</view>
			
		</view>
		<view class='btnBar' v-show="showTypes == 1">
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
				showTypes: 1,
				devicePosition:'front',
				cameraIsWorking:0
			}
		},
		methods: {
			callHelp: () => {
				console.log("唤起帮助")
			},
			callRecognition: () => {
				console.log("唤起手语识别")
			},
			callKeyboard: function() {
				uni.navigateTo({
					url:"/pages/talk/talk",
					success:()=>{
						console.log("跳转到聊天界面")
					},
					fail:()=>{
						uni.showToast({
							title:"跳转失败，请稍后重试！"
						})
					}
				})
			},
			cameraStopHandler:(err)=>{
				console.log(err);
				uni.showToast({
					title:"拍摄结束"
				})
			},
			cameraErrHandler:(err)=>{
				// console.log(err.)
				uni.showToast({
					title:"调用摄像头失败！请开启权限！",
					icon:"error"
				})
				console.log(err.detail);
				//在此处返回首页或者重定向到其他页面
				uni.redirectTo({
					// console.log("返回首页")
				})
			},
			cameraChange:()=>{
				if(this.devicePosition === "front"){
					this.devicePosition = "back";
				}
				else{
					this.devicePosition = "front";
				}
			},
			cameraStart:()=>{
				const camera = uni.createCameraContext();
				camera.startRecord({
					// 对于微信以及APP端似乎有不同的时长限制，此处应该使用#ifdefine语句
					timeout:300000,
					success:(res)=>{
						// 再回调函数之中，似乎无法对外部的camera对象进行访问
					},
					timeoutCallback: (err) => {
						console.log(res.detail);
						uni.showToast({
							icon:"error",
							title:"超过最大录制时长，请重新开始录制"
						})
					}
				});
				camera.onCameraFrame();
				
			},
			error:(err)=>{
				console.log(err.detail);
			},
			dataToNumjsArray:(arrayBuffer)=>{
				// 对数据进行处理，返回numjs的ndarray格式
			}
			getHolistic:(data)=>{
				
			}
		}
	}
</script>

<style>
	
	.area {
		position:absolute;
		width:100%;
		background-color: white;
		height:10%;
		bottom:0%;
		
	}
	.btnBar {
		width: 100%;
		height: 20%;
		display: flex;
		/* align-items: center; */
		justify-content: center;
	}

	#btnRecognition {
		color: #9f68e0;
		background-color: aliceblue;
	}

	button {
		border: none;
		background-color: #9f68e0;
		color: white;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		font-size: 22rpx;
		line-height: 100rpx;
		font-display: inline;
		letter-spacing: -2rpx;
	}
	
</style>
