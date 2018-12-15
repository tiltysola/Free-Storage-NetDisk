<template>
  <div class="index">
      <div class="left">
          <el-menu default-active="1-4-1" class="el-menu-vertical" :collapse="isCollapse">
              <el-menu-item index="1" @click="getTableData('.')">
                  <i class="el-icon-refresh"></i>
                  <span slot="title">刷新列表</span>
              </el-menu-item>
              <el-menu-item index="2" @click="uploadVisible = true">
                  <i class="el-icon-upload"></i>
                  <span slot="title">上传文件</span>
              </el-menu-item>
              <el-menu-item index="3" @click="settingForm()">
                  <i class="el-icon-setting"></i>
                  <span slot="title">设置</span>
              </el-menu-item>
          </el-menu>
      </div>
      <div class="right">
          <el-table :data="tableData" border style="width: 100%" @current-change="handleDirectory" :default-sort = "{prop: 'type', order: 'ascending'}">
              <el-table-column
                      fixed
                      prop="type"
                      label="类型"
                      width="60px"
                      v-if="!isMobile">
                  <template slot-scope="scope">
                      <i :class="scope.row.icon"></i>
                  </template>
              </el-table-column>
              <el-table-column
                      fixed
                      prop="file_name"
                      min-width="160px"
                      label="文件名">
              </el-table-column>
              <el-table-column
                      prop="last_modify_time"
                      label="修改日期"
                      width="180px"
                      v-if="!isMobile">
              </el-table-column>
              <el-table-column
                      label="文件大小"
                      width="160px"
                      v-if="!isMobile">
                  <template slot-scope="scope">
                      {{ scope.row.file_size }} <span v-if="scope.row.file_size !== ''">KB</span>
                  </template>
              </el-table-column>
              <el-table-column
                      fixed="right"
                      label="操作"
                      width="216px"
                      v-if="!isMobile">
                  <template slot-scope="scope" v-if="scope.row.type === 'file'">
                      <el-button @click="fileDownload(scope.row)" :type="fileOpenable(scope.row.file_type) ? 'success' : 'primary'" round size="small">{{ fileOpenable(scope.row.file_type) ? '查看图片' : '下载文件' }}</el-button>
                      <el-button @click="fileDelete(scope.row)" type="danger" round size="small">删除文件</el-button>
                  </template>
              </el-table-column>
              <el-table-column
                      fixed="right"
                      label="操作"
                      width="82px"
                      v-if="isMobile">
                  <template slot-scope="scope" v-if="scope.row.type === 'file'">
                      <el-button @click="fileDownload(scope.row)" :type="fileOpenable(scope.row.file_type) ? 'success' : 'primary'" round size="small">{{ fileOpenable(scope.row.file_type) ? '查 看' : '下 载' }}</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </div>
      <el-dialog
              title="上传文件"
              :visible.sync="uploadVisible">
          <template id="upload_client" v-if="!isMobile">
              <el-upload
                      class="upload"
                      drag
                      name="file"
                      action="./file/upload"
                      :on-success="uploadSuccess"
                      :on-error="uploadError"
                      :data="uploadExtData"
                      multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
              <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="uploadVisible = false">关 闭</el-button>
              </span>
          </template>
          <template id="upload_mobile" v-if="isMobile">
              <el-upload
                      class="mobile-uploader"
                      name="file"
                      action="./file/upload"
                      :on-success="uploadSuccess"
                      :on-error="uploadError"
                      :data="uploadExtData">
                  <i class="el-icon-plus mobile-uploader-icon"></i>
              </el-upload>
              <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="uploadVisible = false">关 闭</el-button>
              </span>
          </template>
      </el-dialog>
      <el-dialog
              id="check"
              title="查看图片"
              :visible.sync="checkVisible">
          <div class="imagebox">
              <img class="image" :src="checkUrl">
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="checkVisible = false">关 闭</el-button>
          </span>
      </el-dialog>
      <el-dialog
              id="about"
              title="关于这个网站"
              :visible.sync="aboutVisible">
          <p>伊莉雅の个人存储空间</p>
          <p>前端运用 Vue.js 和 Element-UI 进行编写</p>
          <p>后台运用 Node.js 和 Express 进行编写</p>
          <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="aboutVisible = false">关 闭</el-button>
              </span>
      </el-dialog>
  </div>
