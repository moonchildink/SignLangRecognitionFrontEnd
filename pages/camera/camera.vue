<template>
	<view class='area'>
		<!-- 注意：可以在camera组件上覆盖cover-view或者cover-image组件 -->
		<view class="cameraArea">
			<view class='cameraCanvas'>
					<camera :device-position="devicePosition" flash='off' frame-size='medium' @stop='cameraStopHandler'
					@error='cameraErrHandler' style="width:100%;height:40%;"></camera>
			</view>
			<view class="cameraBtnBar">
				<button @click='cameraChange' class = 'cameraBtn'>切换摄像头</button>
				<button @click='cameraStart' class = 'cameraBtn'>开始录像</button>
				<button @click='cameraChangeToType' class = 'cameraBtn'>KeyBoard</button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showTypes: 1,
				devicePosition: 'front',
				cameraIsWorking: 0,
				dataBuffer: null 
			}
		},
		methods: {
			cameraStopHandler: (err) => {
				console.log(err);
				uni.showToast({
					title: "拍摄结束"
				})
			},
			cameraErrHandler: (err) => {
				// console.log(err.)
				uni.showToast({
					title: "调用摄像头失败！请开启权限！",
					icon: "error"
				})
				console.log(err.detail);
				//在此处返回首页或者重定向到其他页面
				uni.redirectTo({
					// console.log("返回首页")
				})
			},
			cameraChange: () => {
				if (this.devicePosition === "front") {
					this.devicePosition = "back";
				} else {
					this.devicePosition = "front";
				}
			},
			cameraStart() {
				// 这个创建摄像头的api接口是不支持h5和app端的。在h5端返回的对象为undefined.
				// 另外，可能还需要实机调试。
				const camera = uni.createCameraContext();
				console.log(camera);
				camera.startRecord({
					// 对于微信以及APP端似乎有不同的时长限制，此处应该使用#ifdefine语句
					timeout: 300000,
					success: (res) => {
						// 再回调函数之中，似乎无法对外部的camera对象进行访问
						console.log(res);
					},
					timeoutCallback: (err) => {
						console.log(res.detail);
						uni.showToast({
							icon: "error",
							title: "超过最大录制时长，请重新开始录制"
						})
					}
				});

			},
			error: (err) => {
				console.log(err.detail);
			},
			dataToNumjsArray: (arrayBuffer) => {
				// 对数据进行处理，返回numjs的ndarray格式
			},
			getHolistic: (data) => {

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
	.cameraArea {
		height:60vh;
		width:100%;
		display: flex;
		flex-direction: column;
		position:fixed;
	}
	.cameraCanvas {
		width:100vw;
		height:60%;
		display: block;
	}
	/* camera {
		height:rpx;
		width:100%;
		position: inherit;
	} */
	.cameraBtnBar {
		width:100%;
		height:20%;
		background-color: darkgray;
		display: flex;
		flex-direction: row;
	}
	.cameraBtn{
		width:50px;
		height:50px;			
		/* 注意:rpx为相对单位,如果要设计一个正圆,那么要避免使用rpx单位 */
		border-radius: 50%;
		margin:auto;
		font-size: 15px;
		line-height: 50px;
		letter-spacing: 0px;
		border:none;
		writing-mode: horizontal-tb;
	}
	
</style>
