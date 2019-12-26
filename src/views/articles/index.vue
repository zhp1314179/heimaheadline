<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-row class="serchBox">
      <el-col :span="2">
        <span>文章状态 :</span>
      </el-col>
      <el-col :span="18">
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="serchBox">
      <el-col :span="2">
        <span>频道列表 :</span>
      </el-col>
      <el-col :span="18">
        <el-select @change="changeCondition" v-model="formData.channel_id">
          <el-option :label="all" :value="null">全部</el-option>
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="serchBox">
      <el-col :span="2">时间选择 :</el-col>
      <el-col :span="18">
        <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>

    <el-row class="total">
      <span>共找到{{page.total}}条符合条件的内容</span>
    </el-row>
    <!-- 循环魔板 -->
    <el-row
      v-for="item in list"
      :key="item.id.toString()"
      class="pro"
      type="flex"
      justify="space-between"
    >
      <el-col :span="14">
        <el-row class="leftContent">
          <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt />
          <div class="left-text">
            <span style="fontSize:14">{{item.title}}</span>
            <el-tag
              :type="item.status | filterType"
              style="width:56px"
              class="tag"
            >{{item.status | filterStatus}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row type="flex" justify="end" class="right">
          <span @click="updataData(item.id.toString())">
            <i class="el-icon-edit"></i>修改
          </span>
          <span @click="deleteData(item.id.toString())">
            <i @click="updataData(item.id.toString())" class="el-icon-delete"></i>删除
          </span>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="pageCode" align="middle" type="flex" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      all: '全部',
      formData: {
        status: 5,
        channel_id: null,
        dateRange: []
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/home.jpeg'),
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    //   修改数据 携带id 到文章发布页面
    updataData (id) {
      this.$router.push(`/home/publish/${id}`)
    },
    // 删除数据
    deleteData (id) {
      console.log(id)

      this.$confirm('您是否要删除这个文章').then(() => {
        this.$axios({
          url: `/articles/${id}`,
          method: 'delete'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getConditionArticle()
        })
      })
    },
    // 改变页码事件
    changePage (newPage) {
      this.page.currentPage = newPage
      console.log(newPage)

      this.getConditionArticle()
    },
    //   改变搜索条件
    changeCondition () {
      this.page.currentPage = 1

      this.getConditionArticle()
    },
    getConditionArticle () {
      console.log(this.formData.channel_id)

      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.dateRange
          ? this.formData.dateRange[0]
          : null,
        end_pubdate: this.formData.dateRange ? this.formData.dateRange[1] : null
      }
      this.getArteicles(params)
    },
    //   频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        console.log(result)

        this.channels = result.data.channels
      })
    },
    // 文章列表数据
    getArteicles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        console.log(result)
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  created () {
    this.getChannels()
    this.getArteicles({ page: 1, per_page: 10 })
  }
}
</script>
<style lang="less" scoped>
.serchBox {
  height: 60px;
  padding-left: 50px;
}
.total {
  margin-top: 20px;
  font-size: 14px;
  border-bottom: 1px dashed #f2f3f5;
  padding-bottom: 14px;
}

.pro {
  border-bottom: 1px dashed #f2f3f5;
  padding: 20px;
  .right {
    span {
      margin-left: 8px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .leftContent {
    display: flex;
    min-width: 550px;
    img {
      border-radius: 6px;
      width: 160px;
      height: 120px;
    }
    .left-text {
      height: 94px;
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      tex .date {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
.pageCode {
  height: 60px;
}
</style>
