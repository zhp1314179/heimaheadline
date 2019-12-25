<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form ref="publishForm" style="margin-left:50px" :model="formData" :rules="publishRules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="formData.content" style="width:92%" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="type">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select placeholder="请选择" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publishArticle">发布</el-button>
        <el-button @click="publishArticle">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [
          { required: true, message: '标题内容不能为空' },
          { min: 5, max: 30, message: '标题长度需要5-30个字符' }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道内容不能为空' }]
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        console.log(result)

        this.channels = result.data.channels
      })
    },
    publishArticle () {
      this.$refs.publishForm.validate(function (isOk) {
        if (isOk) {
          console.log('校验成功')
        }
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
