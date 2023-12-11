import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
// 使用element模块设置UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "../public/globalStyle.css";


// 5. 创建并挂载根实例
export const app = createApp(App)
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)
app.use(ElementPlus)

// 创造全局数据
const globalData = {
    name: '武汉市智慧城市',
    theme:'生产实习作品'
};
app.provide('globalData', globalData)

app.mount('#app')