<template>
	<view>
		<image style="width: 750rpx;vertical-align: top;"
		       :mode="node.attr.mode"
		       :lazy-load="node.attr.lazyLoad"
		       :class="node.classStr"
		       :style="newStyleStr || node.styleStr"
		       :data-src="node.attr.src"
		       :src="node.attr.src"
		       @tap="wxParseImgTap"
		       @load="wxParseImgLoad"
		/>
		<!-- #ifdef H5 || MP -->
<!--		<image v-if="!loading"-->
<!--			   style="width: 750rpx"-->
<!--				:mode="node.attr.mode"-->
<!--				:lazy-load="node.attr.lazyLoad"-->
<!--				:class="node.classStr"-->
<!--				:style="newStyleStr || node.styleStr"-->
<!--				:data-src="node.attr.src"-->
<!--				:src="node.attr.src"-->
<!--				@tap="wxParseImgTap"-->
<!--				@load="wxParseImgLoad"-->
<!--		/>-->
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
<!--		<image v-if="!loading&&bolburl"-->
<!--			   style="width: 750rpx"-->
<!--				:mode="node.attr.mode"-->
<!--				:lazy-load="node.attr.lazyLoad"-->
<!--				:class="node.classStr"-->
<!--				:style="newStyleStr || node.styleStr"-->
<!--				:data-src="node.attr.src"-->
<!--				:src="bolburl"-->
<!--				@tap="wxParseImgTap"-->
<!--				@load="wxParseImgLoad"-->
<!--		/>-->
		<!-- #endif -->
<!--		<view style="text-align: center;padding: 20px 0;background: #fff;" v-if="loading">-->
<!--			<image  src="/static/lazy-img.gif" style="width: 50px;height: 10px" />-->
<!--		</view>-->
	</view>
</template>

<script>
export default {
  name: 'wxParseImg',
  data () {
    return {
      newStyleStr: '',
      bolburl: '',
      loading: true,
      preview: true
    }
  },
  inject: ['parseWidth'],
  mounted () {},
  props: {
    node: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {
    // #ifndef H5
    uni.downloadFile({
		    url: this.node.attr.src, // 仅为示例，并非真实的资源
		    success: (res) => {
		        if (res.statusCode === 200 && res.tempFilePath) {
          this.loading = false
		            this.bolburl = res.tempFilePath
		        }
		    }
    })
    // #endif
  },
  methods: {
    wxParseImgTap (e) {
      if (!this.preview) return
      const { src } = e.currentTarget.dataset
      if (!src) return
      let parent = this.$parent
      while (!parent.preview || typeof parent.preview !== 'function') {
        // TODO 遍历获取父节点执行方法
        parent = parent.$parent
      }
      parent.preview(src, e)
    },
    // 图片视觉宽高计算函数区
    wxParseImgLoad (e) {
      this.loading = false
      const { src } = e.currentTarget.dataset

      const { width, height } = e.mp.detail

      const recal = this.wxAutoImageCal(width, height)

      const { imageheight, imageWidth } = recal
      const { padding, mode } = this.node.attr// 删除padding
      // const { mode } = this.node.attr;

      const { styleStr } = this.node
      const imageHeightStyle = mode === 'widthFix' ? '' : `height: ${imageheight}px;`

      this.newStyleStr = `${styleStr}; ${imageHeightStyle}; width: ${imageWidth}px; padding: 0 ${+padding}px;`// 删除padding
      // this.newStyleStr = `${styleStr}; ${imageHeightStyle}; width: ${imageWidth}px;`;
    },
    // 计算视觉优先的图片宽高
    wxAutoImageCal (originalWidth, originalHeight) {
      // 获取图片的原始长宽
      const windowWidth = this.parseWidth.value
      const results = {}

      if (originalWidth < 60 || originalHeight < 60) {
        const { src } = this.node.attr
        let parent = this.$parent
        while (!parent.preview || typeof parent.preview !== 'function') {
          parent = parent.$parent
        }
        parent.removeImageUrl(src)
        this.preview = false
      }

      // 判断按照那种方式进行缩放
      if (originalWidth > windowWidth) {
        // 在图片width大于手机屏幕width时候
        results.imageWidth = windowWidth
        results.imageheight = windowWidth * (originalHeight / originalWidth)
      } else {
        // 否则展示原来的数据
        results.imageWidth = originalWidth
        results.imageheight = originalHeight
      }
      return results
    }
  }
}
</script>
<style scoped lang="scss">
image{will-change: transform}
</style>
