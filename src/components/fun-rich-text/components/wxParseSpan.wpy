<template>
  <view>
    <block v-for="(node, index) of node.nodes" :key="index">
      <wx-parse-template :node="node"></wx-parse-template>
    </block>
  </view>
</template>

<script>
import WxParseTemplate from '@/componets/gaoyia-parse/components/wxParseTemplate'

export default {
  name: 'wxParseSpan',
  components: { WxParseTemplate },
  data () {
    return {}
  },
  mounted () {
  },
  props: {
    node: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {

  },
  watch: {
    node: {
      immediate: true,
      deep: true,
      handler (nval) {
        if (nval) {
          console.log(nval)
        }
      }
    }
  },
  methods: {
    bindTap (e) {

    }
  }
}
</script>
<style scoped lang="scss">
  image {
    will-change: transform
  }
</style>