</template>
<script>
import Axios from 'axios'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default {
  name: 'Index',
  data () {
    return {
      deviceWidth: 0,
      isMobile: false,
      isCollapse: true,
      uploadVisible: false,
      checkVisible: false,
      checkUrl: 'about:blank',
      aboutVisible: false,
      queryDirectory: '.',
      tableData: []
    }
  },
  computed: {
    uploadExtData: function () {
      return {
        dir: this.queryDirectory
      }
    }
  },
  mounted: function () {
    this.getTableData()
    this.deviceWidth = document.documentElement.clientWidth || window.innerWidth
    this.isMobile = this.deviceWidth < 860
    let that = this
    setInterval(function () {
      that.getTableData()
    }, 5000)
  },
  methods: {
    handleDirectory (row) {
      if (row !== null) {
        if (row.type === 'directory') {
          if (row.file_full_path !== '...') {
            this.queryDirectory = this.queryDirectory + '/' + row['file_name']
            this.getTableData()
          } else {
            this.queryDirectory = this.queryDirectory.substr(0, this.queryDirectory.lastIndexOf('/'))
            this.getTableData()
          }
        }
      }
    },
    fileDownload (row) {
      if (this.fileOpenable(row.file_type)) {
        this.checkUrl = row.file_full_path
        this.checkVisible = true
      } else {
        window.open(row.file_full_path)
      }
    },
    fileDelete (row) {
      this.$confirm('此操作将永久删除 ' + row.file_name + ' , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Axios({
          url: './file/delete',
          method: 'post',
          data: 'filename=' + encodeURIComponent(row.file_name) + '&dir=' + encodeURIComponent(this.queryDirectory),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(resp => {
          this.getTableData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(err => {
          this.$alert(err, '删除失败', {
            confirmButtonText: '确定'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    fileOpenable (filetype) {
      let allowType = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'ico']
      for (let typeInt in allowType) {
        if (allowType[typeInt] === filetype) {
          return true
        }
      }
      return false
    },
    uploadSuccess () {
      this.getTableData()
      this.$message({
        type: 'success',
        message: '上传成功!'
      })
    },
    uploadError (err) {
      this.$alert(err, '上传失败', {
        confirmButtonText: '确定'
      })
    },
    settingForm () {
      this.aboutVisible = true
    },
    getTableData: function () {
      Axios.get('./file/list?dir=' + encodeURIComponent(this.queryDirectory), {
      }).then(resp => {
        for (let i = 0; i < resp.data.length; i++) {
          if (resp.data[i].type === 'file') {
            resp.data[i].icon = 'el-icon-document'
            resp.data[i].file_type = resp.data[i]['file_name'].split('.')[resp.data[i]['file_name'].split('.').length - 1]
          } else if (resp.data[i].type === 'directory') {
            resp.data[i].icon = 'el-icon-menu'
            resp.data[i].file_type = 'dir'
          }
        }
        if (this.queryDirectory !== '.') {
          resp.data.unshift({
            type: 'directory',
            icon: 'el-icon-arrow-left',
            file_name: '返回上级目录',
            file_type: 'dir',
            file_size: '',
            last_modify_time: '',
            file_full_path: '...'
          })
        }
        this.tableData = resp.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="sass">
    .index
        position: relative
    .left
        position: absolute
        left: 0
        top: 0
        height: calc(100vh - 62px)
        .el-menu-vertical
            height: calc(100vh - 62px)
    .right
        margin-left: 64px
        height: calc(100vh - 62px)
        overflow: auto
        th, td
            &:not(:nth-last-child(4))
                text-align: center
            &:nth-last-child(4)
                padding-left: 12px
    .mobile-uploader .el-upload
        border: 1px dashed #d9d9d9
        border-radius: 6px
        cursor: pointer
        position: relative
        overflow: hidden
        .mobile-uploader .el-upload:hover
            border-color: #409EFF
        .mobile-uploader-icon
            font-size: 28px
            color: #8c939d
            width: 178px
            height: 178px
            line-height: 178px
            text-align: center
    .el-dialog
        margin-left: auto
        margin-right: auto
        min-width: 320px
    .el-dialog__footer
        text-align: center!important
        .el-button
            padding-left: 32px
            padding-right: 32px
            margin-top: -12px
    .imagebox
        overflow: hidden
        .image
            margin: 0
            max-height: 60vh
            max-width: 60vw
            border: none
    #about p
        margin: 12px
</style>
