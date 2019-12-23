<template>
  <div class="layout-aside">
    <div class="title_logo">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <el-menu
      router
      style="width:231px"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-submenu index="1">
        <template slot="title">内容管理</template>

        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">粉丝管理</template>

        <el-menu-item index="/home/picture">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslife">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item>账户信息</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {}
}
</script>

<style lang="less" scoped>
.layout-aside {
  background-color: #323745;
  overflow: hidden;
  height: 100vh;
  .title_logo {
    background-color: #2e2f32;
    text-align: center;

    img {
      height: 55px;
      padding: 10px 0;
      .left {
        font-size: 18px;
      }
    }
  }
}
</style>
2
