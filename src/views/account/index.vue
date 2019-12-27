<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form
      ref="myform"
      :model="formData"
      :rules="formRules"
      style="margin-left:60px"
      label-width="100px"
    >
      <el-form-item prop="name" label="用户名">
        <el-input v-model="formData.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="简介">
        <el-input v-model="formData.intro" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号">
        <el-input v-model="formData.mobile" disabled style="width:300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload :http-request="uploadImg" class="headupload" action="" :show-file-list="false">
      <img class="right-img" :src="formData.photo ? formData.photo:defaultImg" alt />
    </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/default.gif'),
      formData: {
        name: '',
        intro: '',
        email: '',
        mobile: ''
      },
      formRules: {
        name: [
          { required: true, message: '内容不能为空' },
          { min: 1, max: 7, message: '用户名要控制在1-7个字符' }
        ],
        email: [
          { required: true, message: '内容不能为空' },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
      })
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        console.log(result)

        this.formData = result.data
      })
    },
    saveUserInfo () {
      this.$refs.myform.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(result => {
            this.$message({
              type: 'success',
              message: '保存信息成功'
            })
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.right-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  top: 150px;
  right: 400px;
}
</style>
