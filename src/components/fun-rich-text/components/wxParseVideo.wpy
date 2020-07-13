<template>
  <!--增加video标签支持，并循环添加-->
  <div>
    <!--增加video标签支持，并循环添加-->
      <view :class="node.classStr" :style="node.styleStr" style="position: relative;z-index: 2;width: 750rpx;height: 375rpx;">
          <video
                  id="myVideo1"
                  ref="video1"
                  controls
                  show-center-play-btn

                  :class="node.classStr"
                  class="video-video"
                  :src="node.attr.src"
                  style="position: absolute;width: 100%;height: 100%;"
          ></video>
      </view>
    <!-- #ifndef APP-PLUS -->

    <!-- #endif -->

    <!-- #ifdef APP-PLUS -->

<!--	<view v-show="ifshow" @tap="ableClose" @touchmove.stop.prevent class="popup-layer"-->
<!--	      ></view>-->
<!--    <image v-show="showImg" @click="showDialog" style="width: 750rpx;height: 300rpx;" src="/static/img-lazy.png" />-->
<!--    <view  >
      <video x5-video-player-type="h5-page"  class="video-video" :src="node.attr.src"></video>
    </view> -->
<!--   <image @click="showDialog" style="width: 750rpx;height: 375rpx;" src="/static/video-lazy.jpg" />-->
   <!-- <wzw-dialog ref="dialog" positions="center" bgColor="rgba(0,0,0,.7)" mainBgColor="none">
     <view @touchmove.stop.prevent :class="node.classStr" :style="node.styleStr" style="position: relative;z-index: 2;width: 750rpx;height: 375rpx;overflow: hidden;">
         <video :class="node.classStr" class="video-video" :src="node.attr.src" style="position: absolute;width: 100%;height: 100%;"></video>
     </view>
   </wzw-dialog> -->
    <!-- #endif -->

  </div>
</template>

<script>
export default {
  name: 'wxParseVideo',
  props: {
    node: {},
  },
  data(){
    return {
		ifshow:false,
      showImg:true,
    }
  },
  created(){

  },
  mounted() {
    let _self = this

    this.$nextTick().then(() => {
      let videoContext = uni.createVideoContext('myVideo1', _self)
      //添加到这里
      getApp().globalData.videoInstance.push(videoContext)
    })


  },
  methods:{
	//   ableClose(){
	// 	  // #ifdef APP-PLUS
	// 	  const vm = this;
	// 	  const subNVue1 = uni.getSubNVueById('video')
	// 	  this.ifshow = false
	// 	  subNVue1.hide()
	// 	  uni.$emit('page-video-stop', {});
	// 	  // #endif
    //
	//   },
    // showDialog(){
	// 		// #ifdef APP-PLUS
	// 		const vm = this;
	// 		//this.$error(vm.node.attr.src)
	// 		uni.$emit('page-video', {
	// 			src:vm.node.attr.src
	// 		});
	// 		const subNVue1 = uni.getSubNVueById('video')
	// 		subNVue1.show()
	// 		this.ifshow = true
	// 		// #endif
    //
    //   //this.$refs.dialog.show()
    // }
  }
};
</script>

<style scoped lang="scss">
	.popup-layer {
	    position: fixed;
	    z-index: 199;
	    background-color: rgba(0, 0, 0, .5);
	    height: 100%;
	    width: 100%;
	    top: 0px;
	    left: 0px;
	    overflow: hidden;
	}
</style>
