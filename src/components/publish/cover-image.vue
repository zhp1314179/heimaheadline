<template>
  <div class="cover-image">
    <div
      action
      @click="openDialog(index)"
      class="cover-item"
      v-for="(item,index) in images"
      :key="index"
    >
      <img :src="item ? item : defaultImg" alt />
    </div>
    <el-dialog :visible="dialogVisible" @close="closeDialog">
      <select-img @selectOneImg="receiveImg"></select-img>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {
    // 点击图片触发事件
    openDialog (index) {
      this.selectIndex = index
      this.dialogVisible = true
    },
    receiveImg (url) {
      this.$emit('selectImg', url, this.selectIndex)
      this.dialogVisible = false
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  margin: 10px 0;
  margin-left: 50px;
  .cover-item {
    width: 120px;
    height: 120px;
    border: 1px solid #ccc;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
