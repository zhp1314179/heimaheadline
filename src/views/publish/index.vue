<template>
  <el-card v-loading="loading" >
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form ref="publishForm" style="margin-left:50px" :model="formData" :rules="publishRules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor style="height:400px;padding-left:50px" v-model="formData.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="type" style="margin-top:100px">
        <el-radio-group @change="changeImgWay" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <cover-img  @selectImg="changeImg" :images="formData.cover.images"></cover-img>
      <el-form-item prop="channel_id" label="频道">
        <el-select placeholder="请选择" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publishArticle()">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
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
    // 图片传入方式
    // changeImgWay() {
    //   console.log(this.formData.cover.type);
    //   if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = [""];
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ["", "", ""];
    //   } else {
    //     this.formData.cover.images = [];
    //   }
    // },
    // 点击切换改变才会触发
    changeImgWay () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      }
    },
    changeImg (url, index) {
      console.log(url, index)

      this.formData.cover.images = this.formData.cover.images.map((item, i) =>
        i === index ? url : item
      )
    },
    // 修改文章的 调用
    getArticlesId (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        console.log(result)

        this.formData = result.data
      })
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        console.log(result)

        this.channels = result.data.channels
      })
    },
    publishArticle (draft) {
      // this.loading = true
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  // 监听路由中是否携带参数
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        // 判断传过来的params中是否携带参数如果有就是修改
      } else {
        // 没有就是发布
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          }
        }
      }
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params // 是否拿到参数
    articleId && this.getArticlesId(articleId)
  }
}
</script>

<style lang="less" scoped>
.ql-toolbar.ql-snow {
  background-color: beige;
}
</style>
