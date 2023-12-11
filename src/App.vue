<template>
  <div class="head">
    <div class="menu">
      <!-- 进入系统数据查看视图 -->
      <router-link to="/data" round class="common-button">
        <el-button type="primary">
          数据查看
        </el-button>
      </router-link>
      <!-- 进入或返回系统首页 -->
      <el-button type="success" class="center-button" @click="backHome">
        Home
      </el-button>
      <!-- <router-link to="/" class="center-button">
        <el-button type="success">
          Home
        </el-button>
      </router-link> -->
      <!-- 进入系统操作视图，可以进行相关数据查询、图层查看与编辑 -->
      <router-link to="/inquire" class="common-button">
        <el-button type="info" round>
          功能服务
        </el-button>
      </router-link>
    </div>
  </div>
  <div class="body">

    <div class="router-view">
      <router-view></router-view>
    </div>
    <!-- 在系统首页中加入地图主视图，以及加入地图控件 -->
    <HomeView />
    <MapControl />
  </div>
</template>

<script>
import HomeView from "./view/HomeView.vue";
import MapControl from "./components/HomeView/MapControl.vue"

export default {
  name: 'App',
  components: {
    HomeView,
    MapControl
  },
  methods: {
    // 在点击Home按钮后，浏览器跳转网址到系统首页，用户无法使用浏览器回退按钮返回之前的页面
    backHome() {
      var url
      url = window.location.href
      url = url.split('//')[1].split('/')[0]
      // console.log(url)
      window.location.replace(`http://${url}/#/`)
    },
  },
  mounted() {

  }
}
</script>

<style>
.head {
  width: 100vw;
  height: 6vh;
  background-image: url('./assets/logo.png');
  background-size: contain;
  background-repeat: space repeat-x;
  background-position: center;
  background-color: aqua;
}

.body {
  width: 100vw;
  height: 94vh;
}

.router-view {
  position: absolute;
  z-index: 3;
}

.menu {
  width: 100vw;
  margin: 5px 0px;
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
}

.center-button {
  flex-grow: 2;
}

.common-button {
  flex-grow: 1;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
