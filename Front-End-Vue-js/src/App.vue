<template>
    <div id="app">
        <div id="nav">
            <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="1"><router-link to="/">伊莉雅の网络存储空间</router-link></el-menu-item>
                <el-menu-item index="2"><router-link to="/Frame?url=https://www.illyasviel.me">伊莉雅の个人主页</router-link></el-menu-item>
                <el-menu-item index="3"><router-link to="/Frame?url=https://www.acgme.cn">奏世界项目计划</router-link></el-menu-item>
                <el-menu-item index="4"><router-link to="/Frame?url=http://www.einzbernfamily.com">爱因兹贝伦家族</router-link></el-menu-item>
                <el-menu-item index="5"><router-link to="/Frame?url=http://www.mango-pomelo.top">芒果柚子导航</router-link></el-menu-item>
            </el-menu>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1',
      isMobile: false,
      isCollapse: true
    }
  },
  mounted: function () {
    this.deviceWidth = document.documentElement.clientWidth || window.innerWidth
    this.isMobile = this.deviceWidth < 860
  }
}
</script>

<style lang="sass">
    *
        padding: 0
        margin: 0
        user-select: none
        &::-webkit-scrollbar
            width: 6px
            height: 1px
        &::-webkit-scrollbar-thumb
            border-radius: 10px
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2)
            background: rgba(0, 0, 0, 0.28)
        &::-webkit-scrollbar-track
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2)
            border-radius: 10px
            background: rgba(255, 255, 255, 1)
    a
        color: #909399
        text-decoration: none
        display: block
        &:hover
            color: #303133
            text-decoration: none
    #app
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        text-align: center
        color: #2c3e50
    #nav
        width: 100vw
        overflow: auto
        .el-menu
            min-width: 736px
</style>
