<template>
    <div id='app'>
    </div>
</template>

<script>
import { toRaw, inject, computed } from "vue";
import axios from "axios";
import { CityBuildingLayer, LineLayer, LayerSwitch } from "@antv/l7";
export default {
    name: 'CityBuildData',
    data() {
        return {
            scene: {}, // 初始化scene对象
            layerControl: {}, // 初始化图层显隐控件
            arrayLayer: [], // 图层数组，为了在组件卸载时，遍历对象，将图层数组中的所有图层删除
        }
    },
    props: {
        renderProgressBar: [Boolean]
    },
    emit: ['update:renderProgressBar'],
    methods: {
        // 异步获取两个图层的数据
        async setlayerMain() {
            // 1.异步请求获取三维城市建筑
            const buildData = await this.getData('https://gw.alipayobjects.com/os/rmsportal/ggFwDClGjjvpSMBIrcEx.json', 2000);

            // 2.异步请求获取城市道路信息
            const roadData = await this.getData('https://gw.alipayobjects.com/os/bmw-prod/0290a972-eedd-42f6-b69e-50a35e8a0824.json', 2000);

            // 创建城市建筑图层
            buildData && this.setUpBuildLayer(buildData)

            // 创建城市道路图层
            roadData && this.setUpRoadLayer(roadData)
        },

        // 异步获取单独的name对应的数据
        async getData(url, index = 20, duration) {
            if (index == 0) {
                return null
            }
            try {
                const data = await axios.get(url)
                if (data) {
                    return data
                } else { // 数据未获取成功，等待一段时间后重新尝试
                    await this.sleep(duration);
                    this.getData(url, index--)
                }
            } catch (err) {
                console.error("获取数据程序出现错误", err);
                throw err
            }
        },
        sleep(duration) { // 时间沉睡
            return new Promise(resolve => {
                setTimeout(resolve, duration);
            })
        },

        // 向scene、layerControl添加图层
        forScene_addLayer_switchLayer(layer) {

            // var arrayLayer = toRaw(this.layerControl.getOptions())
            this.scene.addLayer(layer) // 添加图层在scene对象上显示
            this.arrayLayer.push(layer) // 向图层数组中添加图层

            // 更新图层显隐控件中图层列表
            this.layerControl.setOptions({
                layers: this.arrayLayer
            })
        },

        // 添加城市建筑图层与道路图层
        // 创建三维城市建筑图层
        setUpBuildLayer(data) {
            if (!data) {
                return
            }
            // 三维城市图层
            const buildLayer = new CityBuildingLayer({ name: '三维建筑' });
            buildLayer.source(data.data)
                .size('floor', [0, 500])
                .color('rgba(242,246,250,1.0)')
                .animate({
                    enable: true
                })
                .active({
                    color: '#0ff',
                    mix: 0.5
                })
                .style({
                    opacity: 0.7,
                    baseColor: 'rgb(16, 16, 16)',
                    windowColor: 'rgb(30, 60, 89)',
                    brightColor: 'rgb(255, 176, 38)',
                    sweep: {
                        enable: true,
                        sweepRadius: 2,
                        sweepColor: '#1990FF',
                        sweepSpeed: 0.5,
                        sweepCenter: [120.145319, 30.238915]
                    }
                });
            this.forScene_addLayer_switchLayer(buildLayer) // 显示图层
        },

        // 创建城市道路图层
        setUpRoadLayer(data) {
            if (!data) {
                return
            }
            // 道路图层
            const roadLayer = new LineLayer({ name: '城市道路' })
            roadLayer.source(data.data, {
                parser: {
                    type: 'json',
                    coordinates: 'coordinates'
                }
            })
                .size(1)
                .shape('line')
                .texture('arrow')
                .color('rgb(22,119,255)')
                .filter('length', len => {
                    return len > 20
                })
                .animate({
                    interval: 0.2, // 间隔
                    duration: 1, // 持续时间，延时
                    trailLength: 2 // 流线长度
                })
                .style({
                    opacity: 0.6,
                    lineTexture: true, // 开启线的贴图功能
                    iconStep: 10, // 设置贴图纹理的间距
                    // 设置边框宽度与颜色
                    borderWidth: 0.4, // 默认为 0，最大有效值为 0.5
                    borderColor: '#fff', // 默认为 #ccc
                    // 设置线颜色。起点与终点颜色不同显现出渐变色
                    sourceColor: '#f00', // 起点颜色
                    targetColor: '#0f0', // 终点颜色
                });
            this.forScene_addLayer_switchLayer(roadLayer) // 显示图层
        }
    },
    mounted() {
        const Map_Scene = inject('#scene_map')
        const scene = Map_Scene.scene
        // const map = Map_Scene.mapboxMap

        // 图层显隐控件
        const layerControl = new LayerSwitch({
            btnText: '图层显隐',
            title: '图层控制',
            vertical: true,
        });
        scene.addControl(layerControl)

        // 对象赋值，以便其他选项使用变量
        this.scene = scene
        this.layerControl = layerControl

        // 获取城市三维相关数据并在数据获取结束后创建相关图层  图层创建完毕后回传renderProgressBar参数取消进度条
        this.setlayerMain().then(() => this.$emit('update:renderProgressBar', !this.renderProgressBar)
        )
    },
    unmounted() {
        // 清除图层以及隐藏图层显隐控件
        function Remove_layer() {
            for (let index = 0; index < this.arrayLayer.length; index++) {
                this.scene.removeLayer(this.arrayLayer[index]) // 清除图层数组中的图层
            }
            this.scene.removeControl(this.layerControl) // 删除图层显隐控件
        }
        Remove_layer.call(this)
    },
}
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px
}
</style>