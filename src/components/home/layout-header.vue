<template>
  <el-row class="layout-header" type="flex" justify="space-between" align="middle">
    <!-- 左侧 -->
    <el-col class="left" :span="6">
      <i class="el-icon-s-unfold"></i>
      <span style="marginLeft:5px">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右侧 -->
    <el-col class="right" :span="4">
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo?userInfo.photo:defaultImg" />

        <el-dropdown @command="handle">
          <span>{{userInfo.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">Git地址</el-dropdown-item>
            <el-dropdown-item command="lgout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  created () {
    this.$axios({
      url: '/user/profile',
      method: 'get'

    }).then(result => {
      this.userInfo = result.data
    })
  },
  methods: {
    handle (comm) {
      if (comm === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (comm === 'git') {
        window.location.href = 'https://github.com/zhp1314179/heimaheadline.git'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 16px;
    .title {
      margin-left: 4px;
      color: #2c3e50;
      font-size: 16px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
</style>
